class Texture {
  constructor(url) {
    this.img = new Image();
    this.img.src = url;
  }
}
module.exports = Texture;
