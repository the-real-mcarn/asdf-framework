export as namespace asdf;

type Coordinates = {x: number, y: number};

/**
 * TileSpriteXML class
 */
export class TileSpriteXML extends Sprite {

  width: number;
  height: number;
  imgPos: Coordinates;

  /**
   * Creates sprite instance from XML indexed spritesheet
   * @param texture Instance of Texture with source image
   * @param xml Instance of SpriteSheetXML with xml index
   * @param index Index of XML element
   */
  constructor(texture: Texture, xml: SpriteSheetXML, index: number);
}

/**
 * TileMapXML class
 */
export class TileMapXML extends Container<TileSpriteXML> {

  mapW: number;
  mapH: number;
  tileW: number;
  tileH: number;
  w: number;
  h: number;

  children: TileSpriteXML[];

  /**
   * Draws array of tiles from XML indexed spritesheet
   * @param tiles Array of XML indexes
   * @param mapW Amount of tiles over the width of the map
   * @param mapH Amount of tiles over the height of the map
   * @param texture Texture instance of source image file
   * @param xml SpriteSheetXML instance of source xml file
   */
  constructor(tiles: number[], mapW: number, mapH: number, texture: Texture, xml: SpriteSheetXML)
}

/**
 * TileSprite class
 */
export class TileSprite extends Sprite {

  tileW: number;
  tileH: number;
  frame: Coordinates;

  /**
   * Creates sprite instance from unindexed spritesheet
   * @param texture Instance of Texture with source image
   * @param w Width of sprite on source image
   * @param h Height of spirte on source image
   */
  constructor(texture: Texture, w: number, h: number);
}

/**
 * Tilemap class
 */
export class TileMap extends Container<TileSprite> {

  mapW: number;
  mapH: number;
  tileW: number;
  tileH: number;
  w: number;
  h: number;

  children: TileSprite[];

  /**
   * Draws array of tiles from unindexed spritesheet
   * @param tiles Array of x and y values of the source tile on an unindexed Spritesheet
   * @param mapW Amount of tiles over the width of the map
   * @param mapH Amount of tiles over the height of the map
   * @param tileW Width of source tile(s) in pixels
   * @param tileH Height of source tile(s) in pixels
   * @param texture Texture instance of source image file
   */
  constructor(tiles: Coordinates[], mapW: number, mapH: number, tileW: number, tileH: number, texture: Texture);
}

/**
 * Texture class
 */
export class Texture {

  img: HTMLImageElement;

  /**
   * Sets url of source image and creates an instance of Image()
   * @param url 
   */
  constructor(url: string);
}

/**
 * Text class
 */
export class Text {

  pos: Coordinates;
  text: string;
  visible: boolean;
  update?: (dt?: number, t?: number) => void;
  style: {
    font?: string,
    fill?: string | CanvasGradient | CanvasPattern,
    align?: CanvasTextAlign
  };

    /**
   * Prints styled text on canvas 
   * @param text Text to print
   * @param style Styles to apply to text
   */
  constructor(text: string, style: {});
}

/**
 * SpriteSheetXML - Reads XML files to get texture data
 * 
 * **XML format must be:**
 * 
 *   <TextureAlias imagePath="">
 * 
 *       <SubTexture x="" y="" width="" height=""></SubTexture>
 *       ...
 *   </TextureAlias>
 */
export class SpriteSheetXML {

  array: {
    name: string,
    x: number,
    y: number,
    width: number,
    height: number
  }[];

  /**
   * Set url of XML file
   * @param url Url to XML file
   */
  constructor(url: string);

  /**
   * Fetch XML file and put contents in a JS array
   * @param url Url to XML file
   */
  fetchXMLtoArray(url: string): void;

  /**
   * Find index of XML element with attribute == value
   * @param attribute XML element attribute
   * @param value Value of XML element attribute
   * @returns Index of XML element
   */
  findIndex(attribute: string, value: string): number;
}

/**
 * Sprite class
 */
export class Sprite {
  texture: Texture;
  pos: Coordinates;
  anchor: Coordinates;
  scale: Coordinates;
  pivot: Coordinates;
  visible: boolean;
  rotation: number;
  dead: boolean;

  update?: (dt?: number, t?: number) => void;

  /**
   * Draw sprite on canvas
   * @param texture Sprite image
   */
  constructor(texture: Texture);
}

/**
 * Game class
 */
export class Game {
  w: number;
  h: number;
  renderer: CanvasRenderer;
  scene: Container<unknown>;

  /**
   * Set the games parameters
   * @param w Width of canvas
   * @param h Height of canvas
   * @param pixelated Turns canvas smoothening on or off
   * @param parent HTML id of element to push the canvas element too. Default is set to "#board".
   */
  constructor(w: number, h: number, pixelated: boolean, parent?: string);

  /**
   * Start game loop
   * @param gameUpdate Function to run next to scene updates such as debug logging, etc.
   */
  run(gameUpdate: (dt?: number, t?: number) => void): void;
}

/**
 * Container class
 */
export class Container<T> {
  pos: {x: number, y: number};
  children: T[];

  constructor();

  /**
   * Adds child to container
   * @param child Child to add
   * @returns Added child
   */
  add(child: T): T;

  /**
   * Removes child from container
   * @param child Child to remove
   * @returns Removed child
   */
  remove(child: T): T;

  /**
   * Preforms a function on all children
   * @param f Function to preform on children
   * @returns Function altered array
   */
  map(f: (value: T, index: number, array: T[]) => any): any[];

  /**
   * Updates all children when called
   * @param dt Delta time 
   * @param t Total time
   * @returns Returns if the child is dead or not
   */
  update(dt: number, t: number): boolean;
}

/**
 * MouseControls class
 */
export class MouseControls {

  el: HTMLElement;
  pos: Coordinates;
  isDown: boolean;
  pressed: boolean;
  released: boolean;

  /**
   * Sets container element where handlers will listen
   * @param container Container element, defaults to document.body
   */
  constructor(container?: HTMLElement);

  /**
   * Recalculates mouse position based on the position of the container
   * @param ClientXandY Native mouse event x and y values
   */
  mousePosFromEvent({clientX, clientY}: {clientX: number, clientY: number}): void;

  /**
   * Calls mousePosFromEvent() on mouse move
   * @param e Event
   */
  move(e: MouseEvent): void;

  /**
   * Handles mouseDown event and calls mousePosFromEvent() to determine the exact pixel
   * @param e Event
   */
  down(e: MouseEvent): void;

  /**
   * Handles mouseUp event and calls mousePosFromEvent() to determine the exact pixel
   * @param e Event
   */
  up(e: MouseEvent): void;

  /**
   * Resets pressed and released values to make sure they are only true on a press or release
   */
  update(): void;
}

/**
 * KeyControls class
 */
export class KeyControls {

  keys: {
    [key: number]: boolean
  }

  /**
   * Listens for keypresses and prevents default actions
   */
  constructor();

  /**
   * Returns value of action key (spacebar)
   * @returns Key value
   */
  get action(): boolean;

  /**
   * Returns -1 on Arrow Left or A
   * 
   * Returns 1 on Arrow Right or D
   * @returns Key Value
   */
  get x(): -1 | 0 | 1

  /**
    * Returns -1 on Arrow Up or W
    * 
    * Returns 1 on Arrow Down or S
    * @returns Key value
    */
  get y(): -1 | 0 | 1

  /**
   * Read or write value of any key
   * @param key Keycode for targetted key
   * @param value Value to set to key
   * @return Value of key
   */
  key(key: number, value: boolean): boolean;

  /**
   * Resets default value to all keys
   */
  reset(): void;
}

/**
 * CanvasRenderer class
 */
export class CanvasRenderer {

  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D

  /**
   * Renderer for CanvasJS, defines width and height for the canvas element
   * @param w Width for canvas element
   * @param h Height for canvas element
   */
  constructor(w: number, h: number)

  /**
   * Turns off image smoothening on the canvas element
   */
  setPixelated(): void

  /**
   * Render all children on the canvas element
   * @param container Containing element of the canvas element 
   * @param clear Defines if the canvas element needs to be cleared for the next render. Default is set to true.
   */
  render(container: Container<unknown>, clear?: boolean): void
}

export namespace math {
  /**
 * Returns random integer between min and max
 * @param min Minimum value 
 * @param max Maximum value
 * @returns Random integer
 */
  export function rand(min: number, max: number): number;

  /**
   * Returns random float between min and max
   * @param min Minimum value 
   * @param max Maximum value
   * @returns Random value
   */
  export function randf(min: number, max: number): number;

  /**
   * Returns random item from items array
   * @param items Array of anything
   * @returns Item from items array
   */
  export function randOneFrom<T>(items: T[]): T;

  /**
   * Returns true one out of max times
   * @param max Maximum value. Default is set to 2
   * @returns Outcome
   */
  export function randOneIn(max?: number): boolean;
}