const canvas = document.querySelector("#board canvas");
const ctx = canvas.getContext("2d");
const { width: w, height: h } = canvas;
const center = w / 2;

// Setup Code
  ctx.fillStyle = '#000';
  ctx.globalAlpha = 0.02;

// Looping Code
function loopme(t) {
  requestAnimationFrame(loopme);

  // Logic Code
  ctx.save();
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 1;

  const x = Math.random() * w;
  const y = Math.random() * h;
  const radius = Math.random() * 10;

  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI * 2)
  ctx.fill();
  ctx.restore();

}
requestAnimationFrame(loopme);
