 import { drawPaddle, paddleFactory, updatePaddle } from "./paddle.js";
import { drawBall, ballFactory, updateBall } from "./ball.js";
import { drawBricks, generateBricks } from './bricks.js'

//* Globals
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

/**@type {number} */
let lastTime = Date.now();

// /**@type {number} */
// let velocity = 0;

/**@typedef {import('./paddle.js').Paddle} _paddle @type {_paddle}*/
let paddle;
/**@typedef {import('./ball.js').Ball} _ball @type {_ball}*/
let ball;
/**@typedef {import('./collisionChecks.js')._object} _object*/


const bricks = generateBricks(14, 8);

function loop(timestamp) {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!paddle) paddle = paddleFactory(canvas.width, canvas.height)
    if (!ball) ball = ballFactory(canvas.width, canvas.height, paddle)
    /**@type {number} the time that has passed between frames in milliseconds */
    const delta = timestamp - lastTime;
    lastTime = timestamp
    // draw the bricks
    drawBricks(ctx, canvas.width, canvas.height, bricks);
    // do stuff with paddle object
    updatePaddle(canvas.width, canvas.height, paddle, delta)
    drawPaddle(ctx, paddle, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"
    ctx.fillText(`x: ${Intl.NumberFormat("en-us", {maximumSignificantDigits: 3}).format(ball.velocity.x)} y: ${Intl.NumberFormat("en-us", {maximumSignificantDigits: 3}).format(ball.velocity.y)}`, paddle.x + 15, paddle.y + 50)
    updateBall(ball, paddle, {x: canvas.width, y: canvas.height}, delta, bricks)
    drawBall(ctx, ball)
    
    // TODO: Check for Win condition (no bricks left)

    
  }
  // next frame
  requestAnimationFrame(loop);
}

//* Handlers
function handleKeyUp(e) {
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      if (paddle.velocity > 0) paddle.velocity = 0;
      break;
    case "ArrowLeft":
    case "KeyA":
      if (paddle.velocity < 0) paddle.velocity = 0;
      break;
    case "KeyS":
      if (ball.velocity.x != 0) ball.velocity.x = 0;
      if (ball.velocity.y != 0) ball.velocity.y = 0;
      break;

  }
}

function handleKeyDown(e) {
  const speed = canvas.width * .001;
  const ballSpeed = canvas.width * .0001;
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      paddle.velocity = speed;
      break;
    case "ArrowLeft":
    case "KeyA":
      paddle.velocity = -speed;
      break;
    case "Space":
      // Launch ball (if it is not moving)
        if (ball.velocity.x === 0 && ball.velocity.y  === 0) {
          ball.velocity.y = ballSpeed
          ball.velocity.x =  paddle.velocity / 2


          console.log('fire! - ' + ball.velocity.x + ' ' + ball.velocity.y)
        }
        break;
  }
}

function handleResize() {
  canvas.height = window.innerHeight - 50
  canvas.width = window.innerWidth - 50
}

//* all setup should be here
function init() {
  addEventListener("resize", handleResize)
  addEventListener("keyup", handleKeyUp);
  addEventListener("keydown", handleKeyDown);
  
  handleResize()

  ctx.font = "32px serif";

  loop(0);
}

//* start running script
init(0)