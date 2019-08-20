import asdf from "../../asdf/index.js";
const { TileSprite, Texture, math } = asdf;
const texture = new Texture("./res/images/characters.png");

class Snake extends TileSprite {
    constructor () {
        super(texture, 32, 32);
        this.scale = { x: 2, y: 2 };

        this.rate = 0.1;
        this.curTime = 0;
        this.curFrame = 0;
        this.frames = [
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 3 }
        ];
        this.frame = this.frames[this.curFrame];

        this.speed = math.rand(50, 100)
        this.pos.y = math.rand(0, 320);
        this.pos.x = math.rand(-32, 320);
    }
    update (dt, t) {
        const { rate, frames } = this;
        this.curTime += dt;
        if (this.curTime > rate) {
            this.frame = frames[this.curFrame++ % frames.length];
            this.curTime -= rate;
        }

        this.pos.x += (dt * this.speed);
        if (this.pos.x > 640 + 32) {
            this.pos.y = math.rand(-16, 304);
            this.pos.x = -32;
        }
    }
}

export default Snake;