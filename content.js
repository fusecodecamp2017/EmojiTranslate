chrome.runtime.sendMessage("", function(emojis) {
    var textNodesUnder = function(el) {
      var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
      while(n=walk.nextNode()) a.push(n);
      return a;
    };
    var body = document.getElementsByTagName("body")[0];
    textNodesUnder(body).forEach(function(textNode) {
        emojis.forEach(function(emoji) {
            var regexp = new RegExp(emoji.text, "gi");
            textNode.textContent = textNode.textContent.replace(regexp, emoji.ascii);
        });
    });
});