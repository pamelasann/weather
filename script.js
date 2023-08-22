// Api Key from Open Weather
const apiKey = "01a355210612ff0c5d932867b8ea72b0";

let searchInput = document.querySelector(".search-container input");
let searchBtn = document.querySelector(".search-container button");
let body = document.body;
let result = document.getElementById("result");
let weatherIcon = document.getElementById("weather");
let title = document.querySelector(".title-pointer");
let infoBtn = document.querySelector(".nav-wrapper button");
let infoText = document.querySelector(".information-text");

//Function to fetch weather details form api
let getWeather = () => {
    let cityValue = searchInput.value;

    //If input field empty
    if (cityValue.length == 0) {
        weatherIcon.innerHTML = `<img src="">`;
        result.innerHTML = `<h3>Please enter a city name</h3>`;
    }
    //If input field not empty
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((resp) => resp.json())
            //If city name is valid
            .then((data) => {

                if (data.weather[0].main == "Clear") {
                    weatherIcon.innerHTML = `
                    <img src="images/clear.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #62b8f5, #4475ef)`;
                }
                else if (data.weather[0].main == "Rain") {
                    weatherIcon.innerHTML = `
                    <img src="images/rain.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #A4C0D4, #2B3677)`;
                }
                else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.innerHTML = `
                    <img src="images/drizzle.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #71B8EB, #5F6B87)`;
                }
                else if (data.weather[0].main == "Clouds") {
                    weatherIcon.innerHTML = `
                    <img src="images/clouds.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #A4C0D4, #517EED)`;
                }
                else if (data.weather[0].main == "Thunderstorm") {
                    weatherIcon.innerHTML = `
                    <img src="images/thunderstorm.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #576E91, #29407B)`;
                }
                else if (data.weather[0].main == "Snow") {
                    weatherIcon.innerHTML = `
                    <img src="images/snow.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #BDC8D0, #6A93F8)`;
                }
                else {
                    weatherIcon.innerHTML = `
                    <img src="images/mist.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #68A5D0, #405A9C)`;
                }

                result.innerHTML = `
                    <h4>${data.weather[0].description}</h4>
                    <h1>${Math.round(data.main.temp)}°C</h1>
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <div class="details">
                        <div class="col">
                            <img src="images/humidity.png">
                            <div>
                                <p class="humidity">${data.main.humidity}%</p>
                                <h6>Humidity</h6>
                            </div>
                        </div>
                        <div class="col">
                            <img src="images/wind.png">
                            <div>
                                <p class="wind">${data.wind.speed} km/h</p>
                                <h6>Wind Speed</h6>
                            </div>
                        </div>
                    </div>
                `;
            })
            //If city name is not valid
            .catch(() => {
                weatherIcon.innerHTML = `<img src="">`;
                result.innerHTML = `<h3>City not found</h3>`;
            });
    }
};
//Enter key function to trigger getWeather
searchInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchBtn.click();
    }
});
//Title funtion, return to home
let loadHome = () => {
    location.reload();
};
//Show iformation function
let showInfo = () => {
    infoText.innerHTML = `
        <h1>Welcome to Weather & Lofi</h1>
        <p>Weather & Lofi lets you dive into the weather conditions all over the world while simultaneously enjoying and discovering new lofi music.</p>
        <p>Appreciate the diverse shifts between various weather patterns around the globe, including snowy days, rainy spells, and bright, clear skies.</p>
        <br>
        <p><b>Note:</b> for the moment take advantage of the city name autocomplete by only selecting popular city names for more accurate results. Before long, the bugs will be fixed.
        For more information, feel free to take a look over the repository.</p>
        <br>
        <p>Made with love by Pamela Sánchez <3</p>
    `;  
    document.addEventListener("click", (event) => {
        let clickedInfoBtn = event.target;
        do {
            if(clickedInfoBtn == infoBtn) {
                document.querySelector(".information-container").style.display = "block";
                return;
            }  
            clickedInfoBtn = clickedInfoBtn.parentNode;            
        } while (clickedInfoBtn);
        document.querySelector(".information-container").style.display = "none";
    });
};

searchBtn.addEventListener("click", getWeather);
title.addEventListener("click", loadHome);
infoBtn.addEventListener("click", showInfo);
//window.addEventListener("load", showInfo);