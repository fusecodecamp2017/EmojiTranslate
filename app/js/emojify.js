function emojify(string) {
//    return string.replace(/heart/g, '<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png">')
    return twemoji.parse(string.replace(/heart/g, '\u2764'))
}

function twemojify(string) {
    return twemoji.parse(string);
}