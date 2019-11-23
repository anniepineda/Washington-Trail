'use strict';

// USERNAME
//
// function gets name from index.html text field for user name
function getName() {
  var userNameInputElement = document.getElementById('nameOfPlayer');
  var userName = userNameInputElement.value;
  var nameJSON = JSON.stringify(userName);
  localStorage.setItem('userName', nameJSON);
}