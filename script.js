// Api Key from Open Weather
const apiKey = "01a355210612ff0c5d932867b8ea72b0";

let searchBox = document.querySelector(".search-container input");
let searchBtn = document.querySelector(".search-container button");
let result = document.getElementById("result");
let weatherIcon = document.getElementById("weather");

//Function to fetch weather details form api
let getWeather = () => {
    let cityValue = searchBox.value;

    //If input field empty
    if (cityValue.length == 0) {
        result.innerHTML = `<h4>Please enter a city name</h4>`;
    }
    //If input field not empty
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((resp) => resp.json())
            //If city name is valid
            .then((data) => {
                console.log(data);

                if (data.weather[0].main == "Clear") {
                    weatherIcon.innerHTML = `
                    <img src="images/clear.png" class="weather-icon">`;
                }
                else if (data.weather[0].main == "Rain") {
                    weatherIcon.innerHTML = `
                    <img src="images/rain.png" class="weather-icon">`;
                }
                else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.innerHTML = `
                    <img src="images/drizzle.png" class="weather-icon">`;
                }
                else if (data.weather[0].main == "Mist") {
                    weatherIcon.innerHTML = `
                    <img src="images/mist.png" class="weather-icon">`;
                }
                else {
                    weatherIcon.innerHTML = `
                    <img src="images/clouds.png" class="weather-icon">`;
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
                result.innerHTML = `<h4>City not found</h4>`;
            });
    }
};
searchBtn.addEventListener("click", getWeather);

//window.addEventListener("load", getWeather);