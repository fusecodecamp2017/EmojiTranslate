QUnit.test('emojify replaces \'heart\' with heart emoji', function(assert) {
    var text = "I heart you";
    var emojifiedText = 'I <img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png"> you';

    assert.equal(emojify(text), emojifiedText);
});