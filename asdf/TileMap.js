import Container from "./Container.js";
import TileSprite from "./TileSprite.js";

/**
 * Tilemap class
 */
class TileMap extends Container {
  /**
   * Draws array of tiles from unindexed spritesheet
   * @param {[ { x: number, y: number} ]} tiles Array of x and y values of the source tile on an unindexed Spritesheet
   * @param {number} mapW Amount of tiles over the width of the map
   * @param {number} mapH Amount of tiles over the height of the map
   * @param {number} tileW Width of source tile(s) in pixels
   * @param {number} tileH Height of source tile(s) in pixels
   * @param {*} texture Texture instance of source image file
   */
  constructor(tiles, mapW, mapH, tileW, tileH, texture) {
    super();
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = mapW * tileW;
    this.h = mapH * tileH;

    this.children = tiles.map((frame, i) => {
      const s = new TileSprite(texture, tileW, tileH);
      s.frame = frame;
      s.pos.x = i % mapW * tileW;
      s.pos.y = Math.floor(i / mapW) * tileH;
      return s;
    });
  }
}

export default TileMap;