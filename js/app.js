'use strict';
// PLACEHOLDER STARTING ATTRIBUTES - GLOBAL VARIABLES
var player = new Player(prompt('What is your name?'))
// Starting player attributes should be determined by level, default levels set in player constructor function.
var startingMoney;
var startingTime;
var startingHealth;

// Player constructor function
function Player(playerName='Player 1', startingMoney= 5.00, startingTime=180, startingHealth=100) {
    this.name = playerName;
    this.money = startingMoney;
    this.time = startingTime;
    this.health = startingHealth;
}
// Player methods
Player.prototype.changeMoney = function (delta) {
    this.money += delta;
}
Player.prototype.changeTime = function (delta) {
    this.time += delta;
}
Player.prototype.changeHealth = function (delta) {
    this.health += delta;
}
function rollD20() {
    var roll = Math.floor(Math.random() * (20) + 1);
    return roll;
}
// LIBRARY OF ACTIONS
function snooze() {
    var roll = rollD20();
    if(roll >= 18) {
        player.changeHealth(30);
        player.changeTime(-15);
        alert('You got an extra 15 minutes of sleep and feel amazing!');
    } else if(roll >= 2) {
        player.changeHealth(15);
        player.changeTime(-15);
        alert('You got some extra sleep! Feeling good.')
    } else {
        player.health = 0;
        alert('While reaching for the alarm you slipped out of bed and broke your neck. Game over.')
        // endGame('lose');
    }
}
function talkToStranger() {
    var roll = rollD20();
    if(roll == 20) {
        var answer = prompt('The stranger has offered you a ride. Do you accept? Yes/No');
       strangeJourney(answer);
    } else if(roll >= 2) {
        alert('The stranger rambles on and on about UFOs until you slowly back away.');
        player.changeTime(-10);
        // removeAction();
    } else {
        alert('The stranger stabs you.')
        player.changeHealth(-50);
        player.changeTime(-5);
        // removeAction();
    }
}
function strangeJourney(answer) {
    var roll = rollD20();
    if(answer.toUpperCase() === 'YES') {
        if(roll == 20) {
            alert('The stranger gives you a ride straight to work! You win!');
            // endGame('win');
        } else if(roll >= 10) {
            alert('The stranger gives you a ride to BLANK.');
            player.changeTime(-5);
            // nextLevel();
        } else {
            alert('You are never seen again');
            player.health = 0;
            // endGame('lose');
        }
    } else if(answer.toUpperCase() === 'NO') {
        if(roll == 20) {
            alert('The stranger gives you some money instead!');
            player.changeMoney(10);
            player.changeTime(-5);
            // removeAction();
        } else if(roll >= 2) {
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
function searchSeatCushion() {
    var roll = rollD20();
    if(roll == 20) {
        var answer = prompt('You have found a strange looking mushroom. Eat the mushroom? Yes/No');
        if(answer.toUpperCase() === 'YES') {
            eatMushroom();
        } else if(answer.toUpperCase()   === 'NO') {
            alert('You are overcome with a desire to eat the mushroom.');
            eatMushroom();
        } else {
            alert('While you were failing to enter a valid input, you accidentally ate the mushroom.');
            eatMushroom();
        }
    } else if(roll >= 10) {
        alert('You found a dollar!');
        player.changeMoney(1);
        // removeAction();
    } else if(roll >= 2) {
        alert('You found 35 cents.');
        player.changeMoney(.35);
        // removeAction();
    } else {
        alert('You accidentally stab yourself on a used needle.');
        player.changeHealth(-25);
        // removeAction();
    }
}
function eatMushroom() {
    var roll = rollD20();
    alert('Hmmm... This mushroom tastes kinda funny.');
    if(roll == 20) {
        alert('You have ascended to another realm of consciousness. Where were you going anyways? It doesn\'t matter.');
        // endGame('win');
    } else if(roll >= 10) {
        alert('You feel refreshed');
        player.changeHealth(roll);
        // removeAction();
    } else if(roll >= 2) {
        alert('Ughh... That mushroom made you feel sick.');
        player.changeHealth(roll * -1);
        // removeAction();
    } else {
        alert('You have died.');
        player.health = 0;
        // endGame();
    }
}