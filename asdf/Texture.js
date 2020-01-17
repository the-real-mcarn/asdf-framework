/**
 * Texture class
 */
class Texture {
  /**
   * Sets url of source image and creates an instance of Image()
   * @param {*} url 
   */
  constructor(url) {
    this.img = new Image();
    this.img.src = url;
  }
}
export default Texture;
