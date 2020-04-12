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

  /**
   * Calculates in which tile a pixel is located.
   * @param pos The position of the pixel.
   */
  pixelToMapPos(pos: Coordinates): Coordinates

  /**
   * Calculates the pixel position of a tile in a map.
   * @param pos The position of the tile in the map.
   */
  mapToPixelPos(pos: Coordinates): Coordinates

  /**
   * Returns the TileSprite at a given map position.
   * @param mapPos the tile of a given position.
   */
  tileAtMapPos(mapPos: Coordinates): TileSprite

  /**
   * Returns the TileSprite at a given pixel position.
   * @param pos The pixel position of the tile
   */
  tileAtPixelPos(pos: Coordinates): TileSprite

  /**
   * Changes the frame attribute of the TileSprite at the given mapPos.
   * @param mapPos the map position of the tile.
   * @param frame the new value for the frame attribute.
   */
  setFrameAtMapPos(mapPos: Coordinates, frame: Coordinates): TileSprite

  /**
   * Changes the frame attribute of the TileSprite at the given pixel position.
   * @param mapPos the pixel position of the tile.
   * @param frame the new value for the frame attribute.
   */
  setFrameAtPixelPos(pos: Coordinates, frame: Coordinates): TileSprite

  /**
   * Returns the tiles at the corner of the bounds.
   * @param bounds a rectangle which defines what the corner are.
   * @param xo offset to the x values.
   * @param yo offset to the y values.
   */
  tilesAtCorners(bounds: {x: number, y: number, w: number, h: number}, xo?: number, yo?: number): TileSprite[]
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
   * @returns Returns anything
   */
  update(dt: number, t: number): any;
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
   * Returns value of ctrl key.
   * @returns Key value
   */
  get ctrl(): boolean;

  /**
   * Returns value of shift key.
   * @returns Key value
   */
  get shift(): boolean;

  /**
   * Returns value of escape key.
   * @returns Key value
   */
  get escape(): boolean;

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
   * Resets default value (false) to all keys
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

/**
 * Anim represents a single animation.
 */
declare class Anim {

  curTime: number;
  frames: Coordinates[];
  rate: number;
  curFrame: number;
  frame: Coordinates;

  /**
   * Constructor for an animation.
   * @param frames A collection of coordinates for each frame in the texture file.
   * @param rate The rate at which the animation plays.
   */
  constructor(frames: Coordinates[], rate: number);

  /**
   * Resets the animation to the first frame.
   */
  reset(): void;

  /**
   * Causes the animation to update based on dt.
   * @param dt Delta time
   */
  update(dt: number): void;
}

/**
 * The AnimManager class
 */
export class AnimManager {

  anims: {
    [name: string]: Anim
  }
  running: boolean;
  frameSource: Coordinates;
  current: string | null;

  constructor(e: Coordinates);

  /**
   * Adds an animation to the AnimManager
   * @param name The name for the animation
   * @param frames Where each frame is located in the texture
   * @param speed The speed at which the animation plays.
   */
  add(name: string, frames: Coordinates[], speed: number): Anim;

  /**
   * Updates the current animation.
   * @param dt delta time
   */
  update(dt: number): void;

  /**
   * Starts playing an animation.
   * @param anim The name of the animation
   */
  play(anim: string): void;

  /**
   * Stops playing any animation
   */
  stop(): void;
}

/**
 * The Rect class
 */
export class Rect {

  pos: Coordinates
  w: number;
  h: number;
  style: {
    fill: string
  }

  /**
   * Constructs a rectangle.
   * @param w The width of the rectangle
   * @param h The height of the rectangle
   * @param style The styles of the rectangle
   */
  constructor(w: number, h: number, style: { fill: string })
}

export class Camera extends Container<unknown> {

  w: number;
  h: number;
  worldSize: {w: number, h: number};
  offset: Coordinates;
  subject: Coordinates;

  /**
   * Constructs a camera object. This can be fed into the main scene: `scene.add(camera);`
   * @param subject The entity on which should be focused
   * @param viewport the size of the viewport - how much should be visible.
   * @param worldSize the size of the whole map.
   */
  constructor(subject: NumericalEntity | Coordinates, viewport: {w: number, h: number}, worldSize: {w: number, h: number})

  /**
   * Sets the subject of the camera.
   * @param e The entity that needs to be set as subject.
   */
  setSubject(e: NumericalEntity | Coordinates): void;

  /**
   * Moves the camera to the subject
   */
  focus(): void;

  /**
   * update function for the container.
   * @param t the elapsed time
   * @param dt delta time
   */
  update(t: number, dt: number): void;
}

interface SoundOptions {
  loop: boolean,
  volume: number
}

export class Sound {

  src: string;
  options: SoundOptions;

  /**
   * Initiates HTML5 audio element for source audio file with control methods
   * @param src Source audio file
   * @param options Play settings
   */
  constructor(src: string, options?: SoundOptions);

  /**
   * Starts playing the audio file
   * @param overrides sets options for playing the sound using different setting as defined in `constructor()`
   */
  play(overrides?: SoundOptions): void;

  /**
   * Stops playing the audio file
   */
  stop(): void;
}

interface NumericalEntity {pos: Coordinates, w: number, h: number}

interface NumericalEntityWithHitbox extends NumericalEntity {hitBox: NumericalEntity}

export namespace deadInTracks {
  /**
   * This functions checks whether ent walks against a non-walkable object and whether it should move in the x and y position and how much.
   * The difference with wallslide is that deadInTracks stops the entity entirely when it touches a non-walkable surface.
   * wallslide will move the entity in x or y if possible.
   * @param ent The entity that is moving.
   * @param map The TileMap the entity moves on.
   * @param x The maximal movement on the x. default is 0
   * @param y The maximal movement on the y. default is 0
   * @returns Coordinates of how much the entity walks in x and y.
   */
  export function deadInTracks(ent: NumericalEntity | NumericalEntityWithHitbox, map: TileMap, x?: number, y?: number): Coordinates;
}

export namespace wallslide {
  /**
   * This functions checks whether ent walks against a non-walkable object and whether it should move in the x and y position and how much.
   * The difference with wallslide is that deadInTracks stops the entity entirely when it touches a non-walkable surface.
   * wallslide will move the entity in x or y if possible.
   * @param ent The entity that is moving.
   * @param map The TileMap the entity moves on.
   * @param x The maximal movement on the x. default is 0
   * @param y The maximal movement on the y. default is 0
   * @returns Coordinates of how much the entity walks in x and y.
   */
  export function wallslide(ent: NumericalEntity | NumericalEntityWithHitbox, map: TileMap, x?: number, y?: number): Coordinates;
}

export namespace entity {

  /**
   * addDebug adds a red border around the hitboxes of an entity.
   * @param e The entity.
   */
  export function addDebug<T extends Container<unknown> | NumericalEntityWithHitbox>(e: T): T;

  /**
   * This function checks if an entity hits anything in a container.
   * @param entity The entity.
   * @param container The container.
   * @param hitCallback The callback that is executed when an entity hits something in the container.
   */
  export function hits(entity: NumericalEntityWithHitbox | NumericalEntity, container: Container<NumericalEntityWithHitbox | NumericalEntity>, hitCallback: (e2: NumericalEntityWithHitbox | NumericalEntity) => any): void;

  /**
   * This functions calculates whether two entities hit each other.
   * @param e1 The first entity.
   * @param e2 The second entity.
   */
  export function hit(e1: NumericalEntityWithHitbox | NumericalEntity, e2: NumericalEntityWithHitbox | NumericalEntity): boolean;

  /**
   * This function calculates the angle relative to the x-axis between the centers of two entities.
   * @param a The first entity.
   * @param b The second entity.
   * @returns the angle in radians.
   */
  export function angle(a: NumericalEntity, b: NumericalEntity): number;

  /**
   * This function calculates the full hitbox of an entity.
   * @param entity The enitity
   */
  export function bounds(entity: NumericalEntityWithHitbox | NumericalEntity): {x: number, y: number, w: number, h: number};

  /**
   * This function calculates the distance between the centers of two entities.
   * @param a The first entity.
   * @param b The second entity.
   */
  export function distance(a: NumericalEntity, b: NumericalEntity): number;

  /**
   * This function calculates the center of an entity.
   * @param entity The entity to calculate the center of.
   */
  export function center(entity: NumericalEntity): number;

}

export namespace math {

  /**
   * This function calculates the angle relative from the x-axis between two points.
   * @param a The first point.
   * @param b The second point.
   * @returns The angle in radians.
   */
  export function angle(a: Coordinates, b: Coordinates): number;

  /**
   * This function calculates if x is between min and max.
   * @param x A numerical value
   * @param min A numerical value
   * @param max A numerical value
   * @returns x if x is between min and max.
   */
  export function clamp(x: number, min: number, max: number): number;

  /**
   * Calculates the distance between two points
   * @param a The first point.
   * @param b The second point.
   */
  export function distance(a: Coordinates, b: Coordinates): number;

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