chrome.runtime.sendMessage({request: "getEmojis"}, function(emojis) {
    twemojifyNode(document.getElementsByTagName('body')[0], emojis);
});
