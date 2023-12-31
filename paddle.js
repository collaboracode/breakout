
/**
 * @typedef {Object} Paddle
 * @prop {number} x
 * @prop {number} y
 * @prop {number} height
 * @prop {number} width
 * @prop {number} velocity x velocity
 */

/**
 * might need to add velocity input for controls
 * @param {CanvasRenderingContext2D} ctx
 * @param {Paddle} paddleData
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns {void}
 */
export function drawPaddle(ctx, paddleData, canvasWidth) {
  // keep paddle in bounds
  if (paddleData.x < 0) { paddleData.x = 0; }
  else if (paddleData.x + paddleData.width > canvasWidth) {
    paddleData.x = canvasWidth - paddleData.width;
  }
  // if (isNaN(paddleData.x)) { 
  //   paddleData.x = Math.floor((canvasWidth / 2) - (paddleData.width / 2));
  // }
  // console.log(paddleData)
  ctx.fillStyle = "red";
  ctx.fillRect(paddleData.x, paddleData.y, paddleData.width, paddleData.height);
}

/**
 * Mutates the paddleData
 * @param {number} canvasWidth 
 * @param {number} canvasHeight 
 * @param {Paddle} paddleData 
 * @param {number} delta
 * @returns {void} 
 */
export function updatePaddle(canvasWidth, canvasHeight, paddleData, delta) {
  paddleData.width = Math.floor(canvasWidth / 8);
  paddleData.height = Math.floor(paddleData.width / 3);
  //! this line here?!?! 
  // console.log("Velocity: " + paddleData.velocity);
  // console.log("Delta: " + delta);
  const maybeNum = paddleData.x + (paddleData.velocity * delta)
  paddleData.x = maybeNum !== NaN ? maybeNum : paddleData.x
  paddleData.y = Math.floor(canvasHeight - paddleData.height - 10);
}

/**
 * Creates a paddle object... probably not necessary, 
 * but this way we can make sure that the functions for it match the data being used
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns {Paddle}
 */
export function paddleFactory(canvasWidth, canvasHeight) {
  const width = Math.floor(canvasWidth / 8);
  const height = Math.floor(width / 3);
  console.log('paddleX: ',Math.floor((canvasWidth / 2) - (width / 2)))
  const paddle = {
    x: Math.floor((canvasWidth / 2) - (width / 2)),
    y: Math.floor(canvasHeight - height - 20),
    width: Math.floor(canvasWidth / 8),
    height: Math.floor(width / 3),
    velocity: 0
  }
  console.log(paddle)
  return paddle
}