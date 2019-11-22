'use strict';

var choicePanel = document.getElementById('panel');

function clickHandler(event) {
  // console.log('Clicked! ', event.target.id);
  switch(event.target.id) {
    case 'leftImg':
      console.log('you clicked on left');
      break;
    case 'centerImg':
      console.log('you clicked on center');
      break;
    case 'rightImg':
      console.log('you clicked on right');
      break;
    default:
      console.log('blam', event.target.id);

  }
}

choicePanel.addEventListener('click', clickHandler);

// USERNAME
//
// function gets name from index.html text field for user name
function getName() {
    var userNameInputElement = document.getElementById('nameOfPlayer');
    var userName = userNameInputElement.value;
    var nameJSON = JSON.stringify(userName);
    localStorage.setItem('userName', nameJSON);
  }
// Get user name from local storage and set player name
var localStorageUserName = localStorage.getItem('userName');
var player = JSON.parse(localStorageUserName);

// Starting player attributes should be determined by level, default levels set in player constructor function.
var startingMoney;
var startingTime;
var startingHealth;
var heading = document.getElementById('city');
var leftImg = document.getElementById('leftImg');
var centerImg = document.getElementById('centerImg');
var rightImg = document.getElementById('rightImg');
var leftFunction;
var centerFunction;
var rightFunction;
// ARRAYS THAT HOLD THE LOCATION INFORMATION TO BE FED INTO LEVELCHANGE FUNCTION.
var home = ['Home', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', snooze, takeBus, takeCar];
var tacoma = ['Tacoma', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'];
var federalWay = ['Federal Way', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'];
var seaTac = ['SeaTac', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'];
var seattle = ['Seattle', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'];

// Player constructor function
function Player(
  playerName = 'Player 1',
  startingMoney = 5.0,
  startingTime = 180,
  startingHealth = 100
) {
  this.name = playerName;
  this.money = startingMoney;
  this.time = startingTime;
  this.health = startingHealth;
}
// Player methods
Player.prototype.changeMoney = function(delta) {
  this.money += delta;
};
Player.prototype.changeTime = function(delta) {
  this.time += delta;
};
Player.prototype.changeHealth = function(delta) {
  this.health += delta;
};
function rollD20() {
  var roll = Math.floor(Math.random() * 20 + 1);
  return roll;
}
// LIBRARY OF ACTIONS
var snooze = function() {
  var roll = rollD20();
  if (roll >= 18) {
    player.changeHealth(30);
    player.changeTime(-15);
    alert('You got an extra 15 minutes of sleep and feel amazing!');
  } else if (roll >= 2) {
    player.changeHealth(15);
    player.changeTime(-15);
    alert('You got some extra sleep! Feeling good.');
  } else {
    player.health = 0;
    alert(
      'While reaching for the alarm you slipped out of bed and broke your neck. Game over.'
    );
    // endGame('lose');
  }
}
var talkToStranger = function() {
  var roll = rollD20();
  if (roll == 20) {
    var answer = prompt(
      'The stranger has offered you a ride. Do you accept? Yes/No'
    );
    strangeJourney(answer);
  } else if (roll >= 2) {
    alert(
      'The stranger rambles on and on about UFOs until you slowly back away.'
    );
    player.changeTime(-10);
    // removeAction();
  } else {
    alert('The stranger stabs you.');
    player.changeHealth(-50);
    player.changeTime(-5);
    // removeAction();
  }
}
var strangeJourney = function(answer) {
  var roll = rollD20();
  if (answer.toUpperCase() === "YES") {
    if (roll == 20) {
      alert('The stranger gives you a ride straight to work! You win!');
      // endGame('win');
    } else if (roll >= 10) {
      alert('The stranger gives you a ride to BLANK.');
      player.changeTime(-5);
      // nextLevel();
    } else {
      alert("You are never seen again");
      player.health = 0;
      // endGame('lose');
    }
  } else if (answer.toUpperCase() === "NO") {
    if (roll == 20) {
      alert('The stranger gives you some money instead!');
      player.changeMoney(10);
      player.changeTime(-5);
      // removeAction();
    } else if (roll >= 2) {
      alert('The stranger goes on his way.');
      player.changeTime(-5);
      // removeAction();
    } else {
      alert('The stranger is offended and stabs you.');
      player.changeHealth(-50);
      player.changeTime(-5);
      // removeAction();
    }
  } else {
    alert('Invalid answer');
    player.changeTime(-1);
    strangeJourney(prompt('Try again'));
  }
}
var searchSeatCustion = function() {
  var roll = rollD20();
  if (roll == 20) {
    var answer = prompt(
      'You have found a strange looking mushroom. Eat the mushroom? Yes/No'
    );
    if (answer.toUpperCase() === "YES") {
      eatMushroom();
    } else if (answer.toUpperCase() === "NO") {
      alert('You are overcome with a desire to eat the mushroom.');
      eatMushroom();
    } else {
      alert(
        'While you were failing to enter a valid input, you accidentally ate the mushroom.'
      );
      eatMushroom();
    }
  } else if (roll >= 10) {
    alert('You found a dollar!');
    player.changeMoney(1);
    // removeAction();
  } else if (roll >= 2) {
    alert('You found 35 cents.');
    player.changeMoney(0.35);
    // removeAction();
  } else {
    alert('You accidentally stab yourself on a used needle.');
    player.changeHealth(-25);
    // removeAction();
  }
}
// HELPER FUNCTION, DOESNT NEED TO BE LOADED TO LEVEL
function eatMushroom() {
  var roll = rollD20();
  alert('Hmmm... This mushroom tastes kinda funny.');
  if (roll == 20) {
    alert(
      'You have ascended to another realm of consciousness. Where were you going anyways? It doesn\'t matter.'
    );
    // endGame('win');
  } else if (roll >= 10) {
		alert('You feel refreshed');
    player.changeHealth(roll);
    // removeAction();
  } else if (roll >= 2) {
    alert('Ughh... That mushroom made you feel sick.');
    player.changeHealth(roll * -1);
    // removeAction();
  } else {
    alert('You have died.');
    player.health = 0;
    // endGame();
  }
}
var takeBus = function() {
  var roll = rollD20();
  if(roll >= 17) {
	alert('You caught the earlier bus and managed to take a quick nap!');
	player.changeTime(-15);
  player.changeHealth(5);
  player.changeMoney(-1.5);
	// nextLevel();
  } else if(roll >= 5) {
    alert('You ride the bus to BLANK.');
    player.changeTime(-30);
    player.changeMoney(-1.5);
    // nextLevel();
  } else {
    alert('You missed the bus and had to wait for the next one.');
    player.changeTime(-45);
    player.changeMoney(-1.5);
  }
}
var takeCar = function() {
  var roll = rollD20();
  if(roll >= 17) {
	alert('You drive your car to BLANK and make great time!');
	player.changeTime(-10);
	// nextLevel();
  } else if(roll >= 7) {
    alert('You ride your bus to BLANK, but there was some traffic.');
    player.changeTime(-20);
    // nextLevel();
  } else {
    alert('Your car wouldn\'t start. You had to take the bus to BLANK.');
    player.changeTime(-45);
    player.changeMoney(-1.5);
  }
}
function changeLevel(city, leftImgSrc, centerImgSrc, rightImgSrc, funcOne, funcTwo, funcThree) {
  heading.textContent(city);
  leftImg.setAttribute('src', leftImgSrc);
  centerImg.setAttribute('src', centerImgSrc);
  rightImg.setAttribute('src', rightImgSrc);
  leftFunction = funcOne;
  centerFunction = funcTwo;
  rightFunction = funcThree;
  console.log('level changed to ' + city);
}
