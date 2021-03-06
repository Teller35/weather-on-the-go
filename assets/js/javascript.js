var date = document.querySelector("#display-time");
var rightNow = moment().format("dddd, MMMM Do");
date.textContent = rightNow;

var past = [];
var counter = 0;
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
    if(response.ok){
      return response.json();
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
  .then(function(data) {
    $("#response-city").empty();
    var temp = data.current.temp;
    var humidity = data.current.humidity;
    var uv = data.current.uvi;
    var wind = data.current.wind_speed;
    var day = moment.unix(data.current.dt).format("MM/D/YY");
    
    displayCurrent(temp, humidity, wind, uv, day);
    // saveSearch(searchTerm);
  
  })
  .catch(function(error) {
    console.log("No data to display");
  })
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
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=27bc004fc8746779f50a74c093ff9a93"
    )
  })
  .then(function(response) {
    if(response.ok){
      return response.json();
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
  .then(function(data) {
    $("#fiveday").empty();
    for (var i = 1; i < 6; i++) {
      var dayTemp = data.daily[i].temp.day;
      var dayWind = data.daily[i].wind_speed;
      var dayHum = data.daily[i].humidity;
      var dayDate = moment.unix(data.daily[i].dt).format("MM/D/YY");
      
      displayFiveDay(dayTemp, dayWind, dayHum, dayDate);
    }
  })
}

  
  function displayCurrent(temp, humidity, wind, uv, day) {
  var searchTerm = document.querySelector("#searchTerm").value;
  searchTerm = searchTerm.toUpperCase();

  var weather = document.getElementById("response-city");
  var cardEl = document.createElement("div");
  cardEl.classList.add("card");
  weather.appendChild(cardEl);
  
  var display = document.createElement("div");
  display.className = "card-body"
  cardEl.appendChild(display);
  
  var cardTitle = document.createElement("h3");
  cardTitle.className = "card-city";
  cardTitle.textContent = searchTerm + " (" + day + ")";
  display.appendChild(cardTitle);

  var tempInput = document.createElement("p");
  tempInput.className = "text";
  tempInput.textContent = "Temp: " + temp + " F";
  display.appendChild(tempInput);
  
  var humInput = document.createElement("p");
  humInput.className = "text";
  humInput.textContent = "Humidity: " + humidity + "%";
  display.appendChild(humInput);

  var windInput = document.createElement("p");
  windInput.className = "text";
  windInput.textContent = "Wind: " + wind + " MPH";
  display.appendChild(windInput);

  var uvInput = document.createElement("p");
  uvInput.className = "text";
  uvInput.textContent = "UV Index: " + uv;
  display.appendChild(uvInput);

}

function displayFiveDay(dayTemp, dayWind, dayHum, dayDate) {
 
  var weather = document.getElementById("fiveday");
  var display = document.createElement("div");
  display.className = "col dayfive";
  weather.appendChild(display);
  
  var cardTitle = document.createElement("p");
  cardTitle.className = "info";
  cardTitle.textContent = dayDate;
  display.appendChild(cardTitle);

  var tempInput = document.createElement("p");
  tempInput.className = "info";
  tempInput.textContent = "Temp: " + dayTemp + " F";
  display.appendChild(tempInput);
  
  var humInput = document.createElement("p");
  humInput.className = "info";
  humInput.textContent = "Humidity: " + dayHum + "%";
  display.appendChild(humInput);
  
  var windInput = document.createElement("p");
  windInput.className = "info";
  windInput.textContent = "Wind: " + dayWind + " MPH";
  display.appendChild(windInput);
}

// function saveSearch(searchTerm) {
//   searchTerm = searchTerm.toUpperCase();
//   past.push(searchTerm);
//   localStorage.setItem("search", JSON.stringify(past));

//   var savedHistory = localStorage.getItem("search");
//   savedHistory = JSON.parse(savedHistory);
//   console.log(savedHistory);
//   for (var i = 0; i < savedHistory.length; i++) {

//     var display = document.getElementById("historyEl");
//     var place = document.createElement("div");
//     place.className = "col";
//     display.appendChild(place);
    
//     var button = document.createElement("button");
//     button.className = "btn btn-outline-secondary";
//     button.innerHTML = savedHistory[i];
//     display.appendChild(button);
// }
// }
