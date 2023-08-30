const width = Math.floor(canvas.width / 8);
const height = Math.floor(width / 3);
const paddlePos = {
  x: Math.floor(canvas.width / 2 - width / 2),
  y: Math.floor(canvas.height - height - 5),
};
/**
 * might need to add velocity input for controls
 * @param {CanvasRenderingContext2D} ctx
 * @param {any} pos
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns {void}
 */
function paddle(ctx, pos, canvasWidth, canvasHeight) {
  const newLocal = Math.floor(canvasHeight - height);
  /**@type {{x: number, y: number}} */

  // keep paddle in bounds
  if (pos.x < 0) {pos.x = 0;} else if (pos.x + width > canvasWidth) {pos.x = canvasWidth - width;}

  ctx.fillStyle = "red";
  ctx.fillRect(pos.x, pos.y, width, height);
}

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
  console.log(e);
  const speed = 0.25;
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

addEventListener("keyup", handleKeyUp);
addEventListener("keydown", handleKeyDown);