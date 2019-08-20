const canvas = document.querySelector("#board canvas");
const ctx = canvas.getContext("2d");
const { width: w, height: h } = canvas;
const center = w / 2;
ctx.fillStyle = "black";
ctx.font = "20px Visitor";
ctx.textAlign = "left";

function printText(str, l) {
  var words = str.split(" ");
  var text = "";
  var line = 1;
  for (var i = 0; i < words.length; i++) {
    console.log(words[i]);
    if ((text.split("").length + words[i].split("").length + 1) <= l * line) {
      text = text + `${words[i]}`;
      if (words[i + 1] != undefined) {
        if ((text.split("").length + words[i + 1].split("").length + 1) <= l * line) {
          text = text + ` `;
        }
      }
    } else {
      text = text + "\n" + `${words[i]}` + " ";
      line++;
    }
  }
  console.log(text);
}

printText("Oh really, are you going to tell me this function is going to cut of the words very awkwardly?", 32);
