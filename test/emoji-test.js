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