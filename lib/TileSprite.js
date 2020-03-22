var Sprite = require("./Sprite"),
	AnimManager = require("./AnimManager");

class TileSprite extends Sprite {
	constructor(texture, w, h) {
		super(texture);
		this.tileW = w;
		this.tileH = h;
		this.frame = { x: 0, y: 0 };
		this.anims = new AnimManager(this);
	}
  
	update(dt) {
		this.anims.update(dt);
	}
  
	get w() {
		return this.tileW * Math.abs(this.scale.x);
	}
  
	get h() {
		return this.tileH * Math.abs(this.scale.y);
	}
}

module.exports = TileSprite;