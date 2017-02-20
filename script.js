
var vehicle = document.querySelector(".vehicle");

var vehicleHeadLightsLeft = document.querySelector(".headlights-left");
var vehicleHeadLightsRight = document.querySelector(".headlights-right");
var vehicleTailLightsLeft = document.querySelector(".taillights-left");
var vehicleTailLightsRight = document.querySelector(".taillights-right");

// Turn the light on and off
addEventListener("keydown", function(event) {
  if (event.keyCode == 76) {
    vehicleHeadLightsLeft.classList.toggle('vehicle-headlights_on');
    vehicleHeadLightsRight.classList.toggle('vehicle-headlights_on');
    vehicleTailLightsLeft.classList.toggle('vehicle-taillights_on');
    vehicleTailLightsRight.classList.toggle('vehicle-taillights_on');
    console.log("Lights turned on/off.");
  }
  
  if (event.keyCode == 38) {
    console.log("Move left.");
    vehicle.className = "vehicle";
    vehicle.classList.toggle("move-left");
  }
  if (event.keyCode == 40) {
    console.log("Move right.");
    vehicle.className = "vehicle";
    vehicle.classList.toggle("move-right");
  }
});
