window.onload = () => {
    chrome.runtime.sendMessage({request: "getEmojis"}, function(emojis) {
        var deleteEmojiTable = document.getElementById("deleteEmojiTable");
        emojis.forEach(function(emoji) {
            var ascii = emoji.ascii;
            var text = emoji.text;


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

        twemoji.parse(deleteEmojiTable);

        var body = document.getElementsByTagName("body")[0];
        if( emojis.length > 0 ) {
            var deleteAllEmojisButton = createDeleteAllEmojisButton();
            body.appendChild(deleteAllEmojisButton);
        } else {
            var noEmojisMessage = createNoEmojisMessage();
            body.appendChild(noEmojisMessage);
        }
    });
};

function createDeleteAllEmojisButton() {
    var deleteAllEmojisButton = document.createElement("button");
    deleteAllEmojisButton.setAttribute("id", "deleteAllEmojis");
    var deleteAllEmojisText = document.createTextNode("Delete All");
    deleteAllEmojisButton.appendChild(deleteAllEmojisText);
    deleteAllEmojisButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({request: "deleteAllEmojis"});
    });
    return deleteAllEmojisButton;
}

function createNoEmojisMessage() {
    var noEmojisDiv = document.createElement("div");
    var noEmojisText = document.createTextNode("You haven't created any emojis yet!");
    noEmojisDiv.appendChild(noEmojisText);
    return noEmojisDiv;
}