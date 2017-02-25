chrome.runtime.sendMessage("getEmojis", function(emojis) {
    twemojifyNode(document.getElementsByTagName('body')[0], emojis);
});
