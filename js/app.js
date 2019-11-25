'use strict';

// Starting player attributes should be determined by level, default levels set in player constructor function.
var startingMoney;
var startingTime;
var startingHealth;
var leftFunction;
var centerFunction;
var rightFunction;
var won = 'You won!';
var lost = 'You lost!';
var heading = document.getElementById('heading');
var leftImg = document.getElementById('leftImg');
var centerImg = document.getElementById('centerImg');
var rightImg = document.getElementById('rightImg');
var textBox = document.getElementById('gameOutput');
var mapImage = document.getElementById('mapImage');
var choicePanel = document.getElementById('panel');
var gameOverMsg = document.getElementById('no-display-1');
var gameOverResult = document.getElementById('no-display-2');
choicePanel.addEventListener('click', clickHandler);
// ARRAYS THAT HOLD THE LOCATION INFORMATION TO BE FED INTO LEVELCHANGE FUNCTION.
var home = [
  'Home',

  'assets/Level Images/Bus.jpg',
  'assets/Level Images/Car.jpg',
  'assets/Level Images/Snooze.jpeg',
  'assets/Maps/Start.png'
];
var tacoma = [
  'Tacoma',
  'assets/Level Images/Bus.jpg',
  'assets/Level Images/Train.jpg',
  'assets/Level Images/Stranger.jpg',
  'assets/Maps/location1.png'
];
var federalWay = [
  'Federal Way',
  'assets/Level Images/Moped.jpg',
  'assets/Level Images/Bus.jpg',
  'assets/Level Images/Train.jpg',
  'assets/Maps/location2.png'
];

var seaTac = [
  'SeaTac',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'assets/Maps/location3.png'
];
var seattle = [
  'Seattle',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'assets/Maps/End.png'
];

// CLICK HANDLER
function clickHandler(event) {
  // console.log('Clicked! ', event.target.id);
  switch (event.target.id) {
    case 'leftImg':
      console.log('you clicked on left');
      leftFunction();
      break;
    case 'centerImg':
      console.log('you clicked on center');
      centerFunction();
      break;
    case 'rightImg':
      console.log('you clicked on right');
      rightFunction();
      break;
    default:
      console.log('blam', event.target.id);
  }
}


// USERNAME LOGIC
// function gets name from index.html text field for user name
function getName() {
  var userNameInputElement = document.getElementById('nameOfPlayer');
  var userName = userNameInputElement.value;
  var nameJSON = JSON.stringify(userName);
  localStorage.setItem('userName', nameJSON);
}
// Get user name from local storage and set player name
var localStorageUserName = localStorage.getItem('userName');

var player = new Player(JSON.parse(localStorageUserName));


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
// function to roll 20 sided dice
function rollD20() {
  var roll = Math.floor(Math.random() * 20 + 1);
  return roll;
}
// LIBRARY OF ACTIONS


// *******************************Home functions for intial level START ***************************
var snooze = function() {
  var roll = rollD20();
  if (roll >= 18) {
    player.changeHealth(30);
    player.changeTime(-15);
    displayText('You got an extra 15 minutes of sleep and feel amazing! Pick again.');
  } else if (roll >= 2) {
    player.changeHealth(15);
    player.changeTime(-15);
    displayText('You got some extra sleep! Feeling good plus 15 health. Pick again!');
  } else {
    player.health = 0;
    displayText(
      'While reaching for the alarm you slipped out of bed and broke your neck. Game over.'
    );
    // endGame('lose');
  }
};
var takeBus = function() {
  var roll = rollD20();
  if (roll >= 17) {
    displayText('You caught the earlier bus and managed to take a quick nap! It took 15 minutes, you gained 5 health');
    player.changeTime(-15);
    player.changeHealth(5);
    player.changeMoney(-5);
    changeLevel(tacoma);
  } else if (roll >= 5) {
    displayText('You ride the bus to Tacoma. It takes 30 minutes and costs 5$');
    player.changeTime(-30);
    player.changeMoney(-5);
    changeLevel(tacoma);
  } else {
    displayText('You missed the bus and had to wait for the next one. It took 45 Minutes and cost 5$');
    player.changeTime(-45);
    player.changeMoney(-5);
    changeLevel(tacoma);
  }
 
  changeLevel(tacoma, takeBusTacoma,takeTrainTacoma, rideWithStranger);
};
var takeCar = function() {
  var roll = rollD20();
  if (roll >= 17) {
    displayText('You drive your car to Tacoma and make great time! It took onlly 10 minutes');
    player.changeTime(-10);
    
    // nextLevel();
    
  } else if (roll >= 7) {
    displayText('You ride your car to Tacoma, but there was some traffic. Minus 20 minutes');
    player.changeTime(-20);
    
    // nextLevel();
    changeLevel(tacoma, takeBusTacoma,takeTrainTacoma, rideWithStranger);
  } else {
    displayText('Your car wouldn\'t start. You had to take the bus to Tacoma. Minus 45 minutes and 5$');
    player.changeTime(-45);
    player.changeMoney(5);
  }
  changeLevel(tacoma, takeBusTacoma,takeTrainTacoma, rideWithStranger);
};
//*******************************Home functions for intial level END***********************






// ********************************** Tacoma Logic Start*****************************
//Bus Option
var takeBusTacoma = function() {
  var roll = rollD20();
  if (roll > 17) {
    displayText('Bus was running on all cylinders and arrived ahead of schedule in Federal Way. Minus 10 minutes, minus 5$');
    player.changeTime(-10);
    player.changeMoney(-5);
  } else if (roll >= 7) {
    displayText('Bus driver is newer and goes slow figuring out his route. Minus 20 minutes, minus 5$');
    player.changeTime(-20);
    player.changeMoney(-5);
  } else {
    displayText('Bus tire is flat you had to wait for next one, big loss of time and frustraion. Minus 45 minutes, minus 10 health, minus 10$');
    player.changeTime(-45);
    player.changeHealth(-10);
    player.changeMoney(-10);
 }
 changeLevel(federalWay,rideMoped, takeBusFedWay, takeTrainFedWay);
};

//Train Option
var takeTrainTacoma = function() {
 var roll = rollD20();
 if (roll > 15) {
   displayText('Train is ahead of schedule and you made it to Federal Way in record time. Minus 5 minutes, Minus 15$');
   player.changeTime(-5);
   player.changeMoney(-15);
 } else if (roll >= 5) {
   displayText('The train is very busy but makes decent time, minus 10 minutes, 15$');
   player.changeTime(-10);
   player.changeMoney(-15);
 } else {
   displayText('The train was on the wrong tracks you have to wait for it to switch. You also get over-charged for your ticket. -45 minutes, -10 health, -30$');
   player.changeTime(-45);
   player.changeHealth(-10);
   player.changeMoney(-30);
}
changeLevel(federalWay,rideMoped, takeBusFedWay, takeTrainFedWay);
};

//Moped with stranger option 
var rideWithStranger = function() {
 var roll = rollD20();
 if (roll > 17) {
   displayText('The stranger ended up actually being very reliable, you zoomed to Federal Way without issue, but they charged you 15$. -5 minutes');
   player.changeTime(-5);
   player.changeMoney(-15);
 } else if (roll >= 5) {
   displayText('The stranger was very odd, but you still made it there ontime. The driver charged you 15$. -10 Minutes');
   player.changeTime(-10);
   player.changeMoney(-15);
 } else {
   displayText('Big mistake.... Stranger got lost and took all morning to find Federal Way. You still got charged 15$. -45 minutes, -50 health');
   player.changeTime(-45);
   player.changeHealth(-50);
   player.changeMoney(-15);
}
changeLevel(federalWay,rideMoped, takeBusFedWay, takeTrainFedWay);
};

// *************************************End of Tacoma Logic



// ********************************** FederalWay Logic Start*****************************
//Bus Option
  var takeBusFedWay = function() {
     var roll = rollD20();
     if (roll > 17) {
       displayText('Bus ran through some stoplights and you made it there quick! -10 minutes, -5$');
       player.changeTime(-10);
       player.changeMoney(-5);
     } else if (roll >= 7) {
       displayText('Bus driver is newer and goes slow figuring out his route. -20 minutes, 5$');
       player.changeTime(-20);
       player.changeMoney(-5);
     } else {
       displayText('Bus tire is flat you had to wait for next one, big loss of time and frustraion. -45 minutes, -10 health, -10$');
       player.changeTime(-45);
       player.changeHealth(-10);
       player.changeMoney(-10);
    }
    changeLevel(seaTac,rideMoped, takeBusFedWay, takeTrainFedWay);
   };

   //Train Option
   var takeTrainFedWay = function() {
    var roll = rollD20();
    if (roll > 15) {
      displayText('Train is running smoothly this morning, you practically flew to your next stop! -5 minutes, -15$');
      player.changeTime(-5);
      player.changeMoney(-15);
    } else if (roll >= 5) {
      displayText('The train is a little behind, but not much.  -0 minutes, -15$');
      player.changeTime(-10);
      player.changeMoney(-15);
    } else {
      displayText('The train breaks down, you have to wait for another one to arrive. You also get charged for two train tickets.  -45 minutes, -30$, -10 health');
      player.changeTime(-45);
      player.changeHealth(-10);
      player.changeMoney(-30);
   }
   changeLevel(seaTac,rideMoped, takeBusFedWay, takeTrainFedWay);
  };

  //Moped with stranger option 
  var rideMoped = function() {
    var roll = rollD20();
    if (roll > 17) {
      displayText('The risk payed off the moped ended up weaving in and out of traffic to save you time, but they charged you 15$. -5 minutes');
      player.changeTime(-5);
      player.changeMoney(-15);
    } else if (roll >= 5) {
      displayText('The moped ride was weird, but it made it in average time. The driver charged you 15$. -10 mintues');
      player.changeTime(-10);
      player.changeMoney(-15);
    } else {
      displayText('The moped was a horrible idea, it almost immediately crashed into the stoplight. You still got charged 15$. -45 minutes, -50 health');
      player.changeTime(-45);
      player.changeHealth(-50);
      player.changeMoney(-15);
   }
   changeLevel(seaTac,rideMoped, takeBusFedWay, takeTrainFedWay);
  };

// *************************************End of Federal Way Logic




function changeLevel(city, funcOne, funcTwo, funcThree) {
  heading.textContent = city[0];
  leftImg.setAttribute('src', city[1]);
  centerImg.setAttribute('src', city[2]);
  rightImg.setAttribute('src', city[3]);
  mapImage.setAttribute('src', city[4]);
  leftFunction = funcOne;
  centerFunction = funcTwo;
  rightFunction = funcThree;
  console.log('level changed to ' + city);
}
// RENDERS TEXT TO TEXTBOX
function displayText(text) {
  var alert = document.createElement('p');
  alert.textContent = text;
  textBox.appendChild(alert);
}

// ENDS GAME AND DISPLAYS RESULT
function gameOver(outcome) {
  gameOverMsg.setAttribute('id','game-over');
  gameOverResult.setAttribute('id', 'outcome');
  gameOverResult.textContent = outcome;


}
// ACTION FUNCTION TEMPLATE
// var functionName = function() {
//   var roll = rollD20();
//   if (roll > number) {
//     displayText('INSERT TEXT HERE');
//     player.changeTime(amount);
//     player.changeHealth(amount);
//     player.changeMoney(amount);
//   } else if (roll >= number2) {
//     displayText('INSERT TEXT HERE');
//     player.changeTime(amount);
//     player.changeHealth(amount);
//     player.changeMoney(amount);
//   } else {
//     displayText('INSERT TEXT HERE');
//     player.changeTime(amount);
//     player.changeHealth(amount);
//     player.changeMoney(amount);
//   }
// };
var player = new Player('testPlayer');

changeLevel(home, takeBus, takeCar, snooze);
var playerInfo = document.createElement('span');
playerInfo.textContent = player.name;
document.getElementById('player-data').appendChild(playerInfo);
// Player healthbar
function drawHealthBar(canvas, x, y, width, height, health, max) {

  canvas.fillStyle = '#000000';
  canvas.fillRect(x,y,width,height);

  var colorNumber = Math.round((1-(health/max)) * 0xff) * 0x10000 + Math.round((health/max) * 0xff) * 0x100;
  var colorString = colorNumber.toString(16);
  if (colorNumber >= 0x100000) {
    canvas.fillStyle = '#' + colorString;
  } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
    canvas.fillStyle = '#0'+colorString;
  } else if (colorNumber << 0x10000) {
    canvas.fillStyle = '#00'+colorString;
  }
  canvas.fillRect(x+1,y+1,(health/max)*(width-2),height-2);
}
var healthBar = document.getElementById('healthbar').getContext('2d');
drawHealthBar(healthBar, 10, 10, 200, 30, player.health, 100);
changeLevel(home, takeBus, takeCar, snooze);

