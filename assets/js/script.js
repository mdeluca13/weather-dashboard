// https://api.openweathermap.org/data/2.5/forecast?lat=45.4215&lon=75.6972&appid=8e6644460f79289a6c57818a06a12a8d
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=8e6644460f79289a6c57818a06a12a8d
//'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8e6644460f79289a6c57818a06a12a8d'
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=efca5b156605df37fb4cc956b882392d
var latLonURL = 'http://api.openweathermap.org/geo/1.0/direct?';
var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?';
var apiid = '8e6644460f79289a6c57818a06a12a8d';
var cityInput = $('#city-input');
var searchBtn = $('#search-btn');
var localStorageData;

searchBtn.on('click', function () {
    console.log(cityInput.val());
});

// fetch(latLonURL, {
//     q: 'Ottawa,CA',
//     appid: '8e6644460f79289a6c57818a06a12a8d',
// })
//     .then (function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });


// fetch lat and lon first
// then get forecast
function getLatLon () {
    fetch(latLonURL, 
        {
        q: 'London',
        appid: apiid,
        limit: 5,
    })
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
};
getLatLon();