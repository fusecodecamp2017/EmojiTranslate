class ChromeStorageService {

    set(key, value) {
        return new Promise((resolve) => {
            var obj = {};
            obj[key] = value;
            chrome.storage.local.set(obj).then(() => {
                resolve();
            });
        });
    }

    get(key) {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, function(value) {
                resolve(value[key]);
            });
        });
    }

}