var Container = require("./Container"),
	TileSpriteXML = require("./TileSpriteXML")
;

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
	
	pixelToMapPos(pos) {
		const { tileW, tileH } = this;
		return {
			x: Math.floor(pos.x / tileW),
			y: Math.floor(pos.y / tileH)
		};
	}

	mapToPixelPos(mapPos) {
		const { tileW, tileH } = this;
		return {
			x: mapPos.x * tileW,
			y: mapPos.y * tileH
		};
	}

	tileAtMapPos(mapPos) {
		return this.children[mapPos.y * this.mapW + mapPos.x];
	}

	tileAtPixelPos(pos) {
		return this.tileAtMapPos(this.pixelToMapPos(pos));
	}

	setFrameAtMapPos(mapPos, frame) {
		const tile = this.tileAtMapPos(mapPos);
		tile.frame = frame;
		return tile;
	}

	setFrameAtPixelPos(pos, frame) {
		return this.setFrameAtMapPos(this.pixelToMapPos(pos), frame);
	}

	tilesAtCorners(bounds, xo = 0, yo = 0) {
		return [
			[bounds.x, bounds.y], // Top-left
			[bounds.x + bounds.w, bounds.y], // Top-right
			[bounds.x, bounds.y + bounds.h], // Bottom-left
			[bounds.x + bounds.w, bounds.y + bounds.h] // Bottom-right
		].map(([x, y]) =>
			this.tileAtPixelPos({
				x: x + xo,
				y: y + yo
			})
		);
	}
}

module.exports = TileMapXML;