class PreferencesService {

    constructor() {
        this.chromeStorage = new ChromeStorageService();
    }

    init() {
        var defaultPreferences = {
            reloadPage: true
        };
        this.chromeStorage.set('preferences', defaultPreferences);
    }

    getPreferences() {
        return this.chromeStorage.get('preferences');
    }

    setPreferences(preferences) {
        this.chromeStorage.set('preferences', preferences);
    }

}