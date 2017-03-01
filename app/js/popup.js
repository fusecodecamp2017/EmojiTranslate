window.onload = () => {
    document.getElementById('deleteAllEmojis').addEventListener('click', function() {
        chrome.runtime.sendMessage("deleteAllEmojis");
    });
};