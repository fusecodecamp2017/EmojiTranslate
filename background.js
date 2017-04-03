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
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    alert("Emoji Translate!");
});