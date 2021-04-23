var date = document.querySelector("#display-time");

var rightNow = moment().format("dddd, MMMM Do, hh:mm a");
date.textContent = rightNow;

function myFunction() {
  var searchTerm = document.querySelector("#searchTerm").value;
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=27bc004fc8746779f50a74c093ff9a93"
)
.then(function(response) {
  return response.json();
})
.then(function(data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
  return fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=27bc004fc8746779f50a74c093ff9a93"
    )
})
.then(function(response) {
  return response.json();
})
.then(function(data) {
  // $("#responseCity").empty();
  for (var i = 0; i < data.current.length; i++){
    var temp = data.current[i].temp;
    var humidity = data.current[i].humidity;
    var wind = data.current[i].wind_speed;
    var uv = date.current[i].uvi;
    // displayCurrent(temp, humidity, wind, uv)
  }
  console.log(temp, humidity, wind, uv);
})
.catch(function(error) {
  console.log("No data to display");
})
}

function displayCurrent(temp, humidity, wind, uv) {
  var results = document.getElementById("responseCity");
  var resultEl = document.createElement("div");
  resultEl.classList.add("col-6");
  results.appendChild(resultsEl);
}



  
