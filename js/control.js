
const playerOne = "X";
const playerTwo = "O";
const element = document.querySelectorAll(".element");
let turnCheck = true;

/* 
Combinações de vitória no jogo da velha.

Tic-tac-toe Winning Combinations.
 */
const COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/*
 Adiciona um evento de clique ao documento e, quando um elemento
 com a classe "element" é clicado, chama a função play com o id
 do elemento como argumento.

 Adds a click event to the document, and when an element
 with the class "element" is clicked, calls the play function with the id
 of the element as an argument.
 */

document.addEventListener("click", (event) => {
    if(event.target.matches(".element")){
        play(event.target.id);
    }    
});

/*
Executa a jogada de um jogador. (id) represesenta a casa do tabuleiro.

Execute a player's move. (id) represents the board square's.
*/
function play(id){
    
    const casas = document.getElementById(id);
    let turn = turnCheck ? playerOne : playerTwo; 
    casas.textContent = turn;
    casas.classList.add(turn);
    checkWinner(turn);
}

/*
Verifica se houve um vencedor. (turn) - O jogador que acabou de jogar ("X" ou "O").

Checks if there was a winner. (turn)  - The player who just played ("X" ou "O").
*/

 function checkWinner(turn){
     const winner = COMBINATIONS.some((comb) => {
        return comb.every((index) => {
            return element[index].classList.contains(turn);
        })
     });

     if (winner){
        endGame(turn);
     }else if(checkDraw()) {
        endGame();
     }else {
        turnCheck = !turnCheck;
    }
}

/*
Verifica se o jogo empatou.

Check  if there was a draw.
*/
function checkDraw(index){
    
    let x = 0;
    let o = 0;

    for (index in element){
        if(!isNaN(index)){
            if (element[index].classList.contains(playerOne)) {
                x++ ;
            }
            if (element[index].classList.contains(playerTwo)) {
                o++;
            }
        }
    }

    return x + o === 9 ? true : false;
}

/*
Finaliza o jogo. (winner) - O jogador vencedor, se houver.

Finish game. (winner) - The winning player, if any.
*/

function endGame(winner = null){

    const result = document.querySelector("#endGame");
    const text = document.querySelector("#result-text");

    result.style.display = "block";

    if(winner){
           text.innerHTML = `Player <span>${winner}</span> <br>win` ;
    }else {
     text.innerHTML = `Game <br> draw`;
    }
}

/*
Reinicia o jogo após clicar no botão "restart".

Restarts the game after clicking the restart button.
 */

function restartGame(){
    location.reload()
}