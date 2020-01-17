import Sprite from "./Sprite.js";

/**
 * TileSpriteXML class
 */
class TileSpriteXML extends Sprite {
    /**
     * Creates sprite instance from XML indexed spritesheet
     * @param {*} texture Instance of Texture with source image
     * @param {*} xml Instance of SpriteSheetXML with xml index
     * @param {number} index Index of XML element
     */
    constructor(texture, xml, index) {
        super(texture);
        var src = xml.array[index];
        this.imgPos = { x: src['x'], y: src['y'] };
        this.width = src['width'];
        this.height = src['height'];
    }
}

export default TileSpriteXML;