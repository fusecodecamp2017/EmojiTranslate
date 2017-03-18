class EmojiService {

    constructor() {
        this.chromeStorage = new ChromeStorageService();
    }

    init() {
        this.chromeStorage.set('emojis', []);
    }

    getEmojis() {
        if( !this.cachedEmojis ) {
            this.cachedEmojis = this.chromeStorage.get('emojis');
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
        this.cachedEmojis.then((emojis) => this.chromeStorage.set('emojis', emojis));
    }

    deleteEmoji(emojiText) {
        this.cachedEmojis = this.getEmojis().then((emojis) => {
            emojis.splice(emojis.findIndex((emoji) => emoji.text === emojiText), 1)
            return emojis;
        });
        this.cachedEmojis.then((emojis) => this.chromeStorage.set('emojis', emojis));
    }

    deleteAllEmojis() {
        this.cachedEmojis = new Promise((resolve) => resolve([]));
        this.chromeStorage.set('emojis', []);
    }

}