$(document).ready(function() {
    $('form').submit(function() {

        let app_id = "dfdf07498591176737fffe143b8bd7fc";
        let search_term = $("input[name='place']").val();
        let search_method = getSearchMethod(search_term);
        let url = `http://api.openweathermap.org/data/2.5/weather?${search_method}=${search_term}&APPID=${app_id}&units=imperial`

        $.get(url, function(res) {
            setBackgroundImg(res);
            let weather_header = $('#weatherDescriptionHeader');
            let temperature = $('#temperature');
            let humidity = $('#humidity');
            let wind_speed = $('#windSpeed');
            let city_header = $('#cityHeader');
            let weather_icon = $('#documentIconImg');

            weather_icon.src = 'http://openweathermap.org/img/w/'+res.weather[0].icon+'.png';
            let result_description = res.weather[0].description;
            weather_header.text(result_description.charAt(0).toUpperCase()+result_description.slice(1));
            temperature.html(Math.floor(res.main.temp)+'&#176');
            wind_speed.html('Winds at ' + Math.floor(res.wind.speed) + ' m/s');
            city_header.html(res.name);
            humidity.text('Humidity levels at '+res.main.humidity+'%');
            
            setPosition();
            $('#errorMessage').css('visibility','hidden');
        }, 'json')
        .catch(function(){
            $('#errorMessage').css('visibility','visible');
        });
        
        return false;
    });

    function getSearchMethod(search_term) {
        if(search_term.length == 5 && Number.parseInt(search_term)+'' == search_term)
            return 'zip';
        else 
            return 'q';
    }
    function setBackgroundImg(server_result) {
        switch(server_result.weather[0].main) {
            case 'Clear':
                $("body").css('background-image',"url('../images/clear.jpeg')");
                break;
            case 'Clouds':
                $("body").css('background-image',"url('../images/cloudy.jpeg')");
                break;
            case 'Rain':
            case 'Drizzle':
            case 'Mist':
                $("body").css('background-image',"url('../images/rain.jpeg')");
                break;
            case 'Thunderstorm':
                $("body").css('background-image',"url('../images/storm.jpeg')");
                break;
            case 'Snow':
                $("body").css('background-image',"url('../images/snow.jpeg')");
                break;
            default:
                $("body").css('background-image',"url('../images/default.jpeg')");
                break;
        }
    }
    function setPosition() {
        let weather_container = $('#weatherContainer');
        weather_container.css('visibility', 'visible');
        weather_container.css('left',`calc(50% - ${weather_container[0].clientWidth/2}px)`);
        weather_container.css('top',`calc(50% - ${weather_container[0].clientHeight/1.3}px)`);
    }
});