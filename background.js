chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if( message.request === "getEmojis" ) {
        chrome.storage.local.get("emojis", function(obj) {
            sendResponse(obj.emojis);
        });
    } else if( message.request === "deleteAllEmojis" ) {
        chrome.storage.local.set({"emojis": []}, function() {
            refreshCurrentTabIfPreferenceSet();
            sendResponse("");
        });
    } else if( message.request === "deleteEmoji" ) {
        chrome.storage.local.get("emojis", function(obj) {
            var emojis = obj.emojis;
            var emojiTextToDelete = message.text;
            emojis.splice(emojis.findIndex((emoji) => emoji.text === emojiTextToDelete), 1);
            chrome.storage.local.set({"emojis": emojis}, function() {
                refreshCurrentTabIfPreferenceSet();
                sendResponse("");
            });
        });
    } else if( message.request === "setPreferences" ) {
        var preferences = message.preferences;
        chrome.storage.local.set({"preferences": preferences}, function() {
            sendResponse("");
        });
    } else if( message.request === 'getPreferences' ) {
        chrome.storage.local.get("preferences", function(obj) {
            sendResponse(obj.preferences);
        });
    } else if( message.request === 'getReplaceWholeWordsOnly' ) {
        chrome.storage.local.get("preferences", function(obj) {
            sendResponse(obj.preferences.replaceWholeWordsOnly);
        });
    } else if( message.request === 'setEmojiSubstitutionEnabled' ) {
        chrome.storage.local.set({"emojiSubstitutionEnabled": message.emojiSubstitutionEnabled}, function() {
            refreshCurrentTabIfPreferenceSet();
            sendResponse("");
        });
    } else if( message.request === 'getEmojiSubstitutionEnabled' ) {
        chrome.storage.local.get("emojiSubstitutionEnabled", function(obj) {
            sendResponse(obj.emojiSubstitutionEnabled);
        });
    } else if( message.request === 'emojiSubstitutionConfiguration' ) {
        chrome.storage.local.get("emojiSubstitutionEnabled", function(emojiSubstitutionEnabledObj) {
            if( emojiSubstitutionEnabledObj.emojiSubstitutionEnabled ) {
                chrome.storage.local.get("emojis", function(emojisObj) {
                    chrome.storage.local.get("preferences", function(preferencesObj) {
                        var response = {
                            emojis: emojisObj.emojis,
                            replaceWholeWordsOnly: preferencesObj.preferences.replaceWholeWordsOnly
                        }
                        sendResponse(response);
                    });
                });
            } else {
                sendResponse({emojis: []});
            }
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
    chrome.storage.local.set({"emojis": []});
    chrome.storage.local.set({"emojiSubstitutionEnabled": true});

    var defaultPreferences = {
        reloadPage: true,
        replaceWholeWordsOnly: true
    };
    chrome.storage.local.set({"preferences": defaultPreferences});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    var asciiAsString = prompt("Enter the desired Emoji's hex code below");
    if( !/^[A-Z0-9]{4,5}$/.test(asciiAsString) ) {
        alert("Invalid input.  Hex code must be 4 or 5 characters, and consist of capital letters and numbers.");
        return;
    }
    var ascii = null;
    if( asciiAsString.length === 4 ) {
        ascii = String.fromCharCode(parseInt(asciiAsString,16));
    } else if( asciiAsString.length === 5 ) {
        ascii = surrogatePairs(asciiAsString);
    }
    chrome.storage.local.get("emojis", function(obj) {
        obj.emojis = obj.emojis.concat({
            text: info.selectionText,
            ascii: ascii
        });
        chrome.storage.local.set(obj);
        refreshCurrentTabIfPreferenceSet();
    });
});

function surrogatePairs(asciiString) {
    return String.fromCharCode(_getHighCharacter(asciiString)) + String.fromCharCode(_getLowCharacter(asciiString))
}

function _getHighCharacter(asciiString) {
    return Math.floor((_hexNumberFromAsciiString(asciiString) - 0x10000) / 0x400) + 0xD800;
}

function _getLowCharacter(asciiString) {
    return ((_hexNumberFromAsciiString(asciiString) - 0x10000) % 0x400) + 0xDC00;
}

function _hexNumberFromAsciiString(asciiString) {
    return parseInt(asciiString,16);
}

function refreshCurrentTabIfPreferenceSet() {
    chrome.storage.local.get("preferences", function(obj) {
        var preferences = obj.preferences;
        if( preferences.reloadPage ) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }
    });
}