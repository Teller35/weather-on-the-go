var date = document.querySelector("#display-time");

var rightNow = moment().format("dddd, MMMM Do, hh:mm a");
date.textContent = rightNow;

fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=salt lake city&units=imperial&appid=27bc004fc8746779f50a74c093ff9a93"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });