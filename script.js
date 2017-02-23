var vehicle = document.querySelector(".vehicle");

var vehicleHeadLights       = document.querySelectorAll('.vehicle-headlights');
var vehicleTailLights       = document.querySelectorAll('.vehicle-taillights');

var vehicleIndicatorsLeft   = document.querySelectorAll(".front-indicator-left, .rear-indicator-left");
var vehicleIndicatorsRight  = document.querySelectorAll(".front-indicator-right, .rear-indicator-right");


// Turn the lights on and off
addEventListener("keydown", function(event) {
  if (event.keyCode == 76) {
    for (var i = 0; i < vehicleHeadLights.length; i++) {
      if (vehicleHeadLights[i].classList.contains('vehicle-headlights_on')) {
        vehicleHeadLights[i].classList.remove('vehicle-headlights_on');
        console.log("Headlights turned OFF.");
      }
      else {
        vehicleHeadLights[i].classList.add('vehicle-headlights_on');
        console.log("Headlights turned ON.");
      }
    }
    for (var i = 0; i < vehicleTailLights.length; i++) {
      if (vehicleTailLights[i].classList.contains('vehicle-taillights_on')) {
        vehicleTailLights[i].classList.remove('vehicle-taillights_on');
        console.log("Tail lights turned OFF.");
      }
      else {
        vehicleTailLights[i].classList.add('vehicle-taillights_on');
        console.log("Tail lights turned ON.");
      }
    }
  }
});

// Move left -- that is, move upwards on screen
addEventListener("keydown", function(event) {
  if (event.keyCode == 38) {
    console.log("Move left.");
    vehicle.className = "vehicle";
    vehicle.classList.toggle("move-left");
  }
  // Move right -- that is, move downwards on screen
  if (event.keyCode == 40) {
    console.log("Move right.");
    vehicle.className = "vehicle";
    vehicle.classList.toggle("move-right");
  }
});

// Indicator light controls
addEventListener("keydown", function(event) {
  if (event.keyCode == 81) {
    if (
      vehicleIndicatorsLeft[0].classList.contains("front-indicators_on") &&
      vehicleIndicatorsLeft[1].classList.contains("rear-indicators_on"))
    {
      console.log("Left indicator lights OFF.");
      vehicleIndicatorsLeft[0].classList.remove("front-indicators_on");
      vehicleIndicatorsLeft[1].classList.remove("rear-indicators_on");
    } else {
      console.log("Left indicator lights ON.");
      vehicleIndicatorsLeft[0].classList.add("front-indicators_on");
      vehicleIndicatorsLeft[1].classList.add("rear-indicators_on");
    }
  }
  if (event.keyCode == 69) {
    if (
      vehicleIndicatorsRight[0].classList.contains("front-indicators_on") &&
      vehicleIndicatorsRight[1].classList.contains("rear-indicators_on"))
    {
      console.log("Right indicator lights OFF.");
      vehicleIndicatorsRight[0].classList.remove("front-indicators_on");
      vehicleIndicatorsRight[1].classList.remove("rear-indicators_on");
    } else {
      console.log("Right indicator lights ON.");
      vehicleIndicatorsRight[0].classList.add("front-indicators_on");
      vehicleIndicatorsRight[1].classList.add("rear-indicators_on");
    }
  }
  if (event.keyCode == 87) {
    if (
      vehicleIndicatorsLeft[0].classList.contains("front-indicators_on")  &&
      vehicleIndicatorsLeft[1].classList.contains("rear-indicators_on")   &&
      vehicleIndicatorsRight[0].classList.contains("front-indicators_on") &&
      vehicleIndicatorsRight[1].classList.contains("rear-indicators_on"))
    {
      console.log("All indicator lights OFF.");
      vehicleIndicatorsLeft[0].classList.remove("front-indicators_on");
      vehicleIndicatorsLeft[1].classList.remove("rear-indicators_on");
      vehicleIndicatorsRight[0].classList.remove("front-indicators_on");
      vehicleIndicatorsRight[1].classList.remove("rear-indicators_on");
    } else {
      console.log("All indicator lights ON.");
      vehicleIndicatorsLeft[0].classList.add("front-indicators_on");
      vehicleIndicatorsLeft[1].classList.add("rear-indicators_on");
      vehicleIndicatorsRight[0].classList.add("front-indicators_on");
      vehicleIndicatorsRight[1].classList.add("rear-indicators_on");
    }
  }

});

/**
 * Optional sunroof
 */
var extraSunroof  = document.getElementById("extra-sunroof");
var sunroof       = document.createElement("div");

sunroof.className = "vehicle-sunroof";

addEventListener("change", function() {
  if (extraSunroof.checked) {
    vehicle.appendChild(sunroof);
    console.log("Extra sunroof.");
  }
  else {
    vehicle.removeChild(sunroof);
    console.log("No sunroof.");
  }
});