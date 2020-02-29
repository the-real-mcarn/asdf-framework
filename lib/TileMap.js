var Container = require("./Container"),
    TileSprite = require("./TileSprite")
;

class TileMap extends Container {
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

module.exports = TileMap;