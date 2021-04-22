var date = document.querySelector("#display-time");

var rightNow = moment().format("dddd, MMMM Do, hh:mm a");
date.textContent = rightNow;


function myFunction() {
  var searchTerm = document.querySelector("#searchTerm").value;
  
fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm  + "&units=imperial&appid=27bc004fc8746779f50a74c093ff9a93"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
     $("#responseCity").empty();
     for (var i = 0; i < data.main.length; i++){
       var temp
       var wind
       var humidity
       var uv
     }
      console.log(data);
    });
  }