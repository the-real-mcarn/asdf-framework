class Lightsource {
	constructor(x, y, mapX, mapY, mapW, mapH, style = { start: "rgba(0, 0, 0, 0)", stop: "rgba(0, 0, 0, 0.5)", radius: 100 }) {
		this.pos = { mapX, mapY };
		this.radPos = { x, y };
		this.mapW = mapW;
		this.mapH = mapH;
		this.radius = style.radius;
		this.style = style;
	}
}

module.exports = Lightsource;