// Api Key from Open Weather
const apiKey = "01a355210612ff0c5d932867b8ea72b0";

let searchBox = document.querySelector(".search-container input");
let searchBtn = document.querySelector(".search-container button");
let result = document.getElementById("result");
let weatherIcon = document.getElementById("weather");
//change background
let body = document.body;

//Function to fetch weather details form api
let getWeather = () => {
    let cityValue = searchBox.value;

    //If input field empty
    if (cityValue.length == 0) {
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
                    body.style.background = `linear-gradient(135deg, #A4C0D4, #517EED)`;
                }
                else if (data.weather[0].main == "Snow") {
                    weatherIcon.innerHTML = `
                    <img src="images/snow.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #A4C0D4, #517EED)`;
                }
                else {
                    weatherIcon.innerHTML = `
                    <img src="images/mist.png" class="weather-icon">`;
                    body.style.background = `linear-gradient(135deg, #68A5D0, #405A9C)`;
                }

                result.innerHTML = `
                    <h4>${data.weather[0].description}</h4>
                    <h1>${Math.round(data.main.temp)}°C</h1>
                    <h2>${data.name}</h2>
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
searchBtn.addEventListener("click", getWeather);

//window.addEventListener("load", getWeather);