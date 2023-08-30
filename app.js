// globals
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
/**@type {number} */
let timestamp = Date.now();
/**@type {number} */
let deltaTime;
let velocity = 0;


const classicColors = ["red", "orange", "green", "yellow"];

const rowColors = ["blue", "white", "orange", "pink"];


function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks(bricks);
  deltaTime = Date.now();
  /**@type {number} the time that has passed between frames in milliseconds */
  const delta = timestamp - deltaTime;
  timestamp = deltaTime;

  // do something every frame
  paddlePos.x = paddlePos.x + velocity * delta;
  paddle(ctx, paddlePos, canvas.width, canvas.height);
  // next frame
  requestAnimationFrame(loop);
}

/**
 * generate a brick array of variable width and height
 * @param {number} width
 * @param {number} height
 * @param {string} brickColor
 * @returns {array[]} brickArray
 */
function generateBricks(width, height) {
  const brickArray = [];
  let brickColor = -1;
  for (let row = 0; row < height; row++) {
    const newRow = [];
    if (row % 2 == 0) brickColor++;
    for (let col = 0; col < width; col++) {
      //TODO: Add code function logic to get color index from rowColors
      newRow.push(brickColor);
    }

    brickArray.push(newRow);
  }

  return brickArray;
}

let bricks = generateBricks(14, 8);
console.table(bricks);
drawBricks(bricks);





// row %
/*let bricks = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
 */

function drawBricks(bArr) {
    const gap = 2; 
    let curX = gap;
    let curY = gap;

    
    const brickWidth = Math.floor(((canvas.width - gap) - (bArr[0].length * gap)) / bArr[0].length) ;
    const brickHeight = 6;


    for (let row = 0; row < bArr.length; row++) {
        for (let col = 0; col < bArr[row].length; col++) {
            ctx.fillStyle = rowColors[bArr[row][col]];
            ctx.fillRect(curX, curY, brickWidth, brickHeight);
            curX += brickWidth + gap;
           //console.log("X: " + curX + " Y: " + curY);
        }
        curX = gap;
        curY += brickHeight + gap;
    }
}



loop();

/*

addEventListener("keydown", function (e) {
    //   console.log(e.code);
    switch (e.code) {
      case "ArrowRight":
      case "KeyD":
        rotateCar(car, 5, delta)
        break;
      case "ArrowLeft":
      case "KeyA":
        rotateCar(car, -5, delta)
        break;



        addEventListener("keyup", function (e) {
  switch (e.code) {
    case "ArrowRight":
    case "KeyD":
      break;
    case "ArrowLeft":
    case "KeyA":
      break;
        
        
        
        
        */
