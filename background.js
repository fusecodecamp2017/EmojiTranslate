chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var emojis = [
        {
            text: "heart",
            ascii: '\u2764'
        },
        {
            text: "scissors",
            ascii: '\u2702'
        },
        {
            text: "lightning",
            ascii: '\u26A1'
        }
    ]
    sendResponse(emojis);
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
    var ascii = String.fromCharCode(parseInt(asciiAsString,16));
    chrome.storage.local.get("emojis", function(obj) {
        obj.emojis = obj.emojis.concat({
            text: info.selectionText,
            ascii: ascii
        });
        chrome.storage.local.set(obj);
    });
});