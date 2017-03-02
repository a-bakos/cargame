"use strict";

/**
 * The main vehicle object aka The Car
 */
var vehicle = {
  body:               document.querySelector(".vehicle"),

  plate:              document.querySelector(".plate-identifier"),
  defaultPlateData:   "AUM 560",
  defaultDriverName:  "Murphy",

  headLights:         document.querySelectorAll(".vehicle-headlights"),
  tailLights:         document.querySelectorAll(".vehicle-taillights"),

  lightsKey:          76, // keycode for turning the lights on
  headLightsOn:       "vehicle-headlights_on", // CSS class to toggle
  tailLightsOn:       "vehicle-taillights_on", // CSS class to toggle

  leftIndicators:     document.querySelectorAll(".front-indicator-left, .rear-indicator-left"),
  rightIndicators:    document.querySelectorAll(".front-indicator-right, .rear-indicator-right"),

  leftIndicatorsKey:  81,
  rightIndicatorsKey: 69,

  frontIndicatorsOn:  "front-indicators_on",
  rearIndicatorsOn:   "rear-indicators_on",

  moveLeftKey:        37,
  moveRightKey:       39,
  moveLeftMotion:     "move-left",  // CSS class to toggle
  moveRightMotion:    "move-right", // CSS class to toggle
};

/**
 * Vehicle lights controls
 * Function for toggling headlights and tail lights
 */
function toggleLights(lightsSelector, lightsClass, logLights) {
  if (event.keyCode == vehicle.lightsKey) {

    for (var i = 0; i < lightsSelector.length; i++) {

      if (lightsSelector[i].classList.contains(lightsClass)) {
        lightsSelector[i].classList.remove(lightsClass);
        console.log(logLights + "lights turned off.");
      }
      else {
        lightsSelector[i].classList.add(lightsClass);
        console.log(logLights + "lights turned on.");
      }

    }
  }
}

addEventListener("keydown", function(event) {
  toggleLights(vehicle.headLights, vehicle.headLightsOn, "Head");
  toggleLights(vehicle.tailLights, vehicle.tailLightsOn, "Tail ");
});

/**
 * Indicator lights controls
 */

addEventListener("keydown", function(event) {
  // Left side indicators:
  if (event.keyCode == vehicle.leftIndicatorsKey) {
    if (
      vehicle.leftIndicators[0].classList.contains(vehicle.frontIndicatorsOn) &&
      vehicle.leftIndicators[1].classList.contains(vehicle.rearIndicatorsOn))
    {
      vehicle.leftIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.leftIndicators[1].classList.remove(vehicle.rearIndicatorsOn);
      console.log("Left indicator lights off.");
    }
    else {
      // Turn off the indicators on the other side:
      vehicle.rightIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.rightIndicators[1].classList.remove(vehicle.rearIndicatorsOn);

      // Turn on the left side:
      vehicle.leftIndicators[0].classList.add(vehicle.frontIndicatorsOn);
      vehicle.leftIndicators[1].classList.add(vehicle.rearIndicatorsOn);
      console.log("Left indicator lights on.");
    }
  } // Left indicators

  // Right side indicators:
  if (event.keyCode == vehicle.rightIndicatorsKey) {
    if (
      vehicle.rightIndicators[0].classList.contains(vehicle.frontIndicatorsOn) &&
      vehicle.rightIndicators[1].classList.contains(vehicle.rearIndicatorsOn))
    {
      console.log("Right indicator lights off.");
      vehicle.rightIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.rightIndicators[1].classList.remove(vehicle.rearIndicatorsOn);
    }
    else {
      // Turn off the indicators on the other side:
      vehicle.leftIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.leftIndicators[1].classList.remove(vehicle.rearIndicatorsOn);

      // Turn on the right side:
      vehicle.rightIndicators[0].classList.add(vehicle.frontIndicatorsOn);
      vehicle.rightIndicators[1].classList.add(vehicle.rearIndicatorsOn);
      console.log("Right indicator lights on.");
    }
  } // Right indicators
});

/**
 * Move the vehicle left and right relative to roadtracks
 * Function for left and right movements
 */
function move(moveVehicle, direction, moveMotion) {
  if (event.keyCode == moveVehicle) {
    console.log("Move " + direction + ".");
    vehicle.body.className = "vehicle";
    vehicle.body.classList.toggle(moveMotion);
  }
}

addEventListener("keydown", function(event) {
  move(vehicle.moveLeftKey, "left", vehicle.moveLeftMotion);
  move(vehicle.moveRightKey, "right", vehicle.moveRightMotion);
});

/**
 * Optional sunroof -- checkbox
 */
var extraSunroof  = document.querySelector(".extra-sunroof"); // checkbox

// Create the sunroof
vehicle.sunroof = document.createElement("div");
vehicle.sunroof.classList.add("vehicle-sunroof");

extraSunroof.addEventListener("change", function() {
  if (extraSunroof.checked) {
    vehicle.body.appendChild(vehicle.sunroof);
    console.log("Extra sunroof.");
  }
  else {
    vehicle.body.removeChild(vehicle.sunroof);
    console.log("No sunroof.");
  }
});

/**
 * PLAYER'S NAME AND LICENSE PLATE THINGS
 */

// The whole input area, HTML section:
var inputArea = document.querySelector(".player-name-input-area");
// Input field:
var playerNameField = document.querySelector(".player-name");
var playerNameValue;
// The OK button:
var enterPlayerName = document.querySelector("#enter-player-name");
// Player details area
var playerDetails = document.querySelector(".player-name-display");
// Where the player name is displayed:
var thePlayerNameDisplay = document.querySelector(".the-player-name");
thePlayerNameDisplay.innerHTML = "Driver: " + vehicle.defaultDriverName;

/**
 * Display license plate values
 *
 * There are two values being used here. One is the actual content of the
 * .plate-identifier element. The other one is the value of its data-text
 * attribute. They have to be the same!
 *
 * Reason: data-text attribute is a CSS pseudo element used for creating
 * font shadow. If they are different, that means the text shadow doesn't
 * match the main text.
 */
function getPlateData() {
  var plateData;
  var mainData;

  plateData = vehicle.plate.getAttribute("data-text");
  mainData  = vehicle.plate.innerHTML;

  if (plateData == mainData) {
    console.log("Plate data: " + mainData);
  }
  else {
    console.log("Warning: data-text and the contents of plate-identifier are not the same!")
  }
}

/**
 * Function for checking the player's name and make corrections if needed.
 *
 * Rules:
 * - The player name's max length is 12 characters.
 * - It can contain letters and numbers
 * - Letters only from the English alphabet
 * - Can have lowercase and uppercase letters
 * - No special characters, no spaces
 * - If nothing given, fallback to default value
 */
function checkPlayerName() {
  var correctInput = /^[a-zA-Z0-9]{1,12}$/;

  playerNameValue = playerNameField.value;
  playerNameValue = playerNameValue.latinise(); // Remove accents

  if (playerNameValue.length < 1 || !playerNameValue.match(correctInput)) {

    // Instead of the temporary alert, a text node insertion would be a better
    // solution that tells the user what's wrong. Also appending additional
    // "error" CSS class to the input field.
    alert("Incorrect player name input. Please use only letters and numbers.");
    console.log("Incorrect player name input.");
    setDefaultPlateData();

    playerNameField.value = "";
    playerNameField.focus();
  }
  else {
    if (playerNameValue.match(correctInput)) {
      // Capitalize first letter
      playerNameValue = playerNameValue.charAt(0).toUpperCase() + playerNameValue.slice(1);

      thePlayerNameDisplay.innerHTML = playerNameValue;
      console.log("Correct player name input.");
      console.log("Driver: " + playerNameValue);

      // Update data:
      changePlateData();
      // If names are all correctly set, hide the input area:
      hideElement(inputArea);
      playerDetails.classList.remove("hide-element");
    }
  }
}

/**
 * Function for changing the license plate's data (both values).
 */
function changePlateData() {
    // Slice up the input, only the first 3 characters are needed on the plate,
    // then save them as uppercase characters
    playerNameValue = playerNameValue.slice(0,3);
    playerNameValue = playerNameValue.toUpperCase();

    // Append 3 random digits after it
    playerNameValue = playerNameValue + " " + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);

    // Apply the final plate data as new values
    vehicle.plate.setAttribute("data-text", playerNameValue);
    vehicle.plate.innerHTML = playerNameValue;

    // Make the input field and its button disabled to prevent changing their
    // value, aka the player's name and the plate can't be changed once set
    playerNameField = playerNameField.setAttribute("disabled", "");
    enterPlayerName = enterPlayerName.setAttribute("disabled", "");

    console.log("Plate data has changed");
  }

/**
 * Function for setting default plate data (both values).
 */
function setDefaultPlateData() {
  // If nothing is entered apply default plate data
  vehicle.plate.setAttribute("data-text", vehicle.defaultPlateData);
  vehicle.plate.innerHTML = vehicle.defaultPlateData;
  console.log("Default plate data used.");
}

// Hiding elements
function hideElement(elem) {
  elem.className = "hide-element";
}

// Listen to player's name changes
enterPlayerName.addEventListener("click", function(event) {
  checkPlayerName();
  getPlateData();
});

/**
 * Odometer
 */
var odometer = document.querySelector(".odometer");
var distance = 0;
var timeRunning = false;

function startTime() {
  if (timeRunning == false) {
    timeRunning = true;
    incrementTime();
  }
  else {
    timeRunning == false;
  }
}

function incrementTime() {
  if (timeRunning == true) {
    setTimeout(function() {
      distance++;
      var kms =  Math.floor(distance / 1000);
      var kilometers = Math.floor(distance / 10);
      var meters = distance % 10;
      
      if (kilometers < 10) {
        kilometers = "0" + kilometers;
      }
      
      odometer.innerHTML = kms + " " + kilometers + " " + meters;
      incrementTime();
    }, 750);
  }
}

addEventListener("load", function(event) {
  startTime();
});


console.log("Driver: " + vehicle.defaultDriverName);
getPlateData();