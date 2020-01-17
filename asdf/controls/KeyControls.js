/**
 * KeyControls class
 */
class KeyControls {
  /**
   * Listens for keypresses and prevents default actions
   */
  constructor() {
    this.keys = {};
    // Bind event handlers
    document.addEventListener("keydown", e => {
      if ([37, 38, 39, 40].indexOf(e.which) >= 0) {
        e.preventDefault();
      }
      this.keys[e.which] = true;
    }, false);
    document.addEventListener('keyup', e => {
      this.keys[e.which] = false;
    }, false);
  }

  /**
   * Returns value of action key (spacebar)
   * @returns {boolean} Key value
   */
  get action() {
    // Spacebar
    return this.keys[32];
  }

  /**
   * Returns -1 on Arrow Left or A
   * 
   * Returns 1 on Arrow Right or D
   * @returns {number} Key Value
   */
  get x() {
    // Arrow Left or A (WASD)
    if (this.keys[37] || this.keys[65]) {
      return -1;
    }
    // Arrow Right or D (WASD)
    if (this.keys[39] || this.keys[68]) {
      return 1;
    }
    return 0;
  }

  /**
    * Returns -1 on Arrow Up or W
    * 
    * Returns 1 on Arrow Down or S
    * @returns {number} Key value
    */
  get y() {
    // Arrow Up or W (WASD)
    if (this.keys[38] || this.keys[87]) {
      return -1;
    }
    // Arrow Down or S (WASD)
    if (this.keys[40] || this.keys[83]) {
      return 1;
    }
    return 0;
  }

  /**
   * Read or write value of any key
   * @param {number} key Keycode for targetted key
   * @param {*} [value] Value to set to key
   * @return {*} Value of key
   */
  key(key, value) {
    if (value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  /**
   * Resets default value to all keys
   */
  reset() {
    for (let key in this.keys) {
      this.keys[key] = false;
    }
  }

}
export default KeyControls;
