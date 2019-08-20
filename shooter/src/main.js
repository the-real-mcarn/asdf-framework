import asdf from "../../asdf/index.js";
const { Container, CanvasRenderer, KeyControls, MouseControls, Text, Texture, Sprite } = asdf;

// Board Setup
  const w = 640;
  const h = 300;
  const renderer = new CanvasRenderer(w, h);
  document.querySelector("#board").appendChild(renderer.view);

// Setup game variables
  let dt = 0;
  let last = 0;
  let lastShot = 0;
  let lastSpawn = 0;
  let spawnSpeed = 1.0;
  let scoreAmount = 0;
  let gameOver = false;

// Setup game objects
  const scene = new Container();

// Load game textures
  const textures = {
    background: new Texture("./res/images/bg.png"),
    spaceship: new Texture("./res/images/spaceship.png"),
    bullet: new Texture("./res/images/bullet.png"),
    baddie: new Texture("./res/images/baddie.png")
  }

// Spaceship
  const controls = new KeyControls();
  const ship = new Sprite(textures.spaceship);
  ship.pos.x = 120;
  ship.pos.y = h / 2 - 16;
  ship.update = function(dt, t) {
    const { pos } = this;
    pos.x += controls.x * dt * 300;
    pos.y += controls.y * dt * 300;

    if (pos.x < 0) pos.x = 0;
    if (pos.x > w - 32) pos.x = w - 32;
    if (pos.y < 0) pos.y = 0;
    if (pos.y > h - 32) pos.y = h - 32;
  }

// Bullets
   const bullets = new Container();
   function fireBullet(x, y) {
     const bullet = new Sprite(textures.bullet);
     bullet.pos.x = x;
     bullet.pos.y = y;
     bullet.update = function(dt, t) {
       bullet.pos.x += 400 * dt;
     }
     bullets.add(bullet);
   }

// Bad guys
  const baddies = new Container();
  function spawnBaddie(x, y, speed) {
    const baddie = new Sprite(textures.baddie);
    baddie.pos.x = x;
    baddie.pos.y = y;
    baddie.update = function(dt) {
      this.pos.x += speed * dt;
      this.pos.y += Math.sin(this.pos.x / 15) * 1;
    };
    baddies.add(baddie);
  }

// Show score
  const score = new Text(`${scoreAmount}`, {
    font: "15pt Visitor",
    fill: "#000000",
    align: "left"
  });
  score.pos.x = 50;
  score.pos.y = 15;
  score.update = function() {
    if (gameOver) {
      score.pos.x = w / 2;
      score.pos.y = (h / 3) * 2;
      score.text = `Score:  ` + `${scoreAmount}`;
      score.style.align = "center";
      score.style.font = "24pt Visitor"
    } else {
      score.text = `${scoreAmount}`;
    }
  }

// Gameover
  function doGameOver() {
    const gameOverMessage = new Text(`Game Over`, {
      font: "45pt Visitor",
      fill: "#000000",
      align: "center"
    });
    gameOverMessage.pos.x = w / 2;
    gameOverMessage.pos.y = h / 3;

    scene.add(gameOverMessage);
    scene.remove(ship);
    scene.remove(baddies);
    scene.remove(bullets);
    gameOver = true;
  }

// Add game objects
  scene.add(new Sprite(textures.background));
  scene.add(ship);
  scene.add(bullets);
  scene.add(baddies);
  scene.add(score);


// Looping Code
function loopme(ms) {
  requestAnimationFrame(loopme);
  const t = ms / 1000;
  dt = t - last;
  last = t;

  // Game logic code
  if (controls.action && t - lastShot > 0.15) {
    lastShot = t;
    fireBullet(ship.pos.x + 24, ship.pos.y + 10);
  }

  // Spawn bad guys
  if (t - lastSpawn > spawnSpeed) {
    lastSpawn = t;
    const speed = -50 - (Math.random() * Math.random() * 100);
    const position = Math.random() * (h - 24);
    spawnBaddie(w, position, speed);

    spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001;
  }

  // Destroy bullets when they go out of the screen
  baddies.children.forEach(baddie => {
    bullets.children.forEach(bullet => {
      let dx_b = baddie.pos.x + 16 - (bullet.pos.x + 8);
      let dy_b = baddie.pos.y + 16 - (bullet.pos.y + 8);
      if (Math.sqrt(dx_b * dx_b + dy_b * dy_b) < 24) {
        bullet.dead = true;
        baddie.dead = true;
        if (!gameOver) {
          scoreAmount += Math.floor(t);
        }
      }

      if (bullet.pos.x > w + 20) {
        bullet.dead = true;
      }
    });
    let dx_s = baddie.pos.x + 16 - (ship.pos.x + 16)
    let dy_s = baddie.pos.y + 16 - (ship.pos.y + 16)
    if (Math.sqrt(dx_s * dx_s + dy_s * dy_s) < 32) {
      if (!gameOver) {
        doGameOver();
      }
      baddie.dead = true;
    }

    if (baddie.pos.x < -32) {
      if (!gameOver) {
        doGameOver();
      }
      baddie.dead = true;
    }
  });



  scene.update(dt, t);
  renderer.render(scene);
}
requestAnimationFrame(loopme);
