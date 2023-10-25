import { brickCollision } from "./bricks.js";
/**
 * @typedef {Object} Ball
 * @prop {number} x
 * @prop {number} y
 * @prop {number} height
 * @prop {number} width
 * @prop {{x: number, y: number}} velocity
 * @prop {number} maxSpeed
 */


/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Ball} ball
 */
export function drawBall(ctx, ballData) {
  ctx.fillStyle = "white";
  ctx.fillRect(ballData.x, ballData.y, ballData.width, ballData.height);
}

/**@typedef {import('./paddle.js').Paddle} _paddle @typedef {_paddle}*/

/**
 * Creates a paddle object... probably not nessisary, 
 * but this way we can make sure that the functions for it match the data being used
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {_paddle} paddleData
 * @param {number} size
 * @returns {Ball}
 */
export function ballFactory(canvasWidth, canvasHeight, paddleData) {
  const size = paddleData.width / 16
  return {
    x: Math.floor((canvasWidth / 2) - (size / 2)),
    y: Math.floor(canvasHeight - size - paddleData.height - 20),
    width: size,
    height: size,
    velocity: { x: 0, y: 0 },
    launched: false,
    maxSpeed: 1
  }
}


/**
 * Mutates the paddleData
 * @param {Ball} ballData
 * @param {_paddle} paddleData 
 * @param {{x: number, y: number}} bounds
 * @param {number} delta
 * @param {brickArray} brickArray
 * @returns {void} 
 */
export function updateBall(ballData, paddleData, bounds, delta, brickArray) {

  if (ballData.velocity.x === 0 && ballData.velocity.y === 0) {
    ballData.x = paddleData.x + (paddleData.width / 2) - (ballData.width / 2)
    ballData.y = Math.floor(bounds.y - ballData.height - paddleData.height - 20)
  } else {
    ballData.y = ballData.y + (ballData.velocity.y * delta);
    ballData.x = ballData.x + (ballData.velocity.x * delta);
  }

  // left bound
  if (ballData.x < 0) {
    ballData.velocity.x = -ballData.velocity.x
    // ballData.x = 0; 
  }
  // right bound
  if (ballData.x + ballData.width > bounds.x) {
    ballData.velocity.x = -ballData.velocity.x
    ballData.x = bounds.x - ballData.width;
  }

  // top bound
  if (ballData.y < 0) {
    ballData.velocity.y = -ballData.velocity.y
  }

  // bottom bound
  if (ballData.y + ballData.height > bounds.y) {
    ballData.velocity.x = 0
    ballData.velocity.y = 0
    // fail condition
    // ballData.y = bounds.y - ballData.height;
  }

  var itr = 0;
  // check for paddle collision
  while (
    ballData.x + ballData.width > paddleData.x 
    && ballData.x  < paddleData.x + paddleData.width
    && ballData.y + ballData.height > paddleData.y 
    ) {
      if (itr == 0) ballData.velocity.y = -ballData.velocity.y
      const newXSpeed = ballData.velocity.x + paddleData.velocity
      if (newXSpeed > ballData.maxSpeed) {
        ballData.velocity.x = ballData.maxSpeed
      }
      else if (newXSpeed < -ballData.maxSpeed) {
        ballData.velocity.x = -ballData.maxSpeed
      }
      else {
        ballData.velocity.x = newXSpeed
      }

      // refresh ball position also
      ballData.y = ballData.y + (ballData.velocity.y * itr);
      ballData.x = ballData.x + (ballData.velocity.x * itr);
      itr++;

      if (itr > 1000) {
        break;
      }
    }

    brickCollision(bounds.x, bounds.y, ballData, brickArray)
}