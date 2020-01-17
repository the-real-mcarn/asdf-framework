import Sprite from "./Sprite.js";
/**
 * TileSprite class
 */
class TileSprite extends Sprite {
    /**
     * Creates sprite instance from unindexed spritesheet
     * @param {*} texture Instance of Texture with source image
     * @param {number} w Width of sprite on source image
     * @param {number} h Height of spirte on source image
     */
    constructor(texture, w, h) {
        super(texture);
        this.tileW = w;
        this.tileH = h;
        this.frame = { x: 0, y: 0 };
    }
}

export default TileSprite;