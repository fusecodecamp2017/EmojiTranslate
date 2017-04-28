window.onload = () => {
    renderPopup();
};

function renderPopup() {
    chrome.runtime.sendMessage("", function(emojis) {
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
    });
}