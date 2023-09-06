import { drawPaddle, paddleFactory, updataPaddle } from "./paddle.js";
import { drawBricks, generateBricks } from './bricks.js'

//* Globals
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

/**@type {number} */
let timestamp = Date.now();

/**@type {number} */
let deltaTime;

/**@type {number} */
let velocity = 0;

/**@typedef {import('./paddle.js').Paddle} _paddle @type {_paddle}*/
let paddle;

const bricks = generateBricks(14, 8);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  deltaTime = Date.now();
  /**@type {number} the time that has passed between frames in milliseconds */
  const delta = timestamp - deltaTime;
  timestamp = deltaTime;

  // draw the bricks
  drawBricks(ctx, canvas.width, canvas.height, bricks);

  // do stuff with paddle object
  updataPaddle(canvas.width, canvas.height, paddle, velocity, delta)
  drawPaddle(ctx, paddle, canvas.width, canvas.height);

  // next frame
  requestAnimationFrame(loop);
}

//* Handlers
function handleKeyUp(e) {
  // if (e.code !== && e.code !== )
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      if (velocity < 0) velocity = 0;
      break;
    case "ArrowLeft":
    case "KeyA":
      if (velocity > 0) velocity = 0;
      break;
  }
}

function handleKeyDown(e) {
  const speed = canvas.width * .001;
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      velocity = -speed;
      break;
    case "ArrowLeft":
    case "KeyA":
      velocity = speed;
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
  paddle = paddleFactory(canvas.width, canvas.height)
  
  loop();
}

//* start running script
init()