import Sprite from "./Sprite.js";

class TileSpriteXML extends Sprite {
    constructor(texture, xml, index) {
        super(texture);
        var src = xml.array[index];
        this.imgPos = { x: src['x'], y: src['y'] };
        this.width = src['width'];
        this.height = src['height'];
    }
}

export default TileSpriteXML;