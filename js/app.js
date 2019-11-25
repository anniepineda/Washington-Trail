'use strict';

var choicePanel = document.getElementById("panel");

function clickHandler(event) {
  // console.log('Clicked! ', event.target.id);
  switch (event.target.id) {
    case 'leftImg':
      console.log("you clicked on left");
      leftFunction();
      break;
    case 'centerImg':
      console.log("you clicked on center");
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

choicePanel.addEventListener('click', clickHandler);


// USERNAME
//
// function gets name from index.html text field for user name
function getName() {
  var userNameInputElement = document.getElementById("nameOfPlayer");
  var userName = userNameInputElement.value;
  var nameJSON = JSON.stringify(userName);
  localStorage.setItem("userName", nameJSON);
}
// Get user name from local storage and set player name
var localStorageUserName = localStorage.getItem("userName");

//var player = JSON.parse(localStorageUserName); COMMENTED OUT FOR TESTIJNG

// Starting player attributes should be determined by level, default levels set in player constructor function.
var startingMoney;
var startingTime;
var startingHealth;
var heading = document.getElementById("heading");
var leftImg = document.getElementById("leftImg");
var centerImg = document.getElementById("centerImg");
var rightImg = document.getElementById("rightImg");
var leftFunction;
var centerFunction;
var rightFunction;
var textBox = document.getElementById("textbox");
var mapImage = document.getElementById('mapImage');

/////// ARRAYS THAT HOLD THE LOCATION INFORMATION TO BE FED INTO LEVELCHANGE FUNCTION.///////
var home = [
  "Home",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "Start.png"
];
var tacoma = [
  "Tacoma",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "location1.png"
];
var federalWay = [
  "Federal Way",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "location2.png"
];
var seaTac = [
  "SeaTac",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "location3.png"
];
var seattle = [
  "Seattle",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "End.png"
];

/////// Player constructor function////////
function Player(
  playerName = "Player 1",
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
Player.prototype.changeMoney = function (delta) {
  this.money += delta;
};
Player.prototype.changeTime = function (delta) {
  this.time += delta;
};
Player.prototype.changeHealth = function (delta) {
  this.health += delta;
};
function rollD20() {
  var roll = Math.floor(Math.random() * 20 + 1);
  return roll;
}
//////// LIBRARY OF ACTIONS//////////
var snooze = function () {
  var roll = rollD20();
  if (roll >= 18) {
    player.changeHealth(30);
    player.changeTime(-15);
    displayText("You got an extra 15 minutes of sleep and feel amazing!");
  } else if (roll >= 2) {
    player.changeHealth(15);
    player.changeTime(-15);
    displayText("You got some extra sleep! Feeling good.");
  } else {
    player.health = 0;
    displayText(
      "While reaching for the alarm you slipped out of bed and broke your neck. Game over."
    );
    // endGame('lose');
  }
};
var talkToStranger = function () {
  var roll = rollD20();
  if (roll == 20) {
    var answer = prompt(
      "The stranger has offered you a ride. Do you accept? Yes/No"
    );
    strangeJourney(answer);
  } else if (roll >= 2) {
    displayText(
      "The stranger rambles on and on about UFOs until you slowly back away."
    );
    player.changeTime(-10);
    // removeAction();
  } else {
    displayText("The stranger stabs you.");
    player.changeHealth(-50);
    player.changeTime(-5);
    // removeAction();
  }
};
var strangeJourney = function (answer) {
  var roll = rollD20();
  if (answer.toUpperCase() === "YES") {
    if (roll == 20) {
      displayText("The stranger gives you a ride straight to work! You win!");
      // endGame('win');
    } else if (roll >= 10) {
      displayText("The stranger gives you a ride to BLANK.");
      player.changeTime(-5);
      // nextLevel();
    } else {
      displayText("You are never seen again");
      player.health = 0;
      // endGame('lose');
    }
  } else if (answer.toUpperCase() === "NO") {
    if (roll == 20) {
      displayText("The stranger gives you some money instead!");
      player.changeMoney(10);
      player.changeTime(-5);
      // removeAction();
    } else if (roll >= 2) {
      displayText("The stranger goes on his way.");
      player.changeTime(-5);
      // removeAction();
    } else {
      displayText("The stranger is offended and stabs you.");
      player.changeHealth(-50);
      player.changeTime(-5);
      // removeAction();
    }
  } else {
    displayText("Invalid answer");
    player.changeTime(-1);
    strangeJourney(prompt("Try again"));
  }
};
var searchSeatCustion = function () {
  var roll = rollD20();
  if (roll == 20) {
    var answer = prompt(
      "You have found a strange looking mushroom. Eat the mushroom? Yes/No"
    );
    if (answer.toUpperCase() === "YES") {
      eatMushroom();
    } else if (answer.toUpperCase() === "NO") {
      displayText("You are overcome with a desire to eat the mushroom.");
      eatMushroom();
    } else {
      displayText(
        "While you were failing to enter a valid input, you accidentally ate the mushroom."
      );
      eatMushroom();
    }
  } else if (roll >= 10) {
    displayText("You found a dollar!");
    player.changeMoney(1);
    // removeAction();
  } else if (roll >= 2) {
    displayText("You found 35 cents.");
    player.changeMoney(0.35);
    // removeAction();
  } else {
    displayText("You accidentally stab yourself on a used needle.");
    player.changeHealth(-25);
    // removeAction();
  }
};
// HELPER FUNCTION, DOESNT NEED TO BE LOADED TO LEVEL
function eatMushroom() {
  var roll = rollD20();
  displayText("Hmmm... This mushroom tastes kinda funny.");
  if (roll == 20) {
    displayText(
      "You have ascended to another realm of consciousness. Where were you going anyways? It doesn't matter."
    );
    // endGame('win');
  } else if (roll >= 10) {
    displayText("You feel refreshed");
    player.changeHealth(roll);
    // removeAction();
  } else if (roll >= 2) {
    displayText("Ughh... That mushroom made you feel sick.");
    player.changeHealth(roll * -1);
    // removeAction();
  } else {
    displayText("You have died.");
    player.health = 0;
    // endGame();
  }
}
var takeBus = function () {
  var roll = rollD20();
  if (roll >= 17) {
    displayText("You caught the earlier bus and managed to take a quick nap!");
    player.changeTime(-15);
    player.changeHealth(5);
    player.changeMoney(-1.5);
    changeLevel(tacoma)
  } else if (roll >= 5) {
    displayText("You ride the bus to BLANK.");
    player.changeTime(-30);
    player.changeMoney(-1.5);
    changeLevel(tacoma)
  } else {
    displayText("You missed the bus and had to wait for the next one.");
    player.changeTime(-45);
    player.changeMoney(-1.5);
    changeLevel(tacoma);
  }
};
var takeCar = function () {
  var roll = rollD20();
  if (roll >= 17) {
    displayText("You drive your car to BLANK and make great time!");
    player.changeTime(-10);
    // nextLevel();
  } else if (roll >= 7) {
    displayText("You ride your bus to BLANK, but there was some traffic.");
    player.changeTime(-20);
    // nextLevel();
  } else {
    displayText("Your car wouldn't start. You had to take the bus to BLANK.");
    player.changeTime(-45);
    player.changeMoney(-1.5);
  }
};


// ********************************** FederalWay Logic Start*****************************
//Bus Option
var takeBusFedWay = function () {
  var roll = rollD20();
  if (roll > 17) {
    displayText('Bus ran through some stoplights and you made it there quick!');
    player.changeTime(-10);
    player.changeMoney(-5);
  } else if (roll >= 7) {
    displayText('Bus driver is newer and goes slow figuring out his route');
    player.changeTime(-20);
    player.changeMoney(-5);
  } else {
    displayText('Bus tire is flat you had to wait for next one, big loss of time and frustraion');
    player.changeTime(-45);
    player.changeHealth(-10);
    player.changeMoney(-10);
  }
};

//Train Option
var takeTrainFedWay = function () {
  var roll = rollD20();
  if (roll > 15) {
    displayText('Train is running smoothly this morning, you practically flew to your next stop!');
    player.changeTime(-5);
    player.changeMoney(-15);
  } else if (roll >= 5) {
    displayText('The train is a little behind, but not much');
    player.changeTime(-10);
    player.changeMoney(-15);
  } else {
    displayText('The train breaks down, you have to wait for another one to arrive. You also get charged for two train tickets');
    player.changeTime(-45);
    player.changeHealth(-10);
    player.changeMoney(-30);
  }
};

//Moped with stranger option 
var rideMoped = function () {
  var roll = rollD20();
  if (roll > 17) {
    displayText('The risk payed off the moped ended up weaving in and out of traffic to save you time, but they charged you 15$');
    player.changeTime(-5);
    player.changeMoney(-15);
  } else if (roll >= 5) {
    displayText('The moped ride was weird, but it made it in average time. The driver charged you 15$');
    player.changeTime(-10);
    player.changeMoney(-15);
  } else {
    displayText('The moped was a horrible idea, it almost immediately crashed into the stoplight. You still got charged 15$');
    player.changeTime(-45);
    player.changeHealth(-50);
    player.changeMoney(-15);
  }
};

// *************************************End of Federal Way Logic

//**************************************SeaTac (level03)

//Bus Option//
var takeBusSeaTac = function () {
  var roll = rollD20();
  if (roll > 18) {
    displayText('The bus is running behind and it skips 4 stops, getting you there sooner!');
    player.changeTime(-7);
    player.changeMoney(-5);
  } else if (roll >= 5) {
    displayText('Bus is delayed');
    player.changeTime(-10);
    player.changeMoney(-5);
  } else {
    displayText('Bus stop is closed');
    player.changeTime(-25);
    player.changeHealth(-15);
    player.changeMoney(-0);
  }
};

//Train Option//
var takeTrainSeaTac = function () {
  var roll = rollD20();
  if (roll > 16) {
    displayText('Train is on time and you arrive on schedule');
    player.changeTime(-10);
    player.changeMoney(-15);
  } else if (roll >= 7) {
    displayText('You loose time looking for your ticket');
    player.changeTime(-13);
    player.changeMoney(-15);
  } else {
    displayText('Emergency on train, stalls departure')
    player.changeTime(-22);
    player.changeHealth(-15);
    player.changeMoney(-0);
  }
};

//Carpool
var CarpoolSeaTac = function () {
  var roll = rollD20();
  if (roll > 14) {
    displayText('Traffic is light and save some time');
    player.changeTime(-5);
    player.changeMoney(-20);
  } else if (roll >= 8) {
    displayText('Your ride is late');
    player.changeTime(-12);
    player.changeMoney(-20);
  } else {
    displayText('Accidents on the road, delay your arrival time')
    player.changeTime(-30);
    player.changeHealth(-9);
    player.changeMoney(-0);
  }
};

changeLevel(seattle,takeBusSeaTac,takeTrainSeaTac,CarpoolSeaTac);


////////////////--------------------------------------------------------
function changeLevel(city, funcOne, funcTwo, funcThree) {
  heading.textContent = city[0];
  leftImg.setAttribute("src", city[1]);
  centerImg.setAttribute("src", city[2]);
  rightImg.setAttribute("src", city[3]);
  mapImage.setAttribute("src", city[4]);
  leftFunction = funcOne;
  centerFunction = funcTwo;
  rightFunction = funcThree;
  console.log("level changed to " + city);
}

function displayText(text) {
  var alert = document.createElement("p");
  alert.textContent = text;
  textBox.appendChild(alert);
}
