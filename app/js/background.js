var getEmojis = new Promise(function(resolve, reject) {
    chrome.storage.local.get('emojis', function(emojis) {
        resolve(emojis.emojis);
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    console.log(sender);
    
    var request = message.request;
    if( request === 'getEmojis' ) {
        getEmojis.then((emojis) => sendResponse(emojis));
    } else if( request  === 'deleteAllEmojis' ) {
        getEmojis = new Promise((resolve) => resolve([]));
        chrome.storage.local.set({'emojis': []});
        sendResponse({result: "success"});
        refreshCurrentTabIfPreferenceSet();
    } else if( request === 'deleteEmoji' ) {
        var text = message.text;
        getEmojis = getEmojis.then((emojis) => {
            emojis.splice(emojis.findIndex((emoji) => emoji.text === text), 1)
            return emojis;
        });
        getEmojis.then((emojis) => {
            chrome.storage.local.set({'emojis': emojis});
        });
        sendResponse({result: "success"});
        refreshCurrentTabIfPreferenceSet();
    } else if( request === 'setPreferences' ) {
        var preferences = message.preferences;
        chrome.storage.local.set({'preferences': preferences});
        sendResponse({result: "success"});
    } else if( request === 'getPreferences' ) {
        chrome.storage.local.get('preferences', function(obj) {
            console.log(preferences);
            sendResponse(obj.preferences || {});
        });
    }
    return true;
});

chrome.runtime.onInstalled.addListener(() => {
    var createProperties = {
        id: "createEmoji",
        title: "Create Emoji for %s",
        contexts: ["selection"]
    };
    chrome.contextMenus.create(createProperties, () => {});
    chrome.storage.local.set({'emojis': []})
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "createEmoji") {
        var asciiAsString = prompt("Enter the desired Emoji's 4 character hex code below")
        var ascii = null;
        if( asciiAsString.length === 4 ) {
            ascii = String.fromCharCode(parseInt(asciiAsString,16));
        } else if( asciiAsString.length === 5 ) {
            ascii = surrogatePairs(asciiAsString);
        }
        getEmojis = getEmojis.then((emojis) => {
            return emojis.concat([{
                text: info.selectionText,
                ascii: ascii
            }])
        });
        getEmojis.then((emojis) => chrome.storage.local.set({'emojis': emojis}));
        refreshCurrentTabIfPreferenceSet()
    }
});

function refreshCurrentTabIfPreferenceSet() {
    chrome.storage.local.get('preferences', function(obj) {
        if( obj.preferences.reloadPage ) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }
    });
}