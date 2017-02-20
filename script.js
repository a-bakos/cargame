var vehicle = document.querySelector(".vehicle");

var vehicleHeadLightsLeft = document.querySelector(".headlights-left");
var vehicleHeadLightsRight = document.querySelector(".headlights-right");
var vehicleTailLightsLeft = document.querySelector(".taillights-left");
var vehicleTailLightsRight = document.querySelector(".taillights-right");

addEventListener("click", function(event) {
  vehicleHeadLightsLeft.classList.toggle('vehicle-headlights_on');
  vehicleHeadLightsRight.classList.toggle('vehicle-headlights_on');
  vehicleTailLightsLeft.classList.toggle('vehicle-taillights_on');
  vehicleTailLightsRight.classList.toggle('vehicle-taillights_on');
  vehicle.classList.toggle('vehicle-lights_on');
});