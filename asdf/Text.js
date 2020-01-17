/**
 * Text class
 */
class Text {
  /**
   * Prints styled text on canvas 
   * @param {String} text Text to print
   * @param {String} style Styles to apply to text
   */
  constructor(text = "", style = {}) {
    this.pos = { x: 0, y: 0 };
    this.text = text;
    this.style = style;
  }
}
export default Text;
