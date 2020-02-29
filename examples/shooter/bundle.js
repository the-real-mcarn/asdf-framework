(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Container {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  add(child) {
    this.children.push(child);
    return child;
  }

  remove(child) {
    this.children = this.children.filter(c => c !== child);
    return child;
  }

  map(f) {
    return this.children.map(f);
  }

  update(dt, t) {
    this.children = this.children.filter(child => {
      if (child.update) {
        child.update(dt, t, this);
      }
      return child.dead ? false : true;
    });
  }
}
module.exports = Container;

},{}],2:[function(require,module,exports){
var Container = require("./Container"),
    CanvasRenderer = require('./renderer/CanvasRenderer')
;

const STEP = 1 / 60;
const FRAME_MAX = 5 * STEP;

class Game {
    constructor(w, h, pixelated, parent = "#board") {
        this.w = w;
        this.h = h;
        this.renderer = new CanvasRenderer(w, h);
        document.querySelector(parent).appendChild(this.renderer.view);

        if (pixelated) {
            this.renderer.setPixelated();
        }

        this.scene = new Container();
    }

    run(gameUpdate = () => { }) {
        let dt = 0;
        let last = 0;
        const loop = ms => {
            requestAnimationFrame(loop);

            const t = ms / 1000;
            dt = Math.min(t - last, FRAME_MAX);
            last = t;

            this.scene.update(dt, t);
            gameUpdate(dt, t);
            this.renderer.render(this.scene);
        };
        requestAnimationFrame(loop);
    }
}

module.exports = Game;
},{"./Container":1,"./renderer/CanvasRenderer":14}],3:[function(require,module,exports){
class Sprite {
  constructor(texture) {
    this.texture = texture;
    this.pos = { x: 0, y: 0 };
    this.anchor = { x: 0, y: 0 };
    this.scale = { x: 1, y: 1 };
    this.rotation = 0;
  }
}
module.exports = Sprite;

},{}],4:[function(require,module,exports){
class SpriteSheetXML {
    constructor(url) {
        this.array = [];
        this.fetchXMLtoArray(url);
    }

    fetchXMLtoArray(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);

        if (xhr.status === 200) {
            var children = xhr.responseXML.children[0].children;
            for (let index = 0; index < children.length; index++) {
                const element = children[index];
                this.array.push({
                    name: element.attributes.name.nodeValue,
                    x: element.attributes.x.nodeValue,
                    y: element.attributes.y.nodeValue,
                    width: element.attributes.width.nodeValue,
                    height: element.attributes.height.nodeValue
                });
            }
        } else {
            console.error('XML file cannot be loaded!')
        }
    }

    findIndex(attribute, value) {
        for (let index = 0; index < this.array.length; index++) {
            const element = this.array[index];
            if (element[attribute] == value) {
                return index;
            }
        }
    }
}

module.exports = SpriteSheetXML;
},{}],5:[function(require,module,exports){
class Text {
  constructor(text = "", style = {}) {
    this.pos = { x: 0, y: 0 };
    this.text = text;
    this.style = style;
  }
}
module.exports = Text;

},{}],6:[function(require,module,exports){
class Texture {
  constructor(url) {
    this.img = new Image();
    this.img.src = url;
  }
}
module.exports = Texture;

},{}],7:[function(require,module,exports){
var Container = require("./Container"),
    TileSprite = require("./TileSprite")
;

class TileMap extends Container {
  constructor(tiles, mapW, mapH, tileW, tileH, texture) {
    super();
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = mapW * tileW;
    this.h = mapH * tileH;

    this.children = tiles.map((frame, i) => {
      const s = new TileSprite(texture, tileW, tileH);
      s.frame = frame;
      s.pos.x = i % mapW * tileW;
      s.pos.y = Math.floor(i / mapW) * tileH;
      return s;
    });
  }
}

module.exports = TileMap;
},{"./Container":1,"./TileSprite":9}],8:[function(require,module,exports){
var Container = require("./Container"),
    TileSpriteXML = require("./TileSpriteXML")
;

class TileMapXML extends Container {
    constructor(tiles, mapW, mapH, texture, xml) {
        super(texture);
        this.mapW = mapW;
        this.mapH = mapH;
        this.tileW = xml.array[tiles[0]].width;
        this.tileH = xml.array[tiles[0]].height;
        this.w = mapW * this.tileW;
        this.h = mapH * this.tileH;
        
        this.children = tiles.map((frame, i) => {
            const s = new TileSpriteXML(texture, xml, frame);
            s.frame = frame;
            s.pos.x = i % mapW * this.tileW;
            s.pos.y = Math.floor(i / mapW) * this.tileH;
            return s;
        });
    }
}

module.exports = TileMapXML;
},{"./Container":1,"./TileSpriteXML":10}],9:[function(require,module,exports){
var Sprite = require("./Sprite");

class TileSprite extends Sprite {
    constructor(texture, w, h) {
        super(texture);
        this.tileW = w;
        this.tileH = h;
        this.frame = { x: 0, y: 0 };
    }
}

module.exports = TileSprite;
},{"./Sprite":3}],10:[function(require,module,exports){
var Sprite = require("./Sprite");

class TileSpriteXML extends Sprite {
    constructor(texture, xml, index) {
        super(texture);
        var src = xml.array[index];
        this.imgPos = { x: src['x'], y: src['y'] };
        this.width = src['width'];
        this.height = src['height'];
    }
}

module.exports = TileSpriteXML;
},{"./Sprite":3}],11:[function(require,module,exports){
class KeyControls {
  
  constructor() {
    this.keys = {};
    // Bind event handlers
    document.addEventListener("keydown", e => {
      if ([37, 38, 39, 40].indexOf(e.which) >= 0) {
        e.preventDefault();
      }
      this.keys[e.which] = true;
    }, false);
    document.addEventListener('keyup', e => {
      this.keys[e.which] = false;
    }, false);
  }

  get action() {
    // Spacebar
    return this.keys[32];
  }

  get x() {
    // Arrow Left or A (WASD)
    if (this.keys[37] || this.keys[65]) {
      return -1;
    }
    // Arrow Right or D (WASD)
    if (this.keys[39] || this.keys[68]) {
      return 1;
    }
    return 0;
  }

  get y() {
    // Arrow Up or W (WASD)
    if (this.keys[38] || this.keys[87]) {
      return -1;
    }
    // Arrow Down or S (WASD)
    if (this.keys[40] || this.keys[83]) {
      return 1;
    }
    return 0;
  }

  
  key(key, value) {
    if (value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  reset() {
    for (let key in this.keys) {
      this.keys[key] = false;
    }
  }

}

module.exports = KeyControls;

},{}],12:[function(require,module,exports){
class MouseControls {
  constructor(container) {
    this.el = container || document.body;
    // State
    this.pos = { x: 0, y: 0 };
    this.isDown = false;
    this.pressed = false;
    this.released = false;
    // Handlers
    document.addEventListener('mousemove', this.move.bind(this), false);
    document.addEventListener('mousedown', this.down.bind(this), false);
    document.addEventListener('mouseup', this.up.bind(this), false);
  }

  mousePosFromEvent({ clientX, clientY }) {
    const { el, pos } = this;
    const rect = el.getBoundingClientRect();
    const xr = el.width / el.clientWidth;
    const yr = el.height / el.clientHeight;
    pos.x = (clientX - rect.left) * xr;
    pos.y = (clientY - rect.top) * yr;
  }

  move(e) {
    this.mousePosFromEvent(e);
  }

  down(e) {
    this.isDown = true;
    this.pressed = true;
    this.mousePosFromEvent(e);
  }

  up() {
    this.isDown = false;
    this.released = true;
  }

  update() {
    this.released = false;
    this.pressed = false;
  }
}

module.exports = MouseControls;

},{}],13:[function(require,module,exports){
var Container = require("./Container.js"),
    CanvasRenderer = require("./renderer/CanvasRenderer.js"),
    Game = require("./Game.js"),
    math = require("./utilities/math.js"),
    KeyControls = require("./controls/KeyControls.js"),
    MouseControls = require("./controls/MouseControls.js"),
    Sprite = require("./Sprite.js"),
    TileMap = require("./TileMap.js"),
    TileMapXML = require("./TileMapXML.js"),
    TileSprite = require("./TileSprite.js"),
    TileSpriteXML = require("./TileSpriteXML.js"),
    Text = require("./Text.js"),
    Texture = require("./Texture.js"),
    SpriteSheetXML = require("./SpriteSheetXML.js")
;

module.exports = {
  CanvasRenderer,
  Container,
  Game,
  math,
  KeyControls,
  MouseControls,
  Sprite,
  TileMap,
  TileMapXML,
  TileSprite,
  SpriteSheetXML,
  TileSpriteXML,
  Text,
  Texture
};

},{"./Container.js":1,"./Game.js":2,"./Sprite.js":3,"./SpriteSheetXML.js":4,"./Text.js":5,"./Texture.js":6,"./TileMap.js":7,"./TileMapXML.js":8,"./TileSprite.js":9,"./TileSpriteXML.js":10,"./controls/KeyControls.js":11,"./controls/MouseControls.js":12,"./renderer/CanvasRenderer.js":14,"./utilities/math.js":15}],14:[function(require,module,exports){
class CanvasRenderer {
  
  constructor(w, h) {
    const canvas = document.createElement("canvas");
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.textBaseLine = "top";
  }

  setPixelated() {
    this.ctx['imageSmoothingEnabled'] = false;       /* standard */
    this.ctx['mozImageSmoothingEnabled'] = false;    /* Firefox */
    this.ctx['oImageSmoothingEnabled'] = false;      /* Opera */
    this.ctx['webkitImageSmoothingEnabled'] = false; /* Safari */
    this.ctx['msImageSmoothingEnabled'] = false;     /* IE */
  }

  render(container, clear = true) {
    const { ctx } = this;
    function renderRec(container) {
      // Render container children
      container.children.forEach(child => {
        if (child.visible == false) {
          return;
        }

        ctx.save();

        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }

        if (child.anchor) {
          ctx.translate(child.anchor.x, child.anchor.y);
        }

        if (child.scale) {
          ctx.scale(child.scale.x, child.scale.y);
        }

        if (child.rotation) {
          const px = child.pivot ? child.pivot.x : 0;
          const py = child.pivot ? child.pivot.y : 0;
          ctx.translate(px, py);
          ctx.rotate(child.rotation);
          ctx.translate(-px, -py);
        }

        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);
        }

        else if (child.texture) {
          const img = child.texture.img;
          if (child.tileW && child.tileH) {
            ctx.drawImage(
              img,
              child.frame.x * child.tileW,
              child.frame.y * child.tileH,
              child.tileW, child.tileH,
              0, 0,
              child.tileW, child.tileH
            );
          } else if (child.imgPos && child.width && child.height) {
            ctx.drawImage(
              img,
              child.imgPos.x,
              child.imgPos.y,
              child.width, child.height,
              0, 0,
              child.width, child.height
            );
          } else {
            ctx.drawImage(img, 0, 0);
          }
        }

        // Handle children with children
        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      })
    }
    if (clear) {
      ctx.clearRect(0, 0, this.w, this.h);
    }
    renderRec(container);
  }
}
module.exports = CanvasRenderer;

},{}],15:[function(require,module,exports){
function rand(min, max) {
  return Math.floor(randf(min, max));
}

function randf(min, max) {
  if (max == null) {
    max = min || 1;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

function randOneFrom(items) {
  return items[rand(items.length)];
}

function randOneIn(max = 2) {
  return rand(0, max) === 0;
}

module.exports = {
  rand,
  randf,
  randOneFrom,
  randOneIn
};
},{}],16:[function(require,module,exports){
var asdf = require('../../../asdf/index');
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
ship.update = function (dt, t) {
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
  bullet.update = function (dt, t) {
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
  baddie.update = function (dt) {
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
score.update = function () {
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

},{"../../../asdf/index":13}]},{},[16]);
