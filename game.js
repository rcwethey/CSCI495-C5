var scores, roundScore, activePlayer, gamePlaying; //initialized the varibales

init(); //called the init function

var lastDice; //initialized the varaible 

//DOM  manipulation beigins
document.querySelector('.btn-roll').addEventListener('click', function() {  //if class btn-roll is clicked then perform function.
    if(gamePlaying) {
        //1. Random Number 
        var dice1 = Math.floor(Math.random() * 6) + 1; 
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.jpg';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.jpg';


        //3. update the roundScore but only if the rolled number was not a 1.
        if(dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to the global score 
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore = input;
        
        if(input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        //check if player won the game
        if(scores[activePlayer] >= winningScore)  {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }   
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    //toggle removes it if it has it, if it doesnt have it, then it adds it.
    document.querySelector('.player-0-panel').classList.toggle('active'); 
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.toggle('active'); 
    //document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores= [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



