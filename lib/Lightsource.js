class Lightsource {
	constructor(radius, style = { start: "rgba(255,255,255,0.5)", stop: "rgba(0,0,0,0.9)" }) {
		this.pos = { x: 0, y: 0 };
		this.radius = radius;
		this.style = style;
	}
}
  
module.exports = Lightsource;