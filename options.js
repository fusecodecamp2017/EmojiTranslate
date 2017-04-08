window.onload = () => {
    chrome.runtime.sendMessage({request: 'getPreferences'}, (preferences) => {
        document.getElementById("reloadPage").checked = preferences.reloadPage;
    });

    document.getElementById("saveButton").addEventListener("click", () => {
        var preferences = {
            reloadPage: document.getElementById("reloadPage").checked
        };
        chrome.runtime.sendMessage({request: 'setPreferences', preferences: preferences});
    });
};
