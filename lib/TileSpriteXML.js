var Sprite = require("./Sprite"),
	AnimManager = require("./AnimManager");

class TileSpriteXML extends Sprite {
	constructor(texture, xml, index) {
		super(texture);
		var src = xml.array[index];
		this.imgPos = { x: src["x"], y: src["y"] };
		this.width = src["width"];
		this.height = src["height"];
		this.anims = new AnimManager(this);
	}
  
	update(dt) {
		this.anims.update(dt);
	}
  
	get w() {
		return this.width * Math.abs(this.scale.x);
	}
  
	get h() {
		return this.height * Math.abs(this.scale.y);
	}
}

module.exports = TileSpriteXML;