chrome.runtime.sendMessage("", function(response) {
    var body = document.getElementsByTagName("body")[0];
    var myNameHeader = document.createElement("h1");
    var myNameText = document.createTextNode(response);
    myNameHeader.appendChild(myNameText);
    body.appendChild(myNameHeader);
});
