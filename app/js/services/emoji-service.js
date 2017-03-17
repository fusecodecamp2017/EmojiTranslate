class EmojiService {

    init() {
        chrome.storage.local.set({'emojis': []});
    }

    getEmojis() {
        if( !this.cachedEmojis ) {
            this.cachedEmojis = new Promise((resolve) => {
                chrome.storage.local.get('emojis', function(emojis) {
                    resolve(emojis.emojis);
                });
            });
        }
        return this.cachedEmojis;
    }

    createEmoji(text, asciiAsString) {
        var ascii = null;
        if( asciiAsString.length === 4 ) {
            ascii = String.fromCharCode(parseInt(asciiAsString,16));
        } else if( asciiAsString.length === 5 ) {
            ascii = surrogatePairs(asciiAsString);
        }
        this.cachedEmojis = this.getEmojis().then((emojis) => {
            return emojis.concat([{
                text: text,
                ascii: ascii
            }])
        });
        this.cachedEmojis.then((emojis) => chrome.storage.local.set({'emojis': emojis}));
    }

    deleteEmoji(emojiText) {
        this.cachedEmojis = this.getEmojis().then((emojis) => {
            emojis.splice(emojis.findIndex((emoji) => emoji.text === emojiText), 1)
            return emojis;
        });
        this.cachedEmojis.then((emojis) => {
            chrome.storage.local.set({'emojis': emojis});
        });
    }

    deleteAllEmojis() {
        this.cachedEmojis = new Promise((resolve) => resolve([]));
        chrome.storage.local.set({'emojis': []});
    }

}