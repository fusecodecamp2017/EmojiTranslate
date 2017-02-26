var getEmojis = new Promise(function(resolve, reject) {
    var emojis = [
        {
            word: 'heart',
            ascii: '\u2764'
        },
        {
            word: 'pencil',
            ascii: '\u270f'
        },
        {
            word: 'plus',
            ascii: '\u2795'
        },
        {
            word: 'bread',
            ascii: '\uD83C\uDF5E'
        },
        {
            word: 'banana',
            ascii: '\uD83C\uDF4C'
        },
    ]
    chrome.storage.local.set({'emojis': emojis}, function() {
        chrome.storage.local.get('emojis', function(emojis) {
            resolve(emojis.emojis);
        });
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    if( message === 'getEmojis' ) {
        getEmojis.then((emojis) => sendResponse(emojis));
        return true;
    }
});

var createProperties = {
    id: "createEmoji",
    title: "Create Emoji for %s",
    contexts: ["selection"]
};
chrome.contextMenus.create(createProperties, () => {})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "createEmoji") {
        console.log("Creating emoji for " + info.selectionText);
    }
});