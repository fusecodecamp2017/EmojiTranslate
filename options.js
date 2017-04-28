window.onload = () => {
    chrome.runtime.sendMessage({request: 'getPreferences'}, (preferences) => {
        document.getElementById("reloadPage").checked = preferences.reloadPage;
        document.getElementById("replaceWholeWordsOnly").checked = preferences.replaceWholeWordsOnly;
    });

    document.getElementById("saveButton").addEventListener("click", () => {
        var preferences = {
            reloadPage: document.getElementById("reloadPage").checked,
            replaceWholeWordsOnly: document.getElementById("replaceWholeWordsOnly").checked
        };
        chrome.runtime.sendMessage({request: 'setPreferences', preferences: preferences}, function() {
            showSuccessMessage();
            setTimeout(hideSuccessMessage, 3000);
        });
    });
};

function showSuccessMessage() {
    document.getElementById("saveSuccessfulMessage").className = "";
}

function hideSuccessMessage() {
    document.getElementById("saveSuccessfulMessage").className = "hidden";
}
