/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} canvasWidth 
 * @param {number} canvasHeight 
 * @param {number[][]} bArr 
 */

/**@typedef {import('./collisionChecks.js')._object} _object*/
import { whichSide, isColliding } from './collisionChecks.js'

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
 * @param {number} row 
 * @param {number} col
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number[][]} bArr
 * @returns {_object} 
 */
export function getBrick(row, col, canvasWidth, canvasHeight, bArr) {
  const gap = 2;
  
  const brickWidth = Math.floor(((canvasWidth - gap) - (bArr[0].length * gap)) / bArr[0].length);
  const brickHeight = Math.floor(canvasHeight * .05);

  return {
    x: (brickWidth + gap) * col, 
    y: (brickHeight + gap) * row, 
    width: brickWidth, 
    height: brickHeight
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
        let reflect = false; 
        let side = false;

        // TODO: Proper check for x collision also so we only reverse the correct velocities
        if (row >= 0 && col >= 0 && row <= bArr.length && col <= bArr[0].length ) {
          if (bArr[row][col] !== -1) {
           //   bArr[row][col]--; Progressive brick changes
             bArr[row][col] = -1;
             side = whichSide(ball, getBrick(row, col, canvasWidth, canvasHeight, bArr));
             
             reflect = true;
          }
          // check for second collision
          
          const col2 = Math.floor((ball.x + ball.width) / (brickWidth + gap));
          // console.log("col: " + col); 
          // console.log("col2: " + col2) 
          if (col2 !== col && col2 <= bArr[0].length && bArr[row][col2] !== -1) {
           // bArr[row][col2]--; Progressive bricks
            if (!side) 
            {
              side = whichSide(ball, getBrick(row, col, canvasWidth, canvasHeight, bArr));
            }
            bArr[row][col2] = -1;
            reflect = true;
          }

          if (reflect) {
            switch (side) {
              case "top":
                ball.velocity.y = ball.velocity.y * -1;
                break;
              case "bottom":
                ball.velocity.y = ball.velocity.y * -1;
                break;
              case "":

              case "left":
                ball.velocity.x = ball.velocity.x * -1;
                break;
              case "right":
                ball.velocity.x = ball.velocity.x * -1;
                break;
              case false:
                break;
            }

            // ball.velocity.y = ball.velocity.y * -1;
            // ball.velocity.x = ball.velocity.x * -1;
            console.log(side);
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