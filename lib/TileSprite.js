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