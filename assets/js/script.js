// declaring variables
var cityInput = $('#city-input');
var searchBtn = $('#search-btn');
var searchList = $('#search-list');
var createButton;
var localStorageLength;
var latitude;
var longitude;

//Checking if local storage is empty or display previous searches 
if (localStorage.length === 0) {
    console.log('empty');
}
else {
    for (var i = 0; i < localStorage.length; i++) {
        createButton = $("<button class='btn btn-secondary prev-search'>" + JSON.parse(localStorage.getItem(i)) + "</button>")
        searchList.append(createButton); 
    }
}

//search button on click function to create the previous search buttons, calling getWeather and Saving to local storage
searchBtn.on('click', function () {
    if (cityInput.val() === '') {
        console.log('no text')
    }
    else {
        createButton = $("<button class='btn btn-secondary prev-search'>" + cityInput.val() + "</button>")
        searchList.append(createButton);
        getWeather(cityInput.val());
        saveLastCity();
    }
});

//click listener on previous searches to search that city
$('.prev-search').click(function() {
    getWeather($(this).text());
    console.log($(this).text());
})

// get weather function
function getWeather(input) {

    //fetching lat and long for weather search
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + input + '&limit=1&appid=8e6644460f79289a6c57818a06a12a8d')

    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        latitude = data[0].lat;
        longitude = data[0].lon;

        //fetching current weather data from lat and long and displaying
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=8e6644460f79289a6c57818a06a12a8d')
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#city-date').text(input + dayjs().format(' (MM/DD/YYYY)'));
            $('#day-icon').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
            $('#day-icon').attr('alt', data.weather[0].main + ' weather icon');
            $('#day-temp').text('Temp: ' + data.main.temp + '°C');
            $('#day-wind').text('Temp: ' + data.wind.speed + ' km/h');
            $('#day-humidity').text('Temp: ' + data.main.humidity + '%');
        })    
        //fetching 5 day forecast weather data from lat and long and displaying 
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=8e6644460f79289a6c57818a06a12a8d')
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            var filteredData = data.list.filter(element => element.dt_txt.includes('12:00:00'))
            console.log(filteredData)
            for (i = 0; i < 5; i++) {
                var date = filteredData[i].dt_txt
                var newDate = date.replace(' 12:00:00', '');
                var newDateFormat = dayjs(newDate).format('MM/DD/YYYY')
                $('#day-' + (i+1) + '-date').text(newDateFormat);
                $('#day-' + (i+1) + '-icon').attr('src', 'https://openweathermap.org/img/wn/' + filteredData[i].weather[0].icon + '.png');
                $('#day-' + (i+1) + '-icon').attr('alt', filteredData[i].weather[0].main + ' weather icon');
                $('#day-' + (i+1) + '-temp').text('Temp: ' + filteredData[i].main.temp + '°C');
                $('#day-' + (i+1) + '-wind').text('Temp: ' + filteredData[i].wind.speed + ' km/h');
                $('#day-' + (i+1) + '-humidity').text('Temp: ' + filteredData[i].main.humidity + '%');
            }        
        });
    });
}

function saveLastCity() {
    localStorageLength = localStorage.length;
    localStorage.setItem(localStorageLength, JSON.stringify(cityInput.val()));
}
