var api_key = "76b06c931c557cfae2687140ea5b8f81";

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

var getWeather = function(lat, lon, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + api_key).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                updateToday(data["current"], city);
            });
        }
        else {
            alert("Invalid city");
        }
    }).catch(function(error) {
        alert("Unable to reach Open Weather API.");
    });
};

var updateToday = function(data, city) {
    console.log(data);
    $("#city").text(city + " (" + moment().format("MM/DD/YYYY") + ")");
    $("#temp").text(data["temp"]);
    $("#wind").text(data["wind_speed"]);
    $("#humidity").text(data["humidity"]);

    var uv = data["uvi"];
    $("#uv").text(uv);
    console.log(uv);
    if(uv < 3) {
        $("#uv").addClass("bg-success text-white");
    }
    else if(uv < 6) {
        $("#uv").addClass("bg-warning");
    }
    else {
        $("#uv").addClass("bg-danger text-white");
    }
};

var updateCards = function(data) {

};

var searchCity = function(event) {
    getCityCoords($("#search").val());
};

$("#submit").click(searchCity);