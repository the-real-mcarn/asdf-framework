(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var asdf = require("../../../lib/index");
const { TileSprite, Texture, math } = asdf;
const texture = new Texture("./res/images/characters.png");

class King extends TileSprite {
    constructor () {
        super(texture, 32, 32);
        this.scale = { x: 2, y: 2 };

        this.rate = 0.1;
        this.frames = [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 }
        ];
        this.curTime = 0;
        this.curFrame = math.rand(0, this.frames.length);
        this.frame = this.frames[this.curFrame];

        this.speed = math.rand(20, 100)
        this.pos.y = math.rand(-16, 304);
        this.pos.x = math.rand(-32, 640);
    }
    update (dt, t) {
        const { rate, frames } = this;
        this.curTime += dt;
        if (this.curTime > rate) {
            this.frame = frames[this.curFrame++ % frames.length];
            this.curTime -= rate;
        }

        this.pos.x += (dt * this.speed);
        if (this.pos.x > 640 + 32) {
            this.pos.y = math.rand(-16, 304);
            this.pos.x = -32;
        }
    }
}

module.exports = King;
},{"../../../lib/index":16}],2:[function(require,module,exports){
var asdf = require("../../../lib/index");
const { TileSprite, Texture, math } = asdf;
const texture = new Texture("./res/images/characters.png");

class Snake extends TileSprite {
    constructor () {
        super(texture, 32, 32);
        this.scale = { x: 2, y: 2 };

        this.rate = 0.1;
        this.curTime = 0;
        this.curFrame = 0;
        this.frames = [
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 3 }
        ];
        this.frame = this.frames[this.curFrame];

        this.speed = math.rand(50, 100)
        this.pos.y = math.rand(0, 320);
        this.pos.x = math.rand(-32, 320);
    }
    update (dt, t) {
        const { rate, frames } = this;
        this.curTime += dt;
        if (this.curTime > rate) {
            this.frame = frames[this.curFrame++ % frames.length];
            this.curTime -= rate;
        }

        this.pos.x += (dt * this.speed);
        if (this.pos.x > 640 + 32) {
            this.pos.y = math.rand(-16, 304);
            this.pos.x = -32;
        }
    }
}

module.exports = Snake;
},{"../../../lib/index":16}],3:[function(require,module,exports){
var asdf = require('../../../lib/index');
const { Game, Container, CanvasRenderer, math, KeyControls, MouseControls, Text, Texture, Sprite, TileSprite } = asdf;

const game = new Game(640, 320, true);
const { scene, w, h } = game;

var King = require("../entities/King.js");
var Snake = require("../entities/Snake.js");

var snake = new Snake();
console.log(snake);
scene.add(snake);


for (let index = 0; index < 250; index++) {
    scene.add(new King());
}

const mouseAim = new MouseControls();

game.run((dt ,t) => {
    if (mouseAim.isDown) {
        console.log('cliccccccccccc');
    }
});

},{"../../../lib/index":16,"../entities/King.js":1,"../entities/Snake.js":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{"./Container":4,"./renderer/CanvasRenderer":17}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
class Text {
  constructor(text = "", style = {}) {
    this.pos = { x: 0, y: 0 };
    this.text = text;
    this.style = style;
  }
}
module.exports = Text;

},{}],9:[function(require,module,exports){
class Texture {
  constructor(url) {
    this.img = new Image();
    this.img.src = url;
  }
}
module.exports = Texture;

},{}],10:[function(require,module,exports){
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
},{"./Container":4,"./TileSprite":12}],11:[function(require,module,exports){
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
},{"./Container":4,"./TileSpriteXML":13}],12:[function(require,module,exports){
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
},{"./Sprite":6}],13:[function(require,module,exports){
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
},{"./Sprite":6}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./Container.js":4,"./Game.js":5,"./Sprite.js":6,"./SpriteSheetXML.js":7,"./Text.js":8,"./Texture.js":9,"./TileMap.js":10,"./TileMapXML.js":11,"./TileSprite.js":12,"./TileSpriteXML.js":13,"./controls/KeyControls.js":14,"./controls/MouseControls.js":15,"./renderer/CanvasRenderer.js":17,"./utilities/math.js":18}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
},{}]},{},[3]);
