// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=8e6644460f79289a6c57818a06a12a8d
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=8e6644460f79289a6c57818a06a12a8d

var weatherURL = 'http://api.openweathermap.org/geo/1.0/direct';

fetch(weatherURL, {
    q: 'Ottawa',
    appid: '8e6644460f79289a6c57818a06a12a8d',
})
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });