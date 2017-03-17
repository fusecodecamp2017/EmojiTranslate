QUnit.test('set puts the value in local storage and get retrieves it', function(assert) {
    var storageMap = {};
    chrome.storage.local = {
        get: (key, callback) => {
            callback(storageMap[key]);
        },
        set: (obj) => {
            for( var key in obj ) {
                var value = {};
                value[key] = obj;
                storageMap[key] = value;
            }
        }
    }

    var chromeStorageService = new ChromeStorageService();

    var done = assert.async();
    chromeStorageService.set("banana", "peanut butter")
    .then(() => chromeStorageService.get("banana"))
    .then((value) => assert.equal(value, "peanut butter"))
    .then(() => done());
});