$(document).ready(function(){

    var citySearchedInput = $(".citySearched");
    var citySearchBtn = $(".searchCityBtn");
    var citySearches = $('.citySearches');
    var searchCityList = localStorage.getItem('city');
    var momentDate = moment().format('dddd, MMMM Do');
    var currentDate = $('.searchDate');
    
    

    

    citySearchBtn.click(function(){

        currentDate.text(momentDate);
        
        console.log(citySearchedInput);

        var currentCity = citySearchedInput[0].value;

        //searchCityList.push(currentCity)

       // console.log(searchCityList);

        //console.log(citySearches);
    
       // localStorage.setItem('city', JSON.stringify(searchCityList));

        //var storedCities = JSON.parse(localStorage.getItem('city'));

        // storedCities.forEach(city => {
        //     citySearches.append(` <li class="list-group-item ">${city}</li>`)
        // });
        showCurrentWeather(currentCity);


        //show5DayForecast(currentCity);

        
    });

});

function showCurrentWeather(city){

    debugger;

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e1d3f7a2819df21862189cf606302c7`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        $('.searchTemp .result').text(tempF.toFixed(2));
        $('.searchHumidity .result').text(response.main.humidity);
        $('.searchWindSpeed .result').text(response.wind.speed);

        

        var cityCordlat = response.coord.lat;
        var cityCordlon = response.coord.lon;

        calcUVIndex(cityCordlat, cityCordlon);

        show5DayForecast(cityCordlat, cityCordlon);
    });

}

function calcUVIndex(cordslat,cordslon){

    var queryURL =`http://api.openweathermap.org/data/2.5/uvi?appid=4e1d3f7a2819df21862189cf606302c7&lat=${cordslat}&lon=${cordslon}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);
        var currentDayUV = response.value;
        var searchUVIndex = $('.searchUVIndex .result');

        searchUVIndex.text(currentDayUV);

        if(currentDayUV < 4){

            searchUVIndex.attr("style","background: green;");

        }else if(currentDayUV > 4 && currentDayUV < 7){

            searchUVIndex.attr("style","background: yellow;");

        }else if(currentDayUV > 7){
            
            searchUVIndex.attr("style","background: red;");

        }
    });

}

function show5DayForecast(cordslat,cordslon){
    // var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4e1d3f7a2819df21862189cf606302c7`;

    var queryURL =`https://api.openweathermap.org/data/2.5/onecall?appid=4e1d3f7a2819df21862189cf606302c7&lat=${cordslat}&lon=${cordslon}`


    var dayCardsContainer = $('.dayCards');

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
    });

    // for(var i = 0; i < 5; i++){

    //     dayCardsContainer.append()
    // }
}