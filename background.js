chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    chrome.storage.local.get("emojis", function(obj) {
        sendResponse(obj.emojis);
    });
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