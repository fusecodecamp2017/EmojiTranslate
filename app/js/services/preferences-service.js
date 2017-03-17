class PreferencesService {

    init() {
        var defaultPreferences = {
            reloadPage: true
        };
        chrome.storage.local.set({'preferences': defaultPreferences});
    }

    getPreferences() {
        return new Promise((resolve) => {
            chrome.storage.local.get('preferences', function(obj) {
                resolve(obj.preferences || {});
            });
        });
    }

    setPreferences(preferences) {
        chrome.storage.local.set({'preferences': preferences});
    }

}