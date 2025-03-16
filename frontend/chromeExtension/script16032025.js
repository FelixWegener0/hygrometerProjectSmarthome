const temperatureBadezimmer = document.getElementById('TemperatureBadezimmer');
const humidityBadezimmer = document.getElementById('HumidityBadezimmer');
const themperatureSchlafzimmer = document.getElementById('TemperatureSchlafzimmer');
const humiditySchlafzimmer = document.getElementById('HumiditySchlafzimmer');
const temperatureWohnzimmer = document.getElementById('TemperatureWohnzimmer');
const humidityWohnzimmer = document.getElementById('HumidityWohnzimmer');

const addBackendToken = document.getElementById('addBackendToken');
const getDataButton = document.getElementById('getDataButton');

const minuteTimer = 3;
let token = localStorage.getItem('token') || '';

async function getLatestRoomData(room) {
    const response = await fetch('https://felixwegener.dev/api/temp/findByRoomLatest', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        },
        method: 'POST',
        body: JSON.stringify({ "room": room })
    });
    return await response.json();
}

async function setData() {
    const dataBadezimmer = await getLatestRoomData("badezimmer");
    const dataSchlafzimmer = await getLatestRoomData("schlafzimmer");
    const dataWonzimmer = await getLatestRoomData("wohnzimmer");

    temperatureBadezimmer.innerHTML = `Temperature: ${dataBadezimmer.temperature}°C`;
    humidityBadezimmer.innerHTML = `Humidity: ${dataBadezimmer.humidity}%`;

    themperatureSchlafzimmer.innerHTML = `Temperature: ${dataSchlafzimmer.temperature}°C`;
    humiditySchlafzimmer.innerHTML = `Humidity: ${dataSchlafzimmer.humidity}%`;

    temperatureWohnzimmer.innerHTML = `Temperature: ${dataWonzimmer.temperature}°C`;
    humidityWohnzimmer.innerHTML = `Humidity: ${dataWonzimmer.humidity}%`;
}

function addNewBackendToken() {
    const value = prompt("token");

    token = value;
    setData();
    localStorage.setItem('token', value);
}

setData();

setInterval(() => {
    setData();
}, minuteTimer * 60 * 1000)

getDataButton.addEventListener('click', () => setData());
addBackendToken.addEventListener('click', () => addNewBackendToken());
