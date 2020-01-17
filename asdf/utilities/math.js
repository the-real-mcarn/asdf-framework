/**
 * Returns random integer between min and max
 * @param {number} min Minimum value 
 * @param {number} max Maximum value
 * @returns {number} Random integer
 */
function rand(min, max) {
  return Math.floor(randf(min, max));
}

/**
 * Returns random float between min and max
 * @param {number} min Minimum value 
 * @param {number} max Maximum value
 * @returns {number} Random value
 */
function randf(min, max) {
  if (max == null) {
    max = min || 1;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

/**
 * Returns random item from items array
 * @param {*[]} items Array of anything
 * @returns {any} Item from items array
 */
function randOneFrom(items) {
  return items[rand(items.length)];
}

/**
 * Returns true one out of max times
 * @param {number} [max=2] Maximum value
 * @returns {boolean} Outcome
 */
function randOneIn(max = 2) {
  return rand(0, max) === 0;
}

export default {
  rand,
  randf,
  randOneFrom,
  randOneIn
};