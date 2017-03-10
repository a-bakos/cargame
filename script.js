(function(){
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
  frontIndicatorsOn:  "front-indicators_on",  // CSS class to toggle
  rearIndicatorsOn:   "rear-indicators_on",   // CSS class to toggle

  moveLeftKey:        37,
  moveRightKey:       39,
  moveLeftMotion:     "move-left",  // CSS class to toggle
  moveRightMotion:    "move-right", // CSS class to toggle
};

/**
 * The duration the car needs to reach its static velocity.
 * Defined in milliseconds, and the same amount is used in the CSS animations.
 * Used for example to mimic loading up the dashboard clock & odometer.
 */
var startupTime = 750;

var timeRunning = false;
var time = 0;

// Hiding elements
function hideElement(elem) {
  elem.className = "hide-element";
}

/**
 * Status icon selectors
 */
//var statusIconLeftIndex   = document.querySelector(".icon-left-index");
var statusIconBattery     = document.querySelector(".icon-battery");
var statusIconLights      = document.querySelector(".icon-lights");
var statusIconEngine      = document.querySelector(".icon-engine");
var statusIconMessage     = document.querySelector(".icon-message");
//var statusIconDoors       = document.querySelector(".icon-doors");
//var statusIconRighttIndex = document.querySelector(".icon-right-index");

/**
 * Car energy
 *
 * energy starts from a given number and slowly decreases as time passes.
 * Also, the energy is (or will be) affected by other external factors,
 * that decrease the number as well such as switcing the lights on and off,
 * or using the indicators.
 */
var energyDisplay  = document.querySelector(".energy-state");
var energyState    = 100;

function carenergy() {
  if (timeRunning === true) {
    setTimeout(function() {
      // Automatically decrease the energy state:
      energyState = energyState - 0.015;
      energyState = parseFloat(energyState);

      if (energyState >= 10 && energyState < 100) {
        energyState = "0" + energyState;
      }
      else if (energyState < 10) {
        energyState = "00" + energyState;
      }

      if (energyState <= 1) {
        energyState = "xxx";
        timeRunning = false;
      }

      // Display the number, but only up to one decimal
      energyDisplay.innerHTML = energyState.slice(0,5);
      // Call the function again
      carenergy();
    }, startupTime);

    if (energyState <= 35) {
      statusIconEngine.src = "img/engine-on.png";
    }
    if (energyState <= 20) {
      statusIconEngine.src = "img/engine-error.png";
    }
  }
}

/**
 * Vehicle lights controls
 * Function for toggling headlights and tail lights
 */
var lightSwitchCounter = 0;

function toggleLights(event) {
  if (event.keyCode == vehicle.lightsKey) {

    // Increment light switch counter & decrement energy state:
    lightSwitchCounter++;
    energyState--;

    for (var i = 0; i < vehicle.headLights.length; i++) {
      if (vehicle.headLights[i].classList.contains(vehicle.headLightsOn)) {
        vehicle.headLights[i].classList.remove(vehicle.headLightsOn);
        statusIconLights.src = "img/light-off.png";
        console.log("Lights turned off.");
      }
      else {
        vehicle.headLights[i].classList.add(vehicle.headLightsOn);
        statusIconLights.src = "img/light-on.png";
        console.log("Lights turned on.");
      }
    }

    for (var i = 0; i < vehicle.tailLights.length; i++) {
      if (vehicle.tailLights[i].classList.contains(vehicle.tailLightsOn)) {
        vehicle.tailLights[i].classList.remove(vehicle.tailLightsOn);
      }
      else {
        vehicle.tailLights[i].classList.add(vehicle.tailLightsOn);
      }
    }
    batteryProblems();
  }
}

function batteryProblems() {
  if (lightSwitchCounter == 10) {
    energyState = energyState - 2;
    statusIconBattery.src = "img/battery-on.png";
    console.log("Battery problem! Lights switched on and off too many times.");
  }
  if (lightSwitchCounter == 20) {
    energyState = energyState - 5;
    console.log("Warning! Battery problem!");
    statusIconBattery.src = "img/battery-error.png";
  }
}

/**
 * Indicator lights controls
 */
var statusIconLeftIndex = document.querySelector(".icon-left-index")
var statusIconRightIndex = document.querySelector(".icon-right-index")

function indicatorLights(event) {
  if (event.keyCode == vehicle.leftIndicatorsKey) {
    energyState = energyState - 0.05;
    if (
      vehicle.leftIndicators[0].classList.contains(vehicle.frontIndicatorsOn) &&
      vehicle.leftIndicators[1].classList.contains(vehicle.rearIndicatorsOn))
    {
      vehicle.leftIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.leftIndicators[1].classList.remove(vehicle.rearIndicatorsOn);
      statusIconLeftIndex.src = "img/index-left-off.png";
      console.log("Left indicator lights off.");
    }
    else {
      // Turn off the indicators on the other side:
      vehicle.rightIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.rightIndicators[1].classList.remove(vehicle.rearIndicatorsOn);
      statusIconRightIndex.src = "img/index-right-off.png";

      // Turn on the left side:
      vehicle.leftIndicators[0].classList.add(vehicle.frontIndicatorsOn);
      vehicle.leftIndicators[1].classList.add(vehicle.rearIndicatorsOn);
      statusIconLeftIndex.src = "img/index-left-on.png";
      console.log("Left indicator lights on.");
    }
  } // Left indicators

  // Right side indicators:
  if (event.keyCode == vehicle.rightIndicatorsKey) {
    energyState = energyState - 0.05;
    if (
      vehicle.rightIndicators[0].classList.contains(vehicle.frontIndicatorsOn) &&
      vehicle.rightIndicators[1].classList.contains(vehicle.rearIndicatorsOn))
    {
      vehicle.rightIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.rightIndicators[1].classList.remove(vehicle.rearIndicatorsOn);
      statusIconRightIndex.src = "img/index-right-off.png";
      console.log("Right indicator lights off.");
    }
    else {
      // Turn off the indicators on the other side:
      vehicle.leftIndicators[0].classList.remove(vehicle.frontIndicatorsOn);
      vehicle.leftIndicators[1].classList.remove(vehicle.rearIndicatorsOn);
      statusIconLeftIndex.src = "img/index-left-off.png";

      // Turn on the right side:
      vehicle.rightIndicators[0].classList.add(vehicle.frontIndicatorsOn);
      vehicle.rightIndicators[1].classList.add(vehicle.rearIndicatorsOn);
      statusIconRightIndex.src = "img/index-right-on.png";
      console.log("Right indicator lights on.");
    }
  } // Right indicators
}

/**
 * Move the vehicle left and right relative to roadtracks
 * Function for left and right movements
 */
function moveLeft(event) {
  if (event.keyCode == 37) {
    energyState = energyState - 0.02;
    vehicle.body.className = "vehicle";
    vehicle.body.classList.toggle(vehicle.moveLeftMotion);
    console.log("Move left");
  }
}

function moveRight(event) {
  if (event.keyCode == 39) {
    energyState = energyState - 0.02;
    vehicle.body.className = "vehicle";
    vehicle.body.classList.toggle(vehicle.moveRightMotion);
    console.log("Move right");
  }
}

/**
 * Optional sunroof -- checkbox
 */
var extraSunroof = document.querySelector(".extra-sunroof"); // checkbox

// Create the sunroof
vehicle.sunroof = document.createElement("div");
vehicle.sunroof.classList.add("vehicle-sunroof");

function sunroof() {
  if (extraSunroof.checked) {
    vehicle.body.appendChild(vehicle.sunroof);
    console.log("Extra sunroof added.");
  }
  else {
    vehicle.body.removeChild(vehicle.sunroof);
    console.log("No sunroof.");
  }
}

/**
 * PLAYER'S NAME AND LICENSE PLATE THINGS
 */

// Boolean variable to save the state of the player name
var playerNameSet = false;

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
 * Rules for the player name:
 * - Max length is 12 characters
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

    // Delete the value inside and set focus on the field:
    playerNameField.value = vehicle.defaultDriverName;
    playerNameField.focus();
  }
  else {
    if (playerNameValue.match(correctInput)) {
      // Capitalize first letter
      playerNameValue = playerNameValue.charAt(0).toUpperCase() + playerNameValue.slice(1);

      thePlayerNameDisplay.innerHTML = playerNameValue;
      console.log("Correct player name entered.");
      console.log("Driver: " + playerNameValue);

      // If names are all correctly set, then update data, hide input area and
      // show the player details area
      changePlateData();

      // Decide whether to hide the main screen after receiving the corrert input
      // or to remove is completely from the DOM
      document.body.removeChild(inputArea);

      playerNameSet = true;

      startTime(); // Start the clock
      loadMainframe(); // Load the mainframe
    }
  }
}

/**
 * Wrapper function that calls the checkPlayerName() function after the enter
 * button is pressed on playerNameField. An event listener is listening to it,
 * so this way the user can assign the player name by clicking the button on the
 * screen, or by pressing the enter key.
 */
function checkPlayerNameEnter(event) {
  if (event.keyCode == 13) {
    checkPlayerName();
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

/**
 * DASHBOARD ELEMENTS
 */

/**
 * Clock -- date and time display
 */
var dateDisplay = document.querySelector(".clock-date");
var timeDisplay = document.querySelector(".clock-time");

var date        = new Date();

// Set the day name
var todaysNum   = date.getDay();    // 0-6
var dayNames    = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var todaysName  = dayNames[todaysNum];

// Set day number
var dayNumber   = date.getDate();   // 1-31

// Set month
var currMonth   = date.getMonth();  // 0-11
currMonth += 1;

// Set time
var currMinutes = date.getMinutes()
var currHours   = date.getHours();

if (dayNumber <= 9) {
  dayNumber = "0" + dayNumber;
}
if (currMonth <= 9) {
  currMonth = "0" + currMonth;
}
if (currMinutes <= 9) {
  currMinutes = "0" + currMinutes;
}
if (currHours <= 9) {
  currMinutes = "0" + currMinutes;
}

var currentTime = currHours + ":" + currMinutes;

var todaysDate  =  todaysName + " " + dayNumber + "-" + currMonth + "-" + date.getFullYear();

/**
 * This function is for delaying the dashboard clock.
 */
function odometerClockStartupDelay() {
  setTimeout(function() {
    dateDisplay.innerHTML = todaysDate;
    timeDisplay.innerHTML = currentTime;
  }, (startupTime / 2));
}

/**
 * Odometer
 *
 * According to the below calculations, the car is moving with the speed of
 * about 20m/s, or 72km/h.
 */
var odometer = document.querySelector(".odometer");
var distance;

function startTime() {
  if (timeRunning === false) {
    timeRunning = true;
    incrementTime();
    carenergy();
  }
  else {
    timeRunning === false;
  }
}

function incrementTime() {
  if (timeRunning === true) {
    setTimeout(function() {
      time++;

      distance = time / 50;
      distance = distance.toFixed(2);

      if (distance > 99 && distance <= 999) {
        distance = "0" + distance;
      }
      else if (distance > 9 && distance <= 99) {
        distance = "00" + distance;
      }
      else if (distance <= 9) {
        distance = "000" + distance;
      }

      odometer.innerHTML = distance;

      incrementTime();
    }, startupTime);
  }
}

var mainframe = document.querySelector(".mainframe");

/**
 * Load the mainframe after the user name has been correctly set.
 * (mainframe = the area where the game happens)
 */
function loadMainframe() {
  if (playerNameSet === true) {
    mainframe.classList.remove("hide-element"); // show the mainframe
    odometerClockStartupDelay(); // delay the dashboard clock(s) & counter(s)

    // Attach event listeners that listen to keyboard interactions.
    // They need to be called here in order to be listening AFTER the mainframe
    // has loaded.
    addEventListener("keydown", toggleLights, false);     // lights
    addEventListener("keydown", indicatorLights, false);  // indicators
    addEventListener("keydown", moveLeft, false);         // move left
    addEventListener("keydown", moveRight, false);        // move right

    getPlateData(); // Print plate data to the console
  }
}

/**
 * INFO UNIT
 */

/**
 * MESSAGE WALL
 * and related functions
 *
 * The message wall itself is an empty unordered list at its initial state.
 * I chose <ul> and <li> elements because there is a possibility of appending
 * several messages to the message wall by expanding the function later on, and
 * a list is a good container for multiple items.
 */
var msgWall = document.querySelector(".msg-wall");

var messageCounter = 0; // Keep track of the messages

// The actual message text:
var messageString = "Hey man, this is the garage. Can you please bring the car in for a quick checkup today? Say, $300?";

/**
 * This function creates the message item which looks like the following:
 *
 *  <li class="msg-item msg-no-[counter]">
 *    <div class="msg-content">
 *      [messageString]
 *    </div>
 *    <div class="msg-actions">
 *      <button class="msg-accept">OK</button>
 *      <button class="msg-delete">IGNORE</button>
 *    </div>
 *  </li>
 */
function createMessage() {

  /**
   * Create the elements of a message item
   */

  // The message item <li> wrapper:
  var msgItem = document.createElement("li");
  msgItem.classList.add("msg-item");
  msgItem.classList.add("msg-no-" + messageCounter);

  // The message container:
  var msgContent = document.createElement("div");
  msgContent.classList.add("msg-content");

  // The message actions buttonset wrapper:
  var msgActions = document.createElement("div");
  msgActions.classList.add("msg-actions");

  // The accept button:
  var acceptMsgBtn = document.createElement("button");
  acceptMsgBtn.classList.add("msg-accept");
  acceptMsgBtn.innerHTML = "OK";

  // The delete / ignore button:
  var deleteMsgBtn = document.createElement("button");
  deleteMsgBtn.classList.add("msg-delete");
  deleteMsgBtn.innerHTML = "IGNORE";

  /**
   * Put the whole message item block together
   */

  msgWall.appendChild(msgItem);
    // Append message container, content and the button wrapper
    msgItem.appendChild(msgContent);
      msgContent.innerHTML = messageString;
    msgItem.appendChild(msgActions);
      // Add buttons
      msgActions.appendChild(acceptMsgBtn);
      msgActions.appendChild(deleteMsgBtn);

  // Listen for accepting the message:
  //function acceptMsg() {}

  // Listen for deleting the message:
  deleteMsgBtn.addEventListener("click", deleteMsg, false);
}

/**
 * Function for deleting the message by clicking on the "ignore/delete" button
 */
function deleteMsg() {
  // Find the message container:
  var msgItem = document.querySelector(".msg-item");

  // Disable the action buttons after one is clicked
  var acceptMsgBtn = document.querySelector(".msg-accept");
  var deleteMsgBtn = document.querySelector(".msg-delete");
  acceptMsgBtn.setAttribute("disabled", "");
  deleteMsgBtn.setAttribute("disabled", "");

  // Indicate the click by setting a different styling on the button:
  deleteMsgBtn.style.backgroundColor = "red";

  // Show a message to the user before completely removing the .msg-item:
  var msgContent = document.querySelector(".msg-content");
  msgContent.innerHTML = "Message deleted.";

  // Apply a short delay before deleting:
  setTimeout(function(){

    msgWall.removeChild(msgItem); // Remove the message item
    console.log("Message deleted.");

    // Put the elements back to their base state:
    acceptMsgBtn.removeAttribute("disabled", "");
    deleteMsgBtn.removeAttribute("disabled", "");
    statusIconMessage.src = "img/message-off.png"; // Dashboard notification icon

  }, 1000);
}

/**
 * When a new message is received, destroy the old one, if any.
 */
function destroyOldMsg() {
  var msgItem = document.querySelector(".msg-item");

  if (msgItem) {
    msgWall.removeChild(msgItem);
    console.log("Old message has been deleted automatically.");
  }
}

// Test function for auto-appending elements
function receiveMsg() {
  setTimeout(function() {
    destroyOldMsg();

    statusIconMessage.src = "img/message-on.png";
    messageCounter++;
    createMessage();
    console.log("New message received. Counter:" + messageCounter);

    receiveMsg();
  }, 10000);
};

receiveMsg();





/**
 * EVENTS / init
 */

extraSunroof.addEventListener("change", sunroof, false); // sunroof
 
// Player name listeners:
enterPlayerName.addEventListener("click", checkPlayerName, false);
playerNameField.addEventListener("keydown", checkPlayerNameEnter, false);

console.log("Hello, dude! Please enter your name."); // The first line on the console



})();