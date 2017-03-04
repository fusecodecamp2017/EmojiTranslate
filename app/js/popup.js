window.onload = () => {
    document.getElementById('deleteAllEmojis').addEventListener('click', function() {
        chrome.runtime.sendMessage({request: "deleteAllEmojis"});
    });
    chrome.runtime.sendMessage({request: "getEmojis"}, function(emojis) {
        debugger;
        emojis.forEach(function(emoji) {
            var ascii = emoji.ascii;
            var text = emoji.text;

            var deleteEmojiTable = document.getElementById("deleteEmojiTable");

            var deleteEmojiRow = document.createElement("tr");
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
            deleteEmojiRow.appendChild(emojiColumn);
            deleteEmojiRow.appendChild(textColumn);
            deleteEmojiRow.appendChild(deleteButtonColumn);

            deleteButton.addEventListener("click", function() {
                chrome.runtime.sendMessage({request: "deleteEmoji", text: text}, function() {
                    deleteEmojiTable.removeChild(deleteEmojiRow);
                });
            });

            deleteEmojiTable.appendChild(deleteEmojiRow);
        });
    });
};