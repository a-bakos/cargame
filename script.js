"use strict";

/**
 * The main vehicle object aka The Car
 */
var vehicle = {
  body:             document.querySelector(".vehicle"),

  headLights:       document.querySelectorAll(".vehicle-headlights"),
  tailLights:       document.querySelectorAll(".vehicle-taillights"),

  lightsKey:        76, // keycode for turning the lights on
  headLightsOn:     "vehicle-headlights_on", // CSS class to toggle
  tailLightsOn:     "vehicle-taillights_on", // CSS class to toggle

  leftIndicators:   document.querySelectorAll(".front-indicator-left, .rear-indicator-left"),
  rightIndicators:  document.querySelectorAll(".front-indicator-right, .rear-indicator-right"),

  leftIndicatorsKey:  81,
  rightIndicatorsKey: 69,

  frontIndicatorsOn:  "front-indicators_on",
  rearIndicatorsOn:   "rear-indicators_on",

  moveLeftKey:      37,
  moveRightKey:     39,
  moveLeftMotion:   "move-left",  // CSS class to toggle
  moveRightMotion:  "move-right", // CSS class to toggle
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

addEventListener("change", function() {
  if (extraSunroof.checked) {
    vehicle.body.appendChild(vehicle.sunroof);
    console.log("Extra sunroof.");
  }
  else {
    vehicle.body.removeChild(vehicle.sunroof);
    console.log("No sunroof.");
  }
});