let gameBoard = document.getElementById('game-board');
let gameCircle = [];
let emptyCircle;

let counter = 0;

let redWins;
let yellowWins;
let resetBtn;

let winningArray = [
    [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10],
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];

// 0 - 6 is TOP ROW / SIXTH FROM BOTTOM
// 7 - 14 is FIFTH FROM BOTTOM
// 14 - 20 is FOURTH FROM BOTTOM
// 21 - 27 is THIRD FROM BOTTOM
// 28 - 34 is SECOND FROM BOTTOM
// 35 - 41 is BOTTOM ROW

function initializeGame(){

    // Draws the circles to the pre-existing board
    // Also creates a bottom 'fake' row that we have
    // pre-filled, so that we can start filling the board
    // while appearing like it's empty.
    for (let i = 0; i < 49; i++) {

        emptyCircle = document.createElement('div');
        emptyCircle.setAttribute('data-num', i);
        emptyCircle.classList.add('e-circle');
        gameBoard.appendChild(emptyCircle);

        if(i >= 42){
            emptyCircle.classList.add('filled');
        }

        if(i >= 42){
            emptyCircle.style.visibility = 'hidden'
        }

        gameCircle = document.getElementsByClassName('e-circle');

    }

}

initializeGame();
getPlayerChoice();


//Callback that handles letting the player(s) place pieces onto the board
//If the piece below it isn't "filled" then the piece cannot be placed.

function getPlayerChoice(){
    [...gameCircle].forEach(circle => {

        circle.addEventListener('click', () => {

            let clickedCircle = parseInt(circle.dataset.num)

            if(gameCircle[clickedCircle+7].classList.contains('filled') && !gameCircle[clickedCircle].classList.contains('filled')){

                circle.style.backgroundColor = '#ff3d3d';
                circle.classList.add('disabled');
                circle.classList.add('filled');
                circle.classList.add('red');

                gameBoard.classList.remove('shake');
                getComputerChoice();
                counter++;
                checkWin();

            }else{

                gameBoard.classList.add('shake');

            }
        });
    });

}


    function getComputerChoice(){


        let random = Math.floor(Math.random() * 42);
        let clickedCircle = parseInt(gameCircle[random].dataset.num);

        if(gameCircle[clickedCircle+7].classList.contains('filled') && !gameCircle[clickedCircle].classList.contains('filled')){

            gameCircle[random].style.backgroundColor = '#ffd23d';
            gameCircle[random].classList.add('disabled');
            gameCircle[random].classList.add('filled');
            gameCircle[random].classList.add('yellow');


        }else{

            getComputerChoice();

        }

    }

    //function that checks the values in the winningArray list, and sees if either red or yellow is the class
    //returned it as true.
    function checkWin(){

        let emptyGamePieces = document.querySelectorAll('.e-circle');

        for (let i = 0; i < winningArray.length; i++) {

            let emptyGamePiece = winningArray[i];

            if(emptyGamePiece.every(circle => emptyGamePieces[circle].classList.contains('red'))){

                redWins = document.createElement('div');
                redWins.classList.add('redWins');
                redWins.innerHTML = 'Red Player Wins';
                gameBoard.appendChild(redWins);

                disableBoard();
                resetGame();

            }else if(emptyGamePiece.every(circle => emptyGamePieces[circle].classList.contains('yellow'))){

                yellowWins = document.createElement('div');
                yellowWins.classList.add('yellowWins');
                yellowWins.innerHTML = 'Yellow Player Wins';
                gameBoard.appendChild(yellowWins);

                disableBoard();
                resetGame();

            }

        }

    }

    function disableBoard(){

        [...gameCircle].forEach(circle => {

            circle.classList.add('disabled');

        });

    }

    function resetGame(){

        resetBtn = document.createElement('button');
        resetBtn.classList.add('reset-btn');
        resetBtn.innerHTML = 'Reset Game';
        gameBoard.appendChild(resetBtn);

        resetBtn.addEventListener('click', () => {

            [...gameCircle].forEach(circle => {
                circle.remove();
            });

            if(redWins !== undefined){

                redWins.remove();

            }else{

                yellowWins.remove();

            }

            initializeGame();
            getPlayerChoice();

            resetBtn.remove();

        });

    }


