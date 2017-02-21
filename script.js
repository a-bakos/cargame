
var vehicle = document.querySelector(".vehicle");

var vehicleHeadLightsLeft = document.querySelector(".headlights-left");
var vehicleHeadLightsRight = document.querySelector(".headlights-right");
var vehicleTailLightsLeft = document.querySelector(".taillights-left");
var vehicleTailLightsRight = document.querySelector(".taillights-right");
var vehicleIndicatorsLeft = document.querySelector(".indicator-left");
var vehicleIndicatorsRight = document.querySelector(".indicator-right");

// Turn the light on and off
addEventListener("keydown", function(event) {
  if (event.keyCode == 76) {
    vehicleHeadLightsLeft.classList.toggle('vehicle-headlights_on');
    vehicleHeadLightsRight.classList.toggle('vehicle-headlights_on');
    vehicleTailLightsLeft.classList.toggle('vehicle-taillights_on');
    vehicleTailLightsRight.classList.toggle('vehicle-taillights_on');
    console.log("Lights turned on/off.");
  }
  
  // Move left -- that is, move upwards on screen
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

  // Indicator light controls
  if (event.keyCode == 81) {
    console.log("Left indicator lights.");
    vehicleIndicatorsLeft.classList.toggle("vehicle-indicators_on");
  }
  if (event.keyCode == 69) {
    console.log("Right indicator lights.");
    vehicleIndicatorsRight.classList.toggle("vehicle-indicators_on");
  }
  if (event.keyCode == 87) {
    console.log("All indicator lights.");
    vehicleIndicatorsLeft.classList.toggle("vehicle-indicators_on");
    vehicleIndicatorsRight.classList.toggle("vehicle-indicators_on");
  }

});

