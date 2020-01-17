/**
 * Container class
 */
class Container {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }

  /**
   * Adds child to container
   * @param {*} child Child to add
   * @returns {any} Added child
   */
  add(child) {
    this.children.push(child);
    return child;
  }

  /**
   * Removes child from container
   * @param {*} child Child to remove
   * @returns {any} Removed child
   */
  remove(child) {
    this.children = this.children.filter(c => c !== child);
    return child;
  }

  /**
   * Preforms a function on all children
   * @param {function} f Function to preform on children
   * @returns {any} Function altered array
   */
  map(f) {
    return this.children.map(f);
  }

  /**
   * Updates all children when called
   * @param {number} dt Delta time 
   * @param {number} t Total time
   * @returns {boolean} Returns if the child is dead or not
   */
  update(dt, t) {
    this.children = this.children.filter(child => {
      if (child.update) {
        child.update(dt, t, this);
      }
      return child.dead ? false : true;
    });
  }
}
export default Container;
