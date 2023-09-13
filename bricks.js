/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} canvasWidth 
 * @param {number} canvasHeight 
 * @param {number[][]} bArr 
 */
export function drawBricks(ctx, canvasWidth, canvasHeight, bArr) {
  const rowColors = ["blue", "white", "turquoise", "pink"];
  const gap = 2;
  const brickWidth = Math.floor(((canvasWidth - gap) - (bArr[0].length * gap)) / bArr[0].length);
  const brickHeight = Math.floor(canvasHeight * .05);
  let curX = gap;
  let curY = gap;

  for (let row = 0; row < bArr.length; row++) {
    for (let col = 0; col < bArr[row].length; col++) {
      if (bArr[row][col] === -1) { 
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = rowColors[bArr[row][col]];
      }
      
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
/**@typedef {import('./ball.js').Ball} _ball @typedef {_ball}*/
/**
 * 
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {_ball} ball
 * @param {number[][]} bArr
 */
export function brickCollision(canvasWidth, canvasHeight, ball, bArr) {
    const gap = 2;

    const brickWidth = Math.floor(((canvasWidth - gap) - (bArr[0].length * gap)) / bArr[0].length);
    const brickHeight = Math.floor(canvasHeight * .05);

    if ((bArr.length * (brickHeight + gap)) >= ball.y ) {
        // We are in brick territory

        // Get the row and column of the brick we are in
        const row = Math.floor(ball.y / (brickHeight + gap));
        const col = Math.floor(ball.x / (brickWidth + gap));
        // Does brick exist here?
        if (row >= 0 && col >= 0 && row <= bArr.length && col <= bArr[0].length ) {
          if (bArr[row][col] !== -1) {
            ball.velocity.y = -ball.velocity.y;
            ball.velocity.x = -ball.velocity.x;
          //   bArr[row][col]--; Progressive brick changes
            bArr[row][col] = -1;
            console.log("turn around")
          }
                    // check for second collision
          
          const col2 = Math.floor((ball.x + ball.width) / (brickWidth + gap));
          console.log("col: " + col); 
          console.log("col2: " + col2) 
          if (col2 !== col && col2 <= bArr[0].length && bArr[row][col2] !== -1) {
           // bArr[row][col2]--; Progressive bricks
           ball.velocity.y = -ball.velocity.y;
           ball.velocity.x = -ball.velocity.x;
           bArr[row][col2] = -1;
            console.log("turn around")
          }
        }
 


        
    }

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