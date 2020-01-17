import Container from "./Container.js";
import TileSpriteXML from "./TileSpriteXML.js";

/**
 * TileMapXML class
 */
class TileMapXML extends Container {
    /**
     * Draws array of tiles from XML indexed spritesheet
     * @param {number[]} tiles Array of XML indexes
     * @param {*} mapW Amount of tiles over the width of the map
     * @param {*} mapH Amount of tiles over the height of the map
     * @param {*} texture Texture instance of source image file
     * @param {*} xml SpriteSheetXML instance of source xml file
     */
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