const api = {
    key: "330ac5ffe048b9f97e835489ad74ed8e",
    baseurl: "https://api.openweathermap.org/data/2.5/",
};
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);
function setQuery(e) {
    if (e.keyCode == 13) {
        getResult(searchBox.value);
        console.log(searchBox.value);
    }
}
function getResult(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metrics&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);
    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp-273.15)}<span>°C</span>`;
    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min-273.15)}°C / ${Math.round(weather.main.temp_max-273.15)}°C`;
}
function dateBuilder(o) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novomber', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[o.getDay()];
    let date = o.getDate();
    let month = months[o.getMonth()];
    let year = o.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}