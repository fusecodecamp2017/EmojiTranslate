window.onload = () => {
    renderPopup();
};

function renderPopup() {
    chrome.runtime.sendMessage("getEmojis", function(emojis) {
        var emojiTable = document.getElementById("emojiTable");
        emojis.forEach(function(emoji) {
            var ascii = emoji.ascii;
            var text = emoji.text;

            var emojiRow = document.createElement("tr");
            var emojiColumn = document.createElement("td");
            var emojiText = document.createTextNode(ascii);
            var textColumn = document.createElement("td");
            var textText = document.createTextNode(text);

            emojiColumn.appendChild(emojiText);
            textColumn.appendChild(textText);
            emojiRow.appendChild(emojiColumn);
            emojiRow.appendChild(textColumn);

            emojiTable.appendChild(emojiRow);
        });

        var deleteAllEmojisButton = createDeleteAllEmojisButton();
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(deleteAllEmojisButton);
    });
}

function createDeleteAllEmojisButton() {
    var deleteAllEmojisButton = document.createElement("button");
    deleteAllEmojisButton.setAttribute("id", "deleteAllEmojis");
    var deleteAllEmojisText = document.createTextNode("Delete All");
    deleteAllEmojisButton.appendChild(deleteAllEmojisText);
    deleteAllEmojisButton.addEventListener('click', function() {
        chrome.runtime.sendMessage("deleteAllEmojis", function() {
        });
    });
    return deleteAllEmojisButton;
}