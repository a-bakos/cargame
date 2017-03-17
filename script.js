(function() {
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

// User interaction counters:
var interactionCounter = {
  mouseClicks: 0,
  keyPresses: 0,
  allAction: 0,

  incrementClicks: function() {
    interactionCounter.mouseClicks++;
    interactionCounter.allAction++;
    sendConditionalMsg();
  },

  incrementKeys: function() {
    interactionCounter.keyPresses++;
    interactionCounter.allAction++;
    sendConditionalMsg();
  }
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

function carEnergy() {
  if (timeRunning === true) {
    setTimeout(function() {
      // Automatically decrease the energy state:
      energyState = energyState - 0.015;
      energyState = parseFloat(energyState);

      if (energyState > 100) {
        energyState = 99.999;
      }

      if (energyState >= 10 && energyState < 100) {
        energyState = "0" + energyState;
      }
      else if (energyState < 10) {
        energyState = "00" + energyState;
      }

      // Display the number, but only up to one decimal
      energyDisplay.innerHTML = energyState.slice(0,5);

      if (energyState > 20 && energyState <= 35) {
        statusIconEngine.src = "img/engine-on.png";
      }
      else if (energyState <= 20) {
        statusIconEngine.src = "img/engine-error.png";
      }
      else {
        statusIconEngine.src = "img/engine-off.png";
      }

      // Call the function again, recursively.
      carEnergy();

      if (energyState <= 1) {
        gameOver();
      }

    }, startupTime);

  }
}

/**
 * energyConsumption(amount)
 *
 * This function handles the energy consumption of the car. For example, when
 * the player turns the lights on, energyConsumption() will decrease the overall
 * car energy by the amount given as a parameter. If amount is less than the
 * available energy, the function invokes gameOver() function.
 */
function energyConsumption(amount) {
  if (amount <= energyState) {
    energyState = energyState - amount;
  }
  else {
    gameOver();
  }
}

// test state
function gameOver() {
  // GAME OVER SCREEN
    energyDisplay.innerHTML = "XXX";
    timeRunning = false;
    hideElement(mainframe);
    //removeEventListener();
    var gameOverScreen = document.createElement("section");
    gameOverScreen.classList.add("game-over-screen");
    document.body.appendChild(gameOverScreen);
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

    energyConsumption(1);

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
  switch(lightSwitchCounter) {
    case 4:
      energyConsumption(2);
      sendDirectMsg("System", "Warning! Please be aware that unnecessarily switching the lights on and off may cause damage in your car's battery and result in energy loss.");
      console.log("Light switch - First warning message.");
      break;
    case 8:
      energyConsumption(6);
      statusIconBattery.src = "img/battery-on.png";
      sendDirectMsg("System", "Battery problem! Lights switched on and off too many times.");
      console.log("Battery problem! Lights switched on and off too many times.");
      break;
    case 16:
      energyConsumption(12);
      sendDirectMsg("System", "Battery error! Stop playing with the light switch!");
      console.log("Battery error! Stop playing with the light switch!");
      statusIconBattery.src = "img/battery-error.png";
      break;
    case 30:
      energyConsumption(0);
      sendDirectMsg("System", "Warning! Critical battery condition! Say goodbye to your battery, mate.");
      console.log("Warning! Critical battery condition!");
      statusIconBattery.src = "img/battery-error.png";
      break;
    case 40:
      energyConsumption(50);
      sendDirectMsg("System", "No words for your behaviour. Please take me back to the garage...");
      console.log("Light switch - Final warning!");
      statusIconBattery.src = "img/battery-error.png";
      break;
  }
}

/**
 * Indicator lights controls
 */
var statusIconLeftIndex = document.querySelector(".icon-left-index")
var statusIconRightIndex = document.querySelector(".icon-right-index")

function indicatorLights(event) {
  if (event.keyCode == vehicle.leftIndicatorsKey) {

    energyConsumption(0.08);

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

    energyConsumption(0.08);

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
  event.preventDefault();
  if (event.keyCode == 37) {
    energyConsumption(0.03);
    vehicle.body.className = "vehicle";
    vehicle.body.classList.toggle(vehicle.moveLeftMotion);
    console.log("Move left");
  }
}

function moveRight(event) {
  event.preventDefault();
  if (event.keyCode == 39) {
    energyConsumption(0.03);
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

    userMoney = userMoney - 500;
    userWallet.innerHTML = userMoney;
  }
  else {
    vehicle.body.removeChild(vehicle.sunroof);
    console.log("No sunroof.");
  }
}

// Cheat function for adding sunroof during the game
function cheatRoof(event) {
  if (!extraSunroof.checked) {
    if (event.shiftKey) {
      vehicle.body.appendChild(vehicle.sunroof);
      sendDirectMsg("System", "Cheat applied! Sunroof added.");
      console.log("[Cheat applied!] -> Sunroof added.");
    }
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
 * DASHBOARD ELEMENTS
 */

/**
 * Clock -- date and time display
 *
 * Function re-calls itself every 3 seconds.
 */

function displayDateTime() {
  var dateDisplay = document.querySelector(".clock-date");
  var timeDisplay = document.querySelector(".clock-time");

  energyConsumption(0.01);

  setTimeout(function() {
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

    if (dayNumber <= 9)   { dayNumber = "0" + dayNumber; }
    if (currMonth <= 9)   { currMonth = "0" + currMonth; }
    if (currHours <= 9)   { currHours = "0" + currHours; }
    if (currMinutes <= 9) { currMinutes = "0" + currMinutes; }

    var currentTime = currHours + ":" + currMinutes;

    var todaysDate  =  todaysName + " " + dayNumber + "-" + currMonth + "-" + date.getFullYear();

    dateDisplay.innerHTML = todaysDate;
    timeDisplay.innerHTML = currentTime;

    displayDateTime(); // Recursion.
  }, 3000);
}

/**
 * This function is for delaying the dashboard clock.
 */
function odometerClockStartupDelay() {
  setTimeout(function() {
    displayDateTime();
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
    carEnergy();
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

/**
 * INFO UNIT
 */

// User wallet:
var userMoney = Number(2500);
var userWallet = document.querySelector(".money-amount");
userWallet.innerHTML = userMoney;

// The actual message text that the user will receive:
var messageString;

/**
 * MESSAGE BANK
 */
var msg = {
  random: [
    "Dear driver, donate to your favourite local fitting shop today! $",
    "Hi, my name is Toby, I am selling personalized car insurance solutions, would you be interested in having one? Initial price: $",
    "Tired of paying all the monthly bills by yourself? Register with us and we will take care of the burden for you, now for just: $",
    "Get your amazing new ACME driver's seat today! It's such a delight to sit on while on the road driving. Price: $",
    "Essential MOT pre-checkup. What you only have to do is send us a photo of your car and we will tell its condition accurately. Cheap and reliable! $",
    "Personalised gas pedals just for you! You can have your loved one's face printed on it! Order while you can for $",
    "Hello, we have new fantastic plastic steering wheels arrived last night. Buy one get one for free. Prices from $",
    "Find out whether you have been fined for parking at a wrong location lately! Register with us only for $",
    "Isn't it very annoying when your inbox is bombarded with spam messages? Let us try to guard you from them! No guarantee, T&C apply. $"
  ]
}

/**
 * sendConditionalMsg() function
 *
 * This is the function for sending messages to the user based on different
 * cases that are depending on the collective number of user interactions,
 * aka mouse clicks + keyboard keypresses.
 *
 * These are messages from the garage and the system. Random spam messages
 * not included here.
 */
function sendConditionalMsg() {
  var playerName = thePlayerNameDisplay.innerHTML;

  switch (interactionCounter.allAction) {
    case 1:
      sendDirectMsg("System", "Hello! Welcome aboard on your test edition of the newest <strong>Impson e7</strong> vehicle. You will see all your system and external messages here. Happy driving and enjoy your journey!");
      break;
    case 15:
      sendDirectMsg("System", "Even though your <strong>Impson e7</strong> runs mainly on autopilot and takes care of the safe journey, please always be aware of using your lights when necessary. Light switch button: <strong>L</strong>");
      break;
    case 25:
      sendDirectMsg("Garage", "Hi " + playerName + "! General checkup needed. Cost: $", 500, 5);
      break;
    case 30:
      sendDirectMsg("System", "You should always use your indicators when changing tracks.")
      break;
    case 35:
      sendDirectMsg("Garage", "We would like to thank you for using our first test edition of the <strong>Impson e7</strong> vehicle. You will receive a decent amount of money and some energy charge from us as a reward.", -1000, 10);
      break;
    case 100:
      sendDirectMsg("Garage", "Hey, can you checkup needed. Cost: $", 1500, 20);
      break;
    case 1000:
      sendDirectMsg("Garage", "General checkup needed. Cost: $", 2500, 100);
      break;
  }
}

/**
 * sendDirectMsg(message, cost)
 *
 * Function for sending direct messages.
 *
 * message: the actual message text
 * cost: the cost of applying whatever the message contains
 */
function sendDirectMsg(from, message, cost, energyCharge) {

  /**
   * sender(from)
   *
   * Returns the message sender's name, inserted into a styled DOM element
   */
  function sender(from) {
    return "<span class=\"msg-sender\">From: " + from + "</span><br>";
  }

  messageString = sender(from) + message + " ";

  // If there is no cost and/or energyCharge supplied with the message, assign
  // zero as value to them
  if (typeof cost === "undefined") {
    cost = 0;
  }
  if (typeof energyCharge === "undefined") {
    energyCharge = 0;
  }

  messageReceived(cost, energyCharge);
}

/**
 * receiveRandomMsg() function
 *
 * This function is for receiving random spam messages.
 * It runs all the time and picks a random message text from the message bank's
 * related random property's array. Then calculates a random price for it, and
 * invokes messageReceived() function (which builds up the message item).
 * At last it calls itself again after 30 seconds.
 */
function receiveRandomMsg() {
  setTimeout(function() {
    messageString = msg.random[Math.floor(Math.random() * msg.random.length)];
    var cost = Math.floor(Math.random() * 1000);
    var energyCharge = 0;
    messageReceived(cost, energyCharge);
    receiveRandomMsg(); // Recursion.
  }, 30000);
}

/**
 * messageReceived() function
 *
 * After the message has been sent, this function takes over the next steps.
 * It increments the message counter, creates the actual message item and
 * inserts it into the DOM, plus displays a notification on the dashboard.
 */
function messageReceived(cost, energyCharge) {
  messageCounter++;

  // Small energy consumption for receiving all kinds of messages:
  energyConsumption(0.5);

  createMessage(cost, energyCharge);
  statusIconMessage.src = "img/message-on.png";
  console.log("New message received. Counter: " + messageCounter);
}

/**
 * MESSAGE WALL
 * The message wall itself is an empty unordered list at its initial state.
 */
var msgWall = document.querySelector(".msg-wall");
var messageCounter = 0; // Keep track of the messages
var unreadMessages = document.querySelector(".msg-amount");

// Function for updating unread message counter:
function updateUnreadMsgCounter() {
  unreadMessages.innerHTML = messageCounter;
}

/**
 * createMessage() function
 *
 * This function creates the message item which looks like the following:
 *
 *  <li class="msg-item msg-no-[counter]">
 *    <div class="msg-container">
 *      <p class="msg-received>[msgReceivedAt]</p>
 *      <p class="msg-content>
 *        [messageString]
 *        <span class="msg-content-cost">[cost]</span>
 *      </p>
 *      <p class="msg-energy-charge>Energy charge:
 *        <span>[energyCharge]</span>
 *      </p>
 *    </div>
 *    <div class="msg-actions">
 *      <button class="msg-accept">OK</button>
 *      <button class="msg-delete">IGNORE</button>
 *    </div>
 *  </li>
 *
 * (Takes one argument, 'cost')
 */
function createMessage(cost, energyCharge) {
  updateUnreadMsgCounter();

  // Get the time the message has arrived:
  var msgDate = new Date();
  var currMsgHours = msgDate.getHours();
  var currMsgMins  = msgDate.getMinutes();

  if (currMsgHours <= 9) { currMsgHours = "0" + currMsgHours; }
  if (currMsgMins  <= 9) { currMsgMins  = "0" + currMsgMins;  }

  var msgArrived   = currMsgHours + ":" + currMsgMins;

  /**
   * Create the elements of a message item
   */

  // The message item <li> wrapper:
  var msgItem = document.createElement("li");
  msgItem.classList.add("msg-item");
  msgItem.classList.add("msg-no-" + messageCounter);

  // The message container:
  var msgContainer = document.createElement("div");
  msgContainer.classList.add("msg-container");

  // The time of the message:
  var msgReceivedAt = document.createElement("p");
  msgReceivedAt.classList.add("msg-received");
  msgReceivedAt.innerHTML = msgArrived;

  // The message content:
  var msgContent = document.createElement("p");
  msgContent.classList.add("msg-content");
  msgContent.innerHTML = messageString;

  // The cost:
  var msgContentCost = document.createElement("span");
  msgContentCost.classList.add("msg-content-cost");
  // Only display the cost if the message has a cost sent with it (which
  // actually means cost is bigger than "0")
  if (cost > 0) {
    msgContentCost.innerHTML = cost;
  }
  else { // Hide positive amount of money (considered as gift money)
    msgContentCost.innerHTML = cost;
    hideElement(msgContentCost);
  }

  // Conditionally displayed energy charge:
  if (energyCharge > 0) {
    var msgEnergyContainer = document.createElement("p");
    msgEnergyContainer.classList.add("msg-energy-charge-container");
    msgEnergyContainer.innerHTML = "Energy charge: ";

    var msgEnergyCharge = document.createElement("span");
    msgEnergyCharge.classList.add("msg-energy-charge-amount");
    msgEnergyCharge.innerHTML = energyCharge;
  }

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
  // If there is no cost sent with the message (meaning, less than "0"), hide
  // the IGNORE button
  if (cost <= 0) {
    hideElement(deleteMsgBtn);
    acceptMsgBtn.classList.add("single-button");
  }

  /**
   * Then, put the whole message item block together
   */
  msgWall.appendChild(msgItem);
    // Append message container, time and content
    msgItem.appendChild(msgContainer);
      msgContainer.appendChild(msgReceivedAt);
      msgContainer.appendChild(msgContent);
        msgContent.appendChild(msgContentCost);
    if (msgEnergyCharge) {
      msgContainer.appendChild(msgEnergyContainer);
      msgEnergyContainer.appendChild(msgEnergyCharge);
    }
    // Append button container and buttons
    msgItem.appendChild(msgActions);
      msgActions.appendChild(acceptMsgBtn);
      msgActions.appendChild(deleteMsgBtn);

  /**
   * Message handlers
   */
  // Listen for accepting the message:
  acceptMsgBtn.addEventListener("click", acceptMsg, false);
  // Listen for deleting the message:
  deleteMsgBtn.addEventListener("click", deleteMsg, false);
}

/**
 * Function for accepting the message.
 */
function acceptMsg(event) {
  // This is the soul of this function.
  // By setting the target, or where the event happened, will determine the
  // related further actions relative to itself:
  var acceptMsgBtn = event.target;

  // Set the selectors relative to target:
  var deleteMsgBtn   = acceptMsgBtn.nextSibling;
  var msgButtons     = acceptMsgBtn.parentNode;
  var msgContainer   = msgButtons.previousSibling;
  var msgReceived    = msgContainer.firstChild;
  var msgContent     = msgReceived.nextSibling;
  var msgContentCost = msgContent.lastChild;
  var msgItem        = msgButtons.parentNode;
  var msgWall        = msgItem.parentNode;

  energyConsumption(0.25);

  if (document.querySelector(".msg-energy-charge-container")) {
    var energyCharge = document.querySelector(".msg-energy-charge-amount").innerHTML;
    energyState = parseFloat(energyState) + parseFloat(energyCharge);
  }

  // Disable the action buttons after one is clicked
  acceptMsgBtn.setAttribute("disabled", "");
  deleteMsgBtn.setAttribute("disabled", "");

  // Indicate the click by setting a different styling on the button:
  // (This will be replaced with a CSS class in the stylesheet.)
  acceptMsgBtn.style.backgroundColor = "green";

  // Show a message to the user before completely removing the .msg-item:
  msgContainer.innerHTML = "<p class=\"msg-action-response\"><img class=\"status-icon icon-accepted\" src=\"img/accepted.png\">Message accepted.</p>";

  // Update counters:
  messageCounter--; // Decrement message counter
  updateUnreadMsgCounter(); // Update unread message counter

  // Update the user wallet:
  userMoney = userMoney - msgContentCost.innerHTML;
  userWallet.innerHTML = userMoney;

  // Apply a short delay before deleting:
  setTimeout(function() {

    msgWall.removeChild(msgItem); // Remove the message item
    console.log("Message item removed (accept). Counter: " + messageCounter);

    // Put the elements back to their base state:
    acceptMsgBtn.removeAttribute("disabled", "");
    deleteMsgBtn.removeAttribute("disabled", "");

    turnOffMsgNotification();
  }, 1000);
}

/**
 * Function for deleting the message by clicking on the "ignore/delete" button
 */
function deleteMsg(event) {

  // This is the soul of this function.
  // By setting the target, or where the event happened, will determine the
  // related further actions relative to itself:
  var deleteMsgBtn = event.target;

  // Set the selectors relative to target:
  var acceptMsgBtn = deleteMsgBtn.previousSibling;
  var msgButtons   = deleteMsgBtn.parentNode;
  var msgContainer = msgButtons.previousSibling;
  var msgItem      = msgButtons.parentNode;
  var msgWall      = msgItem.parentNode;

  energyConsumption(0.25);

  // Disable the action buttons after one is clicked
  acceptMsgBtn.setAttribute("disabled", "");
  deleteMsgBtn.setAttribute("disabled", "");

  // Indicate the click by setting a different styling on the button:
  // (This will be replaced with a CSS class in the stylesheet.)
  deleteMsgBtn.style.backgroundColor = "red";

  // Show a message to the user before completely removing the .msg-item:
  msgContainer.innerHTML = "<p class=\"msg-action-response\"><img class=\"status-icon icon-deleted\" src=\"img/deleted.png\">Message deleted.</p>";

  // Update counters:
  messageCounter--; // Decrement message counter
  updateUnreadMsgCounter(); // Update unread message counter

  // Apply a short delay before deleting:
  setTimeout(function() {

    msgWall.removeChild(msgItem); // Remove the message item
    console.log("Message item removed (ignore). Counter: " + messageCounter);

    // Put the elements back to their base state:
    acceptMsgBtn.removeAttribute("disabled", "");
    deleteMsgBtn.removeAttribute("disabled", "");

    turnOffMsgNotification();
  }, 1000);
}

// Function for setting the dashboard message notification icon back to base
// state, aka "there is no message"
function turnOffMsgNotification() {
  if (messageCounter == 0) {
    energyConsumption(0.05);
    statusIconMessage.src = "img/message-off.png";
  }
}

/**
 * EVENTS / init
 */

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

    getPlateData();     // Print plate data to the console
    receiveRandomMsg(); // Start receiving spam messages
  }
}

// "Global" event listeners for counting user interactions:
addEventListener("click", interactionCounter.incrementClicks, false);
addEventListener("keydown", interactionCounter.incrementKeys, false);

extraSunroof.addEventListener("change", sunroof, false);  // sunroof
vehicle.body.addEventListener("click", cheatRoof, false); // cheatroof

// Player name listeners:
enterPlayerName.addEventListener("click", checkPlayerName, false);
playerNameField.addEventListener("keydown", checkPlayerNameEnter, false);

console.log("Hello, dude! Please enter your name."); // The first line on the console

})();