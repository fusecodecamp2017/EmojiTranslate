function emojify(string) {
//    return string.replace(/heart/g, '<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/36x36/2764.png">')
    return twemoji.parse(string.replace(/heart/g, '\u2764'))
}

function twemojify(string) {
    return twemoji.parse(string);
}

function twemojifyNode(node, emojis) {
    var textNodesUnder = function(el) {
      var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
      while(n=walk.nextNode()) a.push(n);
      return a;
    };
    textNodesUnder(node).forEach(function(textNode) {
        emojis.forEach(function({word, ascii}) {
            var regexp = new RegExp(word, "gi");
            textNode.textContent = textNode.textContent.replace(regexp, ascii);
        })
    });
    twemoji.parse(node);
}

