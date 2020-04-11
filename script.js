$(document).ready(function(){

    var citySearchedInput = $(".citySearched");
    var citySearchBtn = $(".searchCityBtn");
    var citySearches = $('.citySearches');
    var searchCityList = [];

    

    citySearchBtn.click(function(){
        
        console.log(citySearchedInput);

        searchCityList.push(citySearchedInput[0].value)

        console.log(searchCityList);

        console.log(citySearches);
    
        localStorage.setItem('city', JSON.stringify(searchCityList));

        var storedCities = JSON.parse(localStorage.getItem('city'));

        storedCities.forEach(city => {
            citySearches.append(` <li class="list-group-item ">${city}</li>`)
        });

    });

});

function showCurrentWeather(city){

}

function show5DayForecast(city){

}