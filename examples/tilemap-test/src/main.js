var asdf = require('../../../lib/index');
const { Game, Container, CanvasRenderer, math, KeyControls, MouseControls, Text, Texture, Sprite, TileSprite, TileMap, TileMapXML, SpriteSheetXML } = asdf;

const game = new Game(640, 320, true);
const { scene, w, h } = game;

const mouseAim = new MouseControls();

const tanksTexture = new Texture("./res/images/allSprites_default.png")
const tanksXml = new SpriteSheetXML("./res/images/allSprites_default.xml");
const map = { x: 640 / 64, y: 320 / 64 };

// Make a random level of tile indexes
const level = [
    135, 135, 135, 135, 135, 135, 135, 135, 135, 135,
    135, 135, 135, 135, 135, 135, 135, 135, 135, 135,
    158, 158, 158, 158, 158, 158, 158, 158, 158, 158,
    160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
    160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
];

scene.add(new TileMapXML(level, map.x, map.y, tanksTexture, tanksXml));

game.run((dt, t) => {
    if (mouseAim.isDown) {
        console.log('cliccccccccccc');
    }
});
