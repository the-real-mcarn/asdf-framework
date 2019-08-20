const canvas = document.querySelector("#board canvas");
const ctx = canvas.getContext("2d");
const { width: w, height: h } = canvas;
const center = w / 2;

// Setup Code


// Looping Code
function loopme(t) {
  requestAnimationFrame(loopme);

}
requestAnimationFrame(loopme);
