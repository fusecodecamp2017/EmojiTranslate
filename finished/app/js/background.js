var emojiService = new EmojiService();
var preferencesService = new PreferencesService();

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
        preferencesService.setPreferences(preferences);
        sendResponse({result: "success"});
    } else if( request === 'getPreferences' ) {
        preferencesService.getPreferences().then((preferences) => {
            sendResponse(preferences);
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
        var asciiAsString = prompt("Enter the desired Emoji's hex code below")
        emojiService.createEmoji(info.selectionText, asciiAsString);
        refreshCurrentTabIfPreferenceSet()
    }
});

function refreshCurrentTabIfPreferenceSet() {
    preferencesService.getPreferences().then((preferences) => {
        if( preferences.reloadPage ) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }
    });
}