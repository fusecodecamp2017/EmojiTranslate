var emojiService = new EmojiService();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    console.log(sender);
    
    var request = message.request;
    if( request === 'getEmojis' ) {
        emojiService.getEmojis().then((emojis) => sendResponse(emojis));
    } else if( request  === 'deleteAllEmojis' ) {
        emojiService.deleteAllEmojis();
        sendResponse({result: "success"});
        refreshCurrentTabIfPreferenceSet();
    } else if( request === 'deleteEmoji' ) {
        emojiService.deleteEmoji(message.text);
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
    emojiService.init();
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "createEmoji") {
        var asciiAsString = prompt("Enter the desired Emoji's 4 character hex code below")
        emojiService.createEmoji(info.selectionText, asciiAsString);
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