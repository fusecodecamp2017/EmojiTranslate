window.onload = () => {
  document.getElementById("helloEmojiTranslate").addEventListener("click", () => console.log("Hello Emoji Translate!"));

  document.getElementById("emojify").addEventListener("click", () => {
    var text = document.getElementById("textToBeEmojified").value;
    document.getElementById("emojifiedText").innerHTML = emojify(text);
  });
};