const Lightsource = require("./Lightsource.js");
const Container = require("./Container.js");

class Lighting extends Container {
	constructor(x, y, mapW, mapH, sources, style = { start: "rgba(0, 0, 0, 0)", stop: "rgba(0, 0, 0, 0.5)", radius: 75 }) {
		super();
		this.pos = { x, y };
		this.w = mapW;
		this.h = mapH;

		this.style = style;
		if (sources.length > 1) {
			this.style.stop = `rgba(0, 0, 0, ${1 - Math.round(Math.pow(0.25, 1 / sources.length) * 100) / 100})`;
			console.log(this.style.stop);
		}

		for (let index = 0; index < sources.length; index++) {
			const element = sources[index];
			this.children.push(new Lightsource(element.x, element.y, x, y, mapW, mapH, this.style));
		}
	}
}

module.exports = Lighting;