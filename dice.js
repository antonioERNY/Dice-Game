'use strict';
const mainNumb0Id = document.querySelector('#mainNumb0Id');
const mainNumb1Id = document.querySelector('#mainNumb1Id')
const diceDisplay = document.querySelector('.dice');
const rollDice = document.querySelector('.roll');
const newGame = document.querySelector('.new-game');
const hold = document.querySelector('.hold');
const currNumber0Id = document.querySelector('#currNumber0Id');
const currNumber1Id = document.querySelector('#currNumber1Id')
const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');
const results = document.querySelector('.results')
const rulesBtn = document.querySelector('.rules-btn');
const ruleSection = document.querySelector('.view-rules')
const cancelBtn = document.querySelector('.cancel-btn')

let mainScoreArr, curNumbCounter, activePlayer, playing;

function zeroScores(){
  // starting condition:
  mainScoreArr = [0,0]
  curNumbCounter = 0;
  activePlayer = 0;
  playing = true;

  currNumber0Id.innerHTML = 0;
  currNumber1Id.innerHTML = 0;
  mainNumb0Id.innerHTML = 0;
  mainNumb1Id.innerHTML = 0;

  diceDisplay.src = `img-${0}.png`;
  player0.classList.remove('winnerClass');
  player1.classList.remove('winnerClass');
  player0.classList.add('activePlayer');
  player1.classList.remove('activePlayer');
  
}
zeroScores();

function switchPlayer(){
  curNumbCounter = 0;
  document.querySelector(`#currNumber${activePlayer}Id`).innerHTML = curNumbCounter;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('activePlayer');
  player1.classList.toggle('activePlayer');
}
rollDice.addEventListener('click', function(){
  if(playing){
      // 1.generate a random number;
    const randomDice = Math.trunc(Math.random()*6)+1;
    console.log(randomDice)
    // 3.display the dice, according to randNumb;
    diceDisplay.src = `img-${randomDice}.png`;
    // condition, if not 1 we add to counter,display on active player
    if(randomDice !== 1){
      curNumbCounter += randomDice;
      document.querySelector(`#currNumber${activePlayer}Id`).innerHTML = curNumbCounter;
    }
    else{
      // change score to 0 b4 switch activePlayer
      switchPlayer()
      // if active player is 0 then we want to set the activePlayer var to be equal to 1, and if 1 then 0;
      // this makes one of these players to have or not have the activePlayer class from html, if one has then the other won't and vise versa 
  }
}
})
hold.addEventListener('click', function(){
  if(playing){
    mainScoreArr[activePlayer] += curNumbCounter;
    document.querySelector(`#mainNumb${activePlayer}Id`).innerHTML = mainScoreArr[activePlayer];
    curNumbCounter = 0;
    document.querySelector(`#currNumber${activePlayer}Id`).innerHTML = curNumbCounter;
    if(mainScoreArr[activePlayer] >= 50){
      playing = false;
      document.querySelector(`.player${activePlayer}`).classList.add('winnerClass');
      // we should remove the toggle activePlayer class, so that it don't toggle to one and other player cos we won;
      document.querySelector(`.player${activePlayer}`).classList.remove('activePlayer');
    }
    else{
      switchPlayer()
    }
  }
})
// when we make a function inside of the eventListener we dont need to call it, js will make the call
newGame.addEventListener('click', zeroScores)

rulesBtn.addEventListener('click', function(){
    ruleSection.classList.remove('hidden')
})
cancelBtn.addEventListener('click', function(){
  ruleSection.classList.add('hidden')
})