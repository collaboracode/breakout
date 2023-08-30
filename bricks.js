/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} canvasWidth 
 * @param {number} canvasHeight 
 * @param {number[][]} bArr 
 */
export function drawBricks(ctx, canvasWidth, canvasHeight, bArr) {
  const rowColors = ["blue", "white", "orange", "pink"];
  const gap = 2;
  const brickWidth = Math.floor(((canvasWidth - gap) - (bArr[0].length * gap)) / bArr[0].length);
  const brickHeight = Math.floor(canvasHeight * .05);
  let curX = gap;
  let curY = gap;

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

/**
 * generate a brick array of variable width and height
 * @param {number} width
 * @param {number} height
 */
export function generateBricks(width, height) {
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

//* this one might be easier for different levels, if we want different patterns
/*let bricks = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
*/