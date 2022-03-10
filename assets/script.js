var apiKey = "b639d479640601578fbf359e38c5ee04";
var htmlButton = $("#pastSearch");

//moment for date. what are you gonna do with this?
$("#time").text(moment().format("MMMM Do YYYY"));

var pastSearch = JSON.parse(localStorage.getItem("city")) || [];

//make sure to add this loop to its own function. 

// for (let i = 0; i < pastSearch.length; i++) {
//   const pastSearchCity = pastSearch[i];
//   var buttonEl = $("<button>");
//   buttonEl.text(pastSearchCity);
//   htmlButton.append(buttonEl);
// }

function handleFormSubmit(event) {
  event.preventDefault();
  var userInput = $(this);
  var city = userInput[0][0].value;
  pastSearch.push(city);
  var buttonEl = $("<button>");
  buttonEl.text(city);
  htmlButton.append(buttonEl);
  localStorage.setItem("city", JSON.stringify(pastSearch));
  getLocation("", city);
}

function getLocation(event, city) {
  if (event) {
    city = $(this).text();
  }
  console.log(city);
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#city").text(city);
      getWeather(data[0].lat, data[0].lon);
    });
}

function getWeather(lat, lon) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDay(data);
      currentWeather(data);
    });
}
function currentWeather(data) {

    //current weather should display the city name, the date, the icon, the temp, the humidiity, the wind and uvi should be a button that changes color depending on the index of the uvi
    var temperature = data.current.temp;
      var humidity =data.current.humidity;
      var windspeed = data.current.wind_speed;
      var uvindex=data.current.uvi;
    var currentWeather = $("#currentWeather");


}

function fiveDay(data) {
  var fiveDayRow = $(".fiveDay");

  // add jquery.style to change background for uvindexel //
  fiveDayRow.empty();
  for (let i = 1; i < 6; i++) {
    const element = data.daily[i];
// make sure you remove uvi from the five day and make sure to add the date
    var fiveDayEl = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">Temperature:${element.temp.max}</p>
          <p class="card-text">Humidity:${element.humidity}</p>
          <p class="card-text">Wind Speed:${element.wind_speed}</p>
          <p class="card-text">UV Index:${element.uvi}</p>
        </div>
      </div>`;
    fiveDayRow.append(fiveDayEl);
  }
}

// need to create buttons for the search history. 

$("#form").on("submit", handleFormSubmit);
htmlButton.on("click", "button", getLocation);

console.log("loaded");
