window.onload = () => {
    document.getElementById("saveButton").addEventListener("click", () => {
        var preferences = {
            reloadPage: document.getElementById("reloadPage").checked
        };
        chrome.runtime.sendMessage({request: 'setPreferences', preferences: preferences});
    });
};
