let scores, roundScore, activePlayer, gamePlaying, sequence, maxScore;

gameInit();

document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';

document.querySelector('.banner p').textContent = 'Start the game by rolling the dices. Max score set to: ' + maxScore;

function gameInit() {
    
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    sequence = [];
    maxScore = 100;

    if (document.querySelector('#max-score').value) {
        maxScore = document.querySelector('#max-score').value;
    } 

    document.querySelector('.banner p').textContent = 'Start the game by rolling the dices. Max score set to: ' + maxScore;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = "0";
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. display the result
        var dice1DOM = document.querySelector('.dice');
        dice1DOM.style.display = 'block';
        dice1DOM.src = `dice-${dice1}.png`
        var dice2DOM = document.querySelector('.dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = `dice-${dice2}.png`

        //3. update the round score IF the rolled number was NOT 1
        if (dice1 !== 1 && dice2 !== 1) {
            sequence.push(dice1);
            sequence.push(dice2);
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('.banner p').textContent = `Player ${activePlayer+1}'s playing! Good luck!`
            if (sequence.length >= 2 && (sequence[sequence.length-1])===6 && (sequence[sequence.length-2])===6){
                sequence = [];
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                document.querySelector('.banner p').textContent = `SORRY! Double SIXES! YOU LOOSE ALL YOUR POINTS! Changing players!`
                nextPlayer();
            }

        } else {
            document.querySelector('.banner p').textContent = `Ooops! Player ${activePlayer+1} has ONE! Changing players!`
            nextPlayer();
        }
    }


});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add Current score to the Global score
        scores[activePlayer] += roundScore;
        sequence = [];
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('.banner p').textContent = `Holding! Changing players!`
        //Check if the player won the game
        if (scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!"
            document.querySelector('.banner p').textContent = `Player ${activePlayer+1} has won the game! CONGRATULATIONS! Please, click on the NEW GAME button to start over!`
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', gameInit);