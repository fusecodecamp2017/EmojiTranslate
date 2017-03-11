window.onload = () => {
    renderPopup();
};

function renderPopup() {
    var deleteEmojiTable = document.getElementById("deleteEmojiTable");
    clearChildren(deleteEmojiTable);
    var existingDeleteAllEmojisButton = document.getElementById("deleteAllEmojis");
    var existingNoEmojisMessage = document.getElementById("noEmojisMessage");
    var body = document.getElementsByTagName("body")[0];
    if( existingDeleteAllEmojisButton ) {
        body.removeChild(existingDeleteAllEmojisButton);
    }
    if( existingNoEmojisMessage ) {
        body.removeChild(existingNoEmojisMessage);
    }
    getEmojis().then((emojis) => {
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
                    renderPopup();
                });
            });

            deleteEmojiTable.appendChild(deleteEmojiRow);
        });

        twemoji.parse(deleteEmojiTable);
        renderFooter(emojis.length);
    });
}

function getEmojis() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({request: "getEmojis"}, function(emojis) {
            resolve(emojis);
        });
    });
}

function renderFooter(emojisCount) {
    var body = document.getElementsByTagName("body")[0];
    if( emojisCount > 0 ) {
        var deleteAllEmojisButton = createDeleteAllEmojisButton();
        body.appendChild(deleteAllEmojisButton);
    } else {
        var noEmojisMessage = createNoEmojisMessage();
        body.appendChild(noEmojisMessage);
    }
}

function createDeleteAllEmojisButton() {
    var deleteAllEmojisButton = document.createElement("button");
    deleteAllEmojisButton.setAttribute("id", "deleteAllEmojis");
    var deleteAllEmojisText = document.createTextNode("Delete All");
    deleteAllEmojisButton.appendChild(deleteAllEmojisText);
    deleteAllEmojisButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({request: "deleteAllEmojis"}, function() {
            renderPopup();
        });
    });
    return deleteAllEmojisButton;
}

function createNoEmojisMessage() {
    var noEmojisDiv = document.createElement("div");
    noEmojisDiv.setAttribute("id", "noEmojisMessage")
    var noEmojisText = document.createTextNode("You haven't created any emojis yet!");
    noEmojisDiv.appendChild(noEmojisText);
    return noEmojisDiv;
}

function clearChildren(element) {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}