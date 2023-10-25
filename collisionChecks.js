/**
 * @typedef _object
 * @property {number} x
 * @property {number} y
 * @property {number} height
 * @property {number} width
 */

/**
 * 
 * @param {_object} object1 
 * @param {_object} object2 
 * @returns {boolean}
 */
export function isColliding(object1, object2) {
  return (
    // object1 top is above object2 bottom
    object1.x > object2.x + object2.height

    // object1 bottom is lower than object2 top
    && object1.x + object1.height > object2.x

    // object1 left is lefter than object2 right
    && object1.y < object2.y + object2.width

    // object1 right righter than object2 left
    && object1.y + object1.width > object2.y
  )
}

/**
 * still need to refine this.
 * @param {_object} object1 
 * @param {_object} object2 
 * @returns {"top" | "bottom" | "left" | "right" | false}
 */
export function whichSide(object1, object2) {
  if (!isColliding(object1, object2)) return false
  
  // top
  if (object1.y + object1.height < object2.y + (object2.height / 2)) return "top"

  // bottom
  if (object1.y > object2.y + (object2.height / 2)) return "bottom"

  // left
  if (object1.x + object1.width < object2.x + (object2.width / 2)) return "left"

  // right
  if (object1.x > object2.x + (object2.width / 2)) return "right"
  
  console.log("or here?")
  return false
}