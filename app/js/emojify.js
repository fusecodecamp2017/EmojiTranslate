function emojify(string) {
    return string.replace(/heart/g, '<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png">')
}