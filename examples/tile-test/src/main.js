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
