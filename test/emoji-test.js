QUnit.test('emojify replaces \'heart\' with heart emoji', function(assert) {
    var text = "I heart you";
    var emojifiedText = 'I <img class="emoji" draggable="false" alt="\u2764" src="https://twemoji.maxcdn.com/2/72x72/2764.png"> you';

    assert.equal(emojify(text), emojifiedText);
});

QUnit.test('twemojify replaces unix emojii character codes with emojii images', function(assert) {
    var text = 'I \u2764 you';
    var emojifiedText = 'I <img class="emoji" draggable="false" alt="\u2764" src="https://twemoji.maxcdn.com/2/72x72/2764.png"> you';

    assert.equal(twemojify(text), emojifiedText);
});

QUnit.test('twemojifyNode replaces all text node text within an html element with emojis', function(assert) {
    var html = document.createElement("html");
    var htmlText = document.createTextNode("What the heart");
    var body = document.createElement("body");
    var parentDiv = document.createElement("div");
    var parentDivText = document.createTextNode("My heart bleeds");
    var childDiv = document.createElement("div");
    var childDivText = document.createTextNode("Some text");
    var unorderedList = document.createElement("ul");
    var firstListItem = document.createElement("li");
    var firstListItemText = document.createTextNode("heart of gold");
    var secondListItem = document.createElement("li");
    var secondListItemText = document.createTextNode("iron lung");
    var thirdListItem = document.createElement("li");
    var thirdListItemText = document.createTextNode("metal heart");

    html.appendChild(htmlText);
    html.appendChild(body);
    body.appendChild(parentDiv);
    parentDiv.appendChild(parentDivText);
    parentDiv.appendChild(childDiv);
    childDiv.appendChild(childDivText);
    childDiv.appendChild(unorderedList);
    unorderedList.appendChild(firstListItem);
    unorderedList.appendChild(secondListItem);
    unorderedList.appendChild(thirdListItem);
    firstListItem.appendChild(firstListItemText);
    secondListItem.appendChild(secondListItemText);
    thirdListItem.appendChild(thirdListItemText);

    twemojifyNode(html);

    var htmlText = html.removeChild(html.firstChild);
    var htmlEmojiImg = html.removeChild(html.firstChild);
    var body = html.removeChild(html.firstChild);
    var parentDiv = body.removeChild(body.firstChild);
    var parentDivText1 = parentDiv.removeChild(parentDiv.firstChild);
    var parentDivEmojiImg = parentDiv.removeChild(parentDiv.firstChild);
    var parentDivText2 = parentDiv.removeChild(parentDiv.firstChild);
    var childDiv = parentDiv.removeChild(parentDiv.firstChild);
    var childDivText = childDiv.removeChild(childDiv.firstChild);
    var unorderedList = childDiv.removeChild(childDiv.firstChild);
    var firstListItem = unorderedList.removeChild(unorderedList.firstChild);
    var secondListItem = unorderedList.removeChild(unorderedList.firstChild);
    var thirdListItem = unorderedList.removeChild(unorderedList.firstChild);
    var firstListItemEmojiImg = firstListItem.removeChild(firstListItem.firstChild);
    var firstListItemText = firstListItem.removeChild(firstListItem.firstChild);
    var secondListItemText = secondListItem.removeChild(secondListItem.firstChild);
    var thirdListItemText = thirdListItem.removeChild(thirdListItem.firstChild);
    var thirdListItemEmojiImg = thirdListItem.removeChild(thirdListItem.firstChild);

    assert.equal(htmlText.nodeValue, 'What the ');
    assert.equal(htmlEmojiImg.alt, '\u2764');
    assert.equal(parentDivText1.nodeValue, 'My ');
    assert.equal(parentDivEmojiImg.alt, '\u2764');
    assert.equal(parentDivText2.nodeValue, ' bleeds');
    assert.equal(childDivText.nodeValue, 'Some text');
    assert.equal(firstListItemEmojiImg.alt, '\u2764');
    assert.equal(firstListItemText.nodeValue, ' of gold');
    assert.equal(secondListItemText.nodeValue, 'iron lung');
    assert.equal(thirdListItemText.nodeValue, 'metal ');
    assert.equal(thirdListItemEmojiImg.alt, '\u2764');
});