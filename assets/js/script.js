var api_key = "76b06c931c557cfae2687140ea5b8f81";

var getCityCoords = function(city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + api_key).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                getWeather(data[0]["lat"], data[0]["lon"]);
            });
        }
        else {
            alert("Invalid city");
        }
    }).catch(function(error) {
        alert("Unable to reach Open Weather API.");
    });
};

var getWeather = function(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + api_key).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                updateToday(data["daily"][0]);
            });
        }
        else {
            alert("Invalid city");
        }
    }).catch(function(error) {
        alert("Unable to reach Open Weather API.");
    });
};

var updateToday = function(data) {
    console.log(data);
};

var updateCards = function(data) {

};