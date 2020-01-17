import Container from "./Container.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";

const STEP = 1 / 60;
const FRAME_MAX = 5 * STEP;

/**
 * Game class
 */
class Game {
    /**
     * Set the games parameters
     * @param {number} w Width of canvas
     * @param {number} h Height of canvas
     * @param {boolean} pixelated Turns canvas smoothening on or off
     * @param {String} [parent="#board"] HTML id of element to push the canvas element too
     */
    constructor(w, h, pixelated, parent = "#board") {
        this.w = w;
        this.h = h;
        this.renderer = new CanvasRenderer(w, h);
        document.querySelector(parent).appendChild(this.renderer.view);

        if (pixelated) {
            this.renderer.setPixelated();
        }

        this.scene = new Container();
    }

    /**
     * Start game loop
     * @param {Function} gameUpdate Function to run next to scene updates such as debug logging, etc.
     */
    run(gameUpdate = () => { }) {
        let dt = 0;
        let last = 0;
        const loop = ms => {
            requestAnimationFrame(loop);

            const t = ms / 1000;
            dt = Math.min(t - last, FRAME_MAX);
            last = t;

            this.scene.update(dt, t);
            gameUpdate(dt, t);
            this.renderer.render(this.scene);
        };
        requestAnimationFrame(loop);
    }
}

export default Game;