/**
 * MouseControls class
 */
class MouseControls {
  /**
   * Sets container element where handlers will listen
   * @param {*} [container] Container element, defaults to document.body
   */
  constructor(container) {
    this.el = container || document.body;
    // State
    this.pos = { x: 0, y: 0 };
    this.isDown = false;
    this.pressed = false;
    this.released = false;
    // Handlers
    document.addEventListener('mousemove', this.move.bind(this), false);
    document.addEventListener('mousedown', this.down.bind(this), false);
    document.addEventListener('mouseup', this.up.bind(this), false);
  }

  /**
   * Recalculates mouse position based on the position of the container
   * @param {{ clientX: number, clientY: number}} param0 Native mouse event x and y values
   */
  mousePosFromEvent({ clientX, clientY }) {
    const { el, pos } = this;
    const rect = el.getBoundingClientRect();
    const xr = el.width / el.clientWidth;
    const yr = el.height / el.clientHeight;
    pos.x = (clientX - rect.left) * xr;
    pos.y = (clientY - rect.top) * yr;
  }

  /**
   * Calls mousePosFromEvent() on mouse move
   * @param {*} e Event
   */
  move(e) {
    this.mousePosFromEvent(e);
  }

  /**
   * Handles mouseDown event and calls mousePosFromEvent() to determine the exact pixel
   * @param {*} e Event
   */
  down(e) {
    this.isDown = true;
    this.pressed = true;
    this.mousePosFromEvent(e);
  }

  /**
   * Handles mouseUp event and calls mousePosFromEvent() to determine the exact pixel
   * @param {*} e Event
   */
  up() {
    this.isDown = false;
    this.released = true;
  }

  /**
   * Resets pressed and released values to make sure they are only true on a press or release
   */
  update() {
    this.released = false;
    this.pressed = false;
  }
}

export default MouseControls;
