/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, currentDice, priorDice, gameLength;



function init()
{
    var validationCheck = true;
    while (validationCheck)
    {
        var player1 = prompt("Player 1's name?");
        var player2 = prompt("Player 2's name?");
        gameLength = prompt("Score to win? (Type a number)");
        player1 == null || player2 == null || gameLength == null || isNaN(gameLength) ? alert("Input is invalid, try again!") : validationCheck = false;
    }
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    priorDice = 0;
    currentDice = 0;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    var items = document.getElementsByClassName('endgame');
    for (let i = 0; i < items.length; i++)
    {
        items[i].style.display = 'block';
    }
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;
    document.getElementById('limit').textContent = gameLength;
    document.getElementById('name-0').textContent = player1;
    document.getElementById('name-1').textContent = player2;
    document.querySelector('.player-0-panel').classList.add('active');
};

function nextTurn()
{
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
};

document.querySelector('.btn-new').onclick = init;

document.querySelector('.btn-roll').onclick = function()
{
    var diceDOM = document.querySelector('.dice');
    priorDice = currentDice;
    currentDice = Math.floor(Math.random()*6) +1;
    diceDOM.src = './images/dice-' + currentDice + '.png';
    diceDOM.style.display = 'block';
    if (currentDice > 1)
    {
        roundScore += currentDice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else
        nextTurn();
};

document.querySelector('.btn-hold').onclick = function()
{
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
    if (scores[activePlayer] >= gameLength)
    {
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        alert("Player " + (activePlayer +1) + " wins!");
        var items = document.getElementsByClassName('endgame');
        for (let i = 0; i < items.length; i++)
        {
            items[i].style.display = 'none';
        }
    }
    else
        nextTurn();
};

