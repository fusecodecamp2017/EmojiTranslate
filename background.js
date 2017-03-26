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