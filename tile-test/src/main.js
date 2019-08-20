import asdf from "../../asdf/index.js";
const { Game, Container, CanvasRenderer, math, KeyControls, MouseControls, Text, Texture, Sprite, TileSprite } = asdf;

const game = new Game(640, 320, true);
const { scene, w, h } = game;

import King from "../entities/King.js";
import Snake from "../entities/Snake.js";

scene.add(new Snake());

for (let index = 0; index < 250; index++) {
    scene.add(new King());
}

const mouseAim = new MouseControls();

game.run((dt ,t) => {
    if (mouseAim.isDown) {
        console.log('cliccccccccccc');
    }
});
