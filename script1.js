// Access elements to track them for functions
let boxes = document.querySelectorAll(".box"); // list of boxes
let resetGameBtn = document.querySelector("#reset-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");

// track who's turn is (X or O)- Assume X starts First(playerx)
// playerX, playerO
let turnX = true; // if true, means print 'X' inside box , else 'O'

//use 2D array for:  8 winning pattens (3 row wise, 3 column wise and 2 digonally)
const winPatterns = [
  // we can also use Strings but this is better way
  // row wise
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // column wise
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal- wise
  [0, 4, 8],
  [2, 4, 6],
];




// if game draw
function gameDraw() {
  msg.innerHTML = "OOPS! Game Draw";  // new text added to html element fetched as 'msg' above
  // show msg ( i.e., remove 'hide' class, so that it's css display: none;  does not apply)
  msgContainer.classList.remove("hide"); // msgCOntainer kay classList mai se 'hide' class ko remove karo
};



// to show winner
function showWinner(winner) {
  // winner : passed in call below
  msg.innerHTML = `Congratulatios! Winner is ${winner}`; // make inner text of html element fetched as msg abpve
  // show msg ( i.e., remove 'hide' class, so that it's css does not apply)
  msgContainer.classList.remove("hide"); // msgCOntainer kay classList mai se 'hide' class ko remove karo
};


// when we get winner (dont't allow now to enter X or O anymore )
const disableBoxes = () => {  //Or:  function disableBoxes(){ ... }
  for (let box of boxes) {
    // boxes is list ehich is above fetched
    box.disabled = true;
  }
};

// helper -> function to check winner
function checkWinner() {
  for (let pattern of winPatterns) {
    // winPatterns: is array above
    // pattern : current winning pattern (array itslef) under consideration
    let pos1Val = boxes[pattern[0]].innerHTML; // pattern is array itself AND pattern[0] : gives element at index 0 in array pattern
    let pos2Val = boxes[pattern[1]].innerHTML; // AND: boxes: list of boxes AND pattern[i] return index AND boxes[pattern[i]] gives box at that index
    let pos3Val = boxes[pattern[2]].innerHTML; // innerHTML : returns X or O at that box
    // index 0,1,2 to current pattern array is checked for content (if same declare winner)

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      // box must not be empty to check winning condition
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // we got winner (dont't allow now to enter X or O anymore )
        disableBoxes(); // call
        // declare winner
        showWinner(pos1Val); // call
      }
    }
  }
}


//1st MAIN LOGIC 

// we need to do: on click to each button , print X or O
var count = 0; 
boxes.forEach((box) => {  // for checking whether game is draw or not (total cells = 9)
  // for particular Box where you click
  box.addEventListener("click", () => {
    if (turnX) {
      // in Js it is same as: if ( turnX == true)
      box.innerHTML = "X"; // print X on box
      // now give turn to O
      turnX = false;
      count = count + 1; // new box added
    } else {
      box.innerHTML = "O"; // print O
      // give turn to X
      turnX = true;
      count = count + 1; //new box added
    }
    // Once current box is filled with X or O , make it disable (not allow to override the same cell)
    box.disabled = true;
    
    // when we click , check immediately whether condition
    checkWinner(); // call to helper function above
    
    // When All boxes are filled AND no winner is seen
    if (count == 9) {
      gameDraw(); // call
    }
  });
  
});

// helper func  -> When new game is started OR reset game
function enableBoxes() {
  for (let box of boxes) {
    box.disabled = false;
    // And make remove X or O if there is
    box.innerHTML = "";
  }
}

// to reset Game/ Start New Game
function resetGame() {
  // when new game starts/reset game make:
  turnX = true; // as initially
  enableBoxes(); // all boxes - call to method
  msgContainer.classList.add("hide"); // add class 'hide' back to html element fetched as 'msgContainer' above
}

// Above function applied when reset game/ start new game
newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
