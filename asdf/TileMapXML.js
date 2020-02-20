import Container from "./Container.js";
import TileSpriteXML from "./TileSpriteXML.js";

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

export default TileMapXML;