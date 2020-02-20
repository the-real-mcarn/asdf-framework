
class KeyControls {
  
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

  get action() {
    // Spacebar
    return this.keys[32];
  }

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

  
  key(key, value) {
    if (value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  reset() {
    for (let key in this.keys) {
      this.keys[key] = false;
    }
  }

}
export default KeyControls;
