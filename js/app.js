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