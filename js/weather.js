

const API_KEY = "695dd8e67136cb46a334770a0438cee8";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        console.log(data.name);
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        weather.innerText = data.weather[0].main;
        city.innerText = data.name;
    });
    console.log(url);
}
function onGeoErr() {
    alert("Can't find you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoErr);

