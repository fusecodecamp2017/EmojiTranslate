function surrogatePairs(asciiString) {
    return String.fromCharCode(_getHighCharacter(asciiString)) + String.fromCharCode(_getLowCharacter(asciiString))
}

function _getHighCharacter(asciiString) {
    return Math.floor((_hexNumberFromAsciiString(asciiString) - 0x10000) / 0x400) + 0xD800;
}

function _getLowCharacter(asciiString) {
    return ((_hexNumberFromAsciiString(asciiString) - 0x10000) % 0x400) + 0xDC00;
}

function _hexNumberFromAsciiString(asciiString) {
    return parseInt(asciiString,16);
}