import asdf from "../../asdf/index.js";
const { Container, CanvasRenderer, KeyControls, MouseControls, Text, Texture, Sprite } = asdf;

const canvas = document.querySelector("#board canvas");
const ctx = canvas.getContext("2d");
const { width: w, height: h } = canvas;
console.log(canvas);

// Setup Code
  const controls = new KeyControls();
  const mouse = new MouseControls(canvas);
  let x = w / 2;
  let y = h / 2;

// Looping Code
function loopme(ms) {
  requestAnimationFrame(loopme);
  ctx.fillStyle = '#111'
  // Game logic code
    ctx.save();
    ctx.fillRect(0,0,w,h);
    x = mouse.pos.x * 1;
    y = mouse.pos.y * 1;
    if (mouse.isDown) {
      ctx.fillStyle = '#00f'
    } else {
      ctx.fillStyle = '#f00'
    }
    ctx.fillRect(x, y, 5, 5);
    ctx.fillRect(0, 0, 5, 5);
    ctx.restore();
    mouse.update();
}
requestAnimationFrame(loopme);
