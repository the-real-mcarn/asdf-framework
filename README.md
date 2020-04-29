![asdf-games](https://gitea.arnweb.nl/arne/asdf-games/raw/branch/master/res/asdf-logo.png "asdf-games logo")
# asdf-games

My attempt at making the framework featured in the book HTML5 Games: Novice to Ninja. 
[You can find the book here.](https://www.sitepoint.com/premium/books/html5-games-novice-to-ninja)

I turned the framework featured in the book into an npm package for use with browserify or Electron. 
If you are on Github or Gitea now, you can find the npm package [here](https://www.npmjs.com/package/asdf-games).

## Installation
To use asdf framework in your projects, you need to:
* Install npm on your device (if you don't have it already)
* Run ```npm install asdf-games```
* Use the snippet below to start off or check out one of the examples, keep in mind that the examples are not comepletely up to date. 
* Thanks to my friend [Job](https://jobbel.nl/), this project supports TypeScript typings. Make sure your editor supports them to make your life easier.


## Example usage
```javascript
// Require asdf
const asdf = require("asdf-games");

// Add whatever classes you need here
const [ Game, Sprite, Texture, KeyControls ] = asdf; 

// Game(width, height, disable pixel smoothening)
var game = new Game(720, 480, true);

// Any picture URL used in new Texture() must be relative to the location of the HTML file
const playerTexture = new Texture('player.png');

var player = new Sprite(texture);
player.pos = {
    x: (game.w / 2) - (player.w / 2),
    y: (game.h / 2) - (player.h / 2)
}

// Add your entities to the game's scene
game.scene.add(player);

game.run(() => {
    // Game loop
});

```



