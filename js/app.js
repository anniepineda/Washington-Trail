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
        player.changeHealth(-100);
        alert('While reaching for the alarm you slipped out of bed and broke your neck. Game over.')
        // endgame();
    }
}