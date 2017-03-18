class ChromeStorageService {

    set(key, value) {
        return new Promise((resolve) => {
            var obj = {};
            obj[key] = value;
            this._chromeStorageSet(obj, function() {
                resolve();
            });
        });
    }

    get(key) {
        return new Promise((resolve) => {
            this._chromeStorageGet(key, function(value) {
                resolve(value[key]);
            });
        });
    }

    _chromeStorageSet(obj) {
        chrome.storage.local.set(obj);
    }

    _chromeStorageGet(key, callback) {
        chrome.storage.local.get(key, callback);
    }

}