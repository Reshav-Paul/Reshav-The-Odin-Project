let values = ['rock', 'paper', 'scissors'];
let currentRound = 1;
let playerScore = 0;
let computerScore = 0;

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function computerPlay() {
    return values[Math.floor(3 * Math.random())];
}
function decideWinner(computerSelection, playerSelection) {
    
    if (playerSelection === computerSelection) return -1;
    if (playerSelection === 'rock'){
        return computerSelection === 'scissors'? 1 : 0;
    }
    else if (playerSelection === 'paper'){
        return computerSelection === 'rock'? 1 : 0;
    }
    else if (playerSelection === 'scissors') {
        return computerSelection === "paper"? 1 : 0;
    }
}
function validatePlayerSelection(playerSelection){
    for(i = 0; i < values.length; i++)
        if(values[i] === playerSelection)
            return true;
    return false;
}
function playRound(playerSelection) {
    if(currentRound > 5) return;
    if(currentRound == 1) {
        playerChoiceTextElement.style['display'] = 'block';
        computerChoiceTextElement.style['display'] = 'block';
    }
    playerSelection = playerSelection.toLowerCase();
    if (!validatePlayerSelection(playerSelection)) {
        currentRound--;
        return;
    }
    
    playerChoiceTextElement.textContent = capitalize(playerSelection);
    computerSelection = computerPlay();
    winner = decideWinner(computerSelection, playerSelection);

    computerChoiceTextElement.textContent = capitalize(computerSelection);
    console.log(winner);

    if(winner === -1) {
    } else if (winner == 1) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (winner == 0) {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
    currentRound++;
    round.textContent = currentRound > 5? 'Game Complete' : 'Round ' + currentRound;
    if(currentRound > 5){
        const winnerTextElement = document.querySelector('#winner-text');
        let winnerName = 'This match ended in a Draw';
        if(playerScore > computerScore)
            winnerName = 'Congratulations Player! You Won.'
        else if(computerScore > playerScore)
            winnerName = 'Computer Won. Better luck next time';
        winnerTextElement.textContent = winnerName;
    }
}
function resetGame() {
    currentRound = 1;
    playerScore = 0;
    computerScore = 0;
    playerChoiceTextElement.style['display'] = 'none';
    computerChoiceTextElement.style['display'] = 'none';
    const winnerTextElement = document.querySelector('#winner-text');
    winnerTextElement.textContent = "Who will be the Winner?";
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    round.textContent = 'Round 1'
}

//implemeting UI changes
const computerChoiceTextElement = document.querySelector('#computer-choice');
const playerChoiceTextElement = document.querySelector('#player-choice');
const round = document.querySelector('#round');

const rockButton = document.querySelector('#rock-button');
const paperButton = document.querySelector('#paper-button');
const scissorsButton = document.querySelector('#scissors-button');
const resetButton = document.querySelector('#reset-button');

const playerScoreElement = document.querySelector('#player-score');
const computerScoreElement = document.querySelector('#computer-score');

rockButton.addEventListener('click', () => playRound('Rock'));
paperButton.addEventListener('click', () => playRound('Paper'));
scissorsButton.addEventListener('click', () => playRound('scissors'));
resetButton.addEventListener('click', resetGame);