import asdf from "../../asdf/index.js";
const { Game, Container, CanvasRenderer, math, KeyControls, MouseControls, Text, Texture, Sprite } = asdf;

const game = new Game(640, 320, false);
const { scene, w, h } = game;

const buildings = scene.add(new Container());
const makeRandom = (b, x) => {
  b.scale.x = math.randf(1,3);
  b.scale.y = math.randf(1,3);
  b.pos.x = x;
  b.pos.y = h - b.scale.y * 64;
};

for (let x = 0; x < 50; x++) {
  const b = buildings.add(new Sprite(new Texture("res/images/building.png")));
  makeRandom(b, math.rand(w));
}

var rotation = 0;
const ship = new Sprite(new Texture("res/images/spaceship.png"));
ship.pivot = { x: 16, y: 16 };
scene.add(ship);


game.run((dt ,t) => {
  ship.update = function(dt, t) {
    const {scale} = this;
    scale.x = Math.abs(Math.sin(t)) + 1;
    scale.y = Math.abs(Math.sin(t)) + 1;

    rotation = rotation + 0.2;
    ship.rotation = rotation; 

    ship.pos.y = (Math.abs(Math.sin(t))) * 50 + (h / 2) - 16;
    ship.pos.x += dt * 50;
    if (ship.pos.x > w) {
      ship.pos.x = -32;
    }
  }

  buildings.map(b => {
    b.pos.x -= 100 * dt;
    if (b.pos.x < -80) {
      makeRandom(b,w);
    }
  });
});
