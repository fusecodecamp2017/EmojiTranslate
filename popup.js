window.onload = () => {
    renderPopup();
};

function renderPopup() {
    chrome.runtime.sendMessage({request: "getEmojis"}, function(emojis) {
        var emojiTable = document.getElementById("emojiTable");
        emojis.forEach(function(emoji) {
            var ascii = emoji.ascii;
            var text = emoji.text;

            var emojiRow = document.createElement("tr");
            var emojiColumn = document.createElement("td");
            var emojiText = document.createTextNode(ascii);
            var textColumn = document.createElement("td");
            var textText = document.createTextNode(text);
            var deleteButtonColumn = document.createElement("td");
            var deleteButton = document.createElement("button");
            var deleteButtonText = document.createTextNode("Delete");

            emojiColumn.appendChild(emojiText);
            textColumn.appendChild(textText);
            deleteButton.appendChild(deleteButtonText);
            deleteButtonColumn.appendChild(deleteButton);
            emojiRow.appendChild(emojiColumn);
            emojiRow.appendChild(textColumn);
            emojiRow.appendChild(deleteButtonColumn);

            deleteButton.addEventListener("click", function() {
                chrome.runtime.sendMessage({request: "deleteEmoji", text: text}, function() {
                });
            });

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
        chrome.runtime.sendMessage({request: "deleteAllEmojis"}, function() {
        });
    });
    return deleteAllEmojisButton;
}