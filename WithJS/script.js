let app_id = "dfdf07498591176737fffe143b8bd7fc";
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length == 5 && Number.parseInt(searchTerm)+'' == searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${app_id}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        console.log(result.cod);
        if (result.cod == 200)
            init(result);
    }).catch( function(){
        console.log('failure');
    }
    );
}

function init(resultFromServer) {
    switch(resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("../images/clear.jpeg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("../images/cloudy.jpeg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("../images/rain.jpeg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("../images/storm.jpeg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("../images/snow.jpeg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("../images/default.jpeg")';
            break;
    }

    let weather_header = document.getElementById('weatherDescriptionHeader');
    let temperature = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let wind_speed = document.getElementById('windSpeed');
    let city_header = document.getElementById('cityHeader');
    let weather_icon = document.getElementById('documentIconImg');

    weather_icon.src = 'http://openweathermap.org/img/w/'+resultFromServer.weather[0].icon+'.png';
    let result_description = resultFromServer.weather[0].description;
    weather_header.innerText = result_description.charAt(0).toUpperCase()+result_description.slice(1);
    temperature.innerHTML = Math.floor(resultFromServer.main.temp)+'&#176';
    wind_speed.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    city_header.innerHTML = resultFromServer.name;
    humidity.innerText = 'Humidity levels at '+resultFromServer.main.humidity+'%';

    setPosition();
}
function setPosition() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weaatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weaatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}
document.getElementById('searchBtn').addEventListener('click',()=> {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})