let pickedColor; // = randomColor();  //color to display RGB number
let colors = [];  //array to hold random colors
let difficult = true;

let squares = document.getElementsByClassName("square");
let colorDisplay = document.querySelector("h1 span"); //display picked color on heading
let h1 = document.querySelector("h1");
let reset = document.querySelector("#newColors"); //button
let modeButtons = document.querySelectorAll(".mode"); //easy/hard buttons


init();

function init() {

    //click listeners for squares
    for (i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", checkColor);
    };

    //click listeners for buttons
    reset.addEventListener("click", newGame);

    for (i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selectedButton");
            modeButtons[1].classList.remove("selectedButton");
            this.classList.add("selectedButton");
            if (this.textContent === "EASY") {
                difficult = false;
            }
            else {
                difficult = true;
            };
            newGame();
        });
    };

    newGame();
};

// ******** sets up game with colors  *******
function newGame() {

    let numberOfSquares;

    resultDisplay.textContent = "";
    pickedColor = randomColor();  //random color needed before generateRandomColors

    if (difficult === true) {
        //hard
        numberOfSquares = 6;
        colors = generateRandomColors(numberOfSquares);
    }
    else {
        //easy
        numberOfSquares = 3;
        colors = generateRandomColors(numberOfSquares);
    }

    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "steelblue";
    reset.textContent = "NEW COLORS";

    for (i = 0; i < numberOfSquares; i++) {
        //assign colors to squares
        squares[i].style.backgroundColor = colors[i];

        if (difficult === false) {
            //hide last 3 squares
            squares[i + 3].classList.add("hardOff");
        }
        else if (i > 2) {
            //make all 6 squares visible
            squares[i].classList.remove("hardOff");
        }
    };


};

//click action for squares, check if guess matches pickedColor
//if no match, change that square to same as body background
function checkColor() {

    let guessedColor = this.style.backgroundColor;
    let resultDisplay = document.getElementById("resultDisplay");

    if (guessedColor === pickedColor) {
        //correct
        resultDisplay.textContent = "Correct!";

        //change all boxes to match correct pickedColor color
        for (i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = pickedColor;
        };

        //change header background to match
        h1.style.backgroundColor = pickedColor;
        reset.textContent = "PLAY AGAIN?";
    }

    else {
        //wrong
        resultDisplay.textContent = "Try Again";
        this.style.backgroundColor = "#232323";
    };
};


function randomColor() {
    //returns a randomly generated rgb string
    let r = getRandomIntInclusive(0, 255);
    let g = getRandomIntInclusive(0, 255);
    let b = getRandomIntInclusive(0, 255);
    let str = "rgb(" + r + ", " + g + ", " + b + ")";

    return str;
};

//returns an array of 3 or 6 colors with the correct assigned to a box
function generateRandomColors(arrayLength) {
    //assigned picked color to a random box
    let pickedColorAssignment = getRandomIntInclusive(0, arrayLength - 1);
    let colorArray = [];

    for (i = 0; i < arrayLength; i++) {
        //assign colors to squares
        //skip over the box that holds the answer
        if (i !== pickedColorAssignment) {
            colorArray[i] = randomColor();
        }
        else {
            colorArray[i] = pickedColor;
        };
    };

    return colorArray;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    //The maximum is inclusive and the minimum is inclusive 
};