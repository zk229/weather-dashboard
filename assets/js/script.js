var api_key = "76b06c931c557cfae2687140ea5b8f81";
var history = [];

// use Geolocation API to get accurate coordinates for chosen city
var getCityCoords = function(city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + api_key).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                getWeather(data[0]["lat"], data[0]["lon"], city);
            });
        }
        else {
            alert("Invalid city");
        }
    }).catch(function(error) {
        alert("Unable to reach Open Weather API.");
    });
};

// use the One Call API to obtain the weather for that city
var getWeather = function(lat, lon, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + api_key).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                updateToday(data["current"], city);
                updateCards(data["daily"]);
            });
        }
        else {
            alert("Invalid city");
        }
    }).catch(function(error) {
        alert("Unable to reach Open Weather API.");
    });
};

// change the DOM elements for today's weather
var updateToday = function(data, city) {
    console.log(data);
    $("#city").text(city + " (" + moment().format("MM/DD/YYYY") + ")");
    $("#temp").text(data["temp"]);
    $("#wind").text(data["wind_speed"]);
    $("#humidity").text(data["humidity"]);

    var uv = data["uvi"];
    $("#uv").text(uv);
    if(uv < 3) {
        $("#uv").addClass("bg-success text-white");
    }
    else if(uv < 6) {
        $("#uv").addClass("bg-warning");
    }
    else {
        $("#uv").addClass("bg-danger text-white");
    }

    $("#today-icon").attr("src", "http://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png");
};

// create the cards for the 5 day forecast
var updateCards = function(data) {
    console.log(data);
    for(var i = 1; i <= 5; i++) {
        var currentWeather = data[i];

        var newDay = $("<div></div>");
        newDay.addClass("bg-secondary text-white m-2 p-2");

        var titleEl = $("<h5></h5>").text(moment().add(i, "days").format("MM/DD/YYYY"));

        var imgEl = $("<img></img>");
        imgEl.attr("src", "http://openweathermap.org/img/wn/" + currentWeather["weather"][0]["icon"] + "@2x.png");
        imgEl.attr("height", "30px");

        var tempEl = $("<p></p>");
        tempEl.text("Temp: " + currentWeather["temp"]["day"] + "°F");

        var windEl = $("<p></p>");
        windEl.text("Wind: " + currentWeather["wind_speed"] + "MPH");

        var humEl = $("<p></p>");
        humEl.text("Humidity: " + currentWeather["humidity"] + "%");

        newDay.append(titleEl);
        newDay.append(imgEl);
        newDay.append(tempEl);
        newDay.append(windEl);
        newDay.append(humEl);
        $("#five-day").append(newDay);
    }
};

// event handler for search button
var searchCity = function(event) {
    $("#five-day").empty();
    getCityCoords($("#search").val());
    $("#search").val("");
};

$("#submit").click(searchCity);