function twemojifyNode(node, emojis) {
    var textNodesUnder = function(el) {
      var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
      while(n=walk.nextNode()) a.push(n);
      return a;
    };
    textNodesUnder(node).forEach(function(textNode) {
        emojis.forEach(function(emojiMapping) {
            var text = emojiMapping.text;
            var ascii = emojiMapping.ascii;
            var regexp = new RegExp(text, "gi");
            textNode.textContent = textNode.textContent.replace(regexp, ascii);
        })
    });
    twemoji.parse(node);
}

