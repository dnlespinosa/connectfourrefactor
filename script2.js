/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 

 // Makes a board that lives in the console. It starts with a for loop that takes the height/width of the board, and the empty board array above. For each index of HEIGHT, it will create a new empty array (nullArr). Then it will add the value "null" into that empty array equal to WIDTH.length. That nullArr array is then pushed into the board array. 
 function makeBoard(height, width) {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for (let y=0; y<height; y++){
     let nullArr = [];
     for (let x=0; x<width; x++){
       nullArr.push(null);
     }
     board.push(nullArr);
   }
   return board
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   // DOM selected #board and saved it to a variable
   const htmlBoard = document.getElementById('board');
   // TODO: Set a variable to create a table row, set an ID of that row to "column-top", add an event listener to that row
   //BUILDING THE TOP BAR
   // created a table row and saved it to a variable
   let top = document.createElement("tr");
   // gave the new tr an ID for easy selection later
   top.setAttribute("id", "column-top");
   // added an event listener to the tr. This is the playable row in the connect four board
   top.addEventListener("click", handleClick);
   // TODO: Create the playable columns in each tr. The number of columns will be determined by the width of the game board. Also sets an ID to the column# of the respective block
   // creates the amount of columns needed for the connect four board. It will iterate through each index value of WIDTH and create a playable column in the new tr
   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   //adds the new tr with the new id eventlistener and the playable columns to the top of the page
   htmlBoard.append(top);
 
   // TODO: Create a the rows and blocks for play. The number of playable rows is determined by the height of the game board. This will also create each individual block that the game pieces will be placed into. Also sets an ID to the 'row-column' of the respective block
   //CREATES THE REST OF THE BOARD
   // Two for loops. It will start by creating new trs. The number of trs will be equal to HEIGHT. Each time a new tr is created, another for loop to create the playable squares (data cells) for each row. The amount of these tds will be equal to the WIDTH. The tds will have an ID of 'y-x' which we will use later. The tds are then appended to the playable row. The row is then appended to the html board below the #column-top we set above
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   // we're trying to find the value of Y. We use a for loop to start at the TOP of the play board (not #column-top). We are starting at HEIGHT-1 to match the index of the last value. The loop will look at the board that exists in the console and iterates through each array in that array at index X. If the value of X in index Y is null, the loop will return the Y value. This will repeat until it has gone through every array, or a value exists where null should be. If no null value can be found, the loop will return null for y 
   for (let i=HEIGHT-1; i>=0; i--){
     if (board[i][x]===null){
       return i
     }
   }
  return null 
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   //creates a div and assigns it to a variable
   const gamePiece = document.createElement('div');
   // selects the td in the game board using the inputted values of y and x
   const playingSquare = document.getElementById(`${y}-${x}`);
   // Assigns a classList to the created div. That class will be determined by what play is active.
   gamePiece.classList.add('piece')
   if (currPlayer===1){
     gamePiece.classList.add('p1')
   } else if (currPlayer===2) {
     gamePiece.classList.add('p2')
   }
   //appends the created div with the new ID to the selected td
   playingSquare.append(gamePiece);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   //uses the findSpotForCol function created earlier to determine the Y value. If null is returned from the function, nothing will be returned
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   //Now that we have the y and x value, we will use the placeInTable function to create a div into array y index x with a classList to set the color of the game piece. 
   placeInTable(y, x);
   //This will check for which player is active. If player 1 is active, the board that exists in the console will change the value of null to 1 for array y index x. If player 1 is NOT active, the board that exists in the console will change the value of null to 2 for array y index x
   if (currPlayer === 1 ? board[y][x]=1 : board[y][x]=2);
 
   // check for win
   //if check for win returns true, an alert msg will be put up with the inputted message 
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   function checkForTie(){
     //iterates through the board that exists in the console. It will start by taking each array of the array, then another function will iterate through the values of THAT array. If all the values of thar array DO NOT equal null, it will return true. If all the arrays return true, the checkForTie function will return true   
     board.every((rowArr) => {
       rowArr.every((cells)=>{
         return cells != null;
       })
     })
   }
   if (checkForTie()){
       // if function returns true, endgame will alert a message with the inputted message 
     return endGame(`You tied! Shake hands`)
   }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   // after the click, if currPlayer is 1, the value will be changed to 2. After the click if currPlayer DOES NOT equal 1, the value will be changed to 1
   if(currPlayer === 1 ? currPlayer = 2 : currPlayer = 1);
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
   // On every click, the below function will iterate through the entire board. With each iteration, the function will create four values each with 4 arrays that represent four connecting pieces (horizontally, vertically, diagonally up or down). These values are then tested against the _win function to see if any of these values have currPlayer listed four times. If so, it will return true. 
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard(HEIGHT, WIDTH);
 makeHtmlBoard();