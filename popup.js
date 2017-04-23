window.onload = () => {
    renderPopup();
};

function renderPopup() {
    chrome.runtime.sendMessage({request: "getEmojis"}, function(emojis) {
        var emojiTable = document.getElementById("emojiTable");
        clearChildren(emojiTable);
        var existingDeleteAllEmojisButton = document.getElementById("deleteAllEmojis");
        var existingNoEmojisMessage = document.getElementById("noEmojisMessage");
        var existingDisableEmojiSubstitution = document.getElementById("disableEmojiSubstitution");
        var body = document.getElementsByTagName("body")[0];
        if( existingDeleteAllEmojisButton ) {
            body.removeChild(existingDeleteAllEmojisButton);
        }
        if( existingNoEmojisMessage ) {
            body.removeChild(existingNoEmojisMessage);
        }
        if( existingDisableEmojiSubstitution ) {
            body.removeChild(existingDisableEmojiSubstitution);
        }
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
                    renderPopup();
                });
            });

            emojiTable.appendChild(emojiRow);
        });

        renderFooter(emojis.length);
    });
}

function renderFooter(emojisCount) {
    var body = document.getElementsByTagName("body")[0];
    if( emojisCount > 0 ) {
        var deleteAllEmojisButton = createDeleteAllEmojisButton();
        body.appendChild(deleteAllEmojisButton);
        chrome.runtime.sendMessage({request: "getEmojiSubstitutionEnabled"}, function(emojiSubstitutionEnabled) {
            var disableEmojiSubstitutionCheckbox = createDisableEmojiSubstitutionCheckbox(emojiSubstitutionEnabled);
            body.appendChild(disableEmojiSubstitutionCheckbox);
        });
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

function createDisableEmojiSubstitutionCheckbox(emojiSubstitutionEnabled) {
    var div = document.createElement("div");
    div.setAttribute("id", "disableEmojiSubstitution");
    var checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.checked = !emojiSubstitutionEnabled;
    checkboxInput.addEventListener("change", function(e) {
        chrome.runtime.sendMessage({request: "setEmojiSubstitutionEnabled", emojiSubstitutionEnabled: !e.target.checked}, function() {});
    });
    var checkboxInputText = document.createTextNode("Disable Emojis");
    div.appendChild(checkboxInput);
    div.appendChild(checkboxInputText);
    return div;
}

function createDisableEmojiSubstitutionCheckboxText() {
    var checkboxInputTextSpan = document.createElement("span");
    var checkboxInputText = document.createTextNode("Disable Emojis");
    checkboxInputTextSpan.appendChild(checkboxInputText);
    return checkboxInputTextSpan;
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