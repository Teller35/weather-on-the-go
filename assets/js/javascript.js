var date = document.querySelector("#display-time");

var rightNow = moment().format("dddd, MMMM Do");
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
    if(response.ok){
      return response.json();
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
  .then(function(data) {
    
    var temp = data.current.temp;
    var humidity = data.current.humidity;
    var uv = data.current.uvi;
    var wind = data.current.wind_speed;
    
    displayCurrent(temp, humidity, wind, uv)
    console.log(temp, humidity, uv, wind);
  })
  .catch(function(error) {
    console.log("No data to display");
  })
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&units=imperial&appid=27bc004fc8746779f50a74c093ff9a93"
  )
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
   console.log(data);
  })
}


  
  function displayCurrent(temp, humidity, wind, uv) {
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
  cardTitle.textContent = searchTerm;
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
