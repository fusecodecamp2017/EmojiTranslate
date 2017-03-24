window.onload = () => {
    chrome.runtime.sendMessage({request: 'getPreferences'}, (preferences) => {
        document.getElementById("reloadPage").checked = preferences.reloadPage;
    });

    document.getElementById("saveButton").addEventListener("click", () => {
        var preferences = {
            reloadPage: document.getElementById("reloadPage").checked
        };
        chrome.runtime.sendMessage({request: 'setPreferences', preferences: preferences}, () => {
            showSuccessMessage();
            setTimeout(hideSuccessMessage, 5000);
        });
    });
};

function showSuccessMessage() {
    console.log("showSuccessMessage");
    document.getElementById("saveSuccessfulMessage").className = "";
}

function hideSuccessMessage() {
    console.log("hideSuccessMessage");
    document.getElementById("saveSuccessfulMessage").className = "hidden";
}
