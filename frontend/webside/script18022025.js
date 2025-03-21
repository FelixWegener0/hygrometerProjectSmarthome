const temperatureBathroom = document.getElementById('TemperatureBadezimmer');
const humidityBathroom = document.getElementById('HumidityBadezimmer');
const themperatureSchlafzimmer = document.getElementById('TemperatureSchlafzimmer');
const humiditySchlafzimmer = document.getElementById('HumiditySchlafzimmer');
const temperatureWohnzimmer = document.getElementById('TemperatureWohnzimmer');
const humidityWohnzimmer = document.getElementById('HumidityWohnzimmer');
const timeBadezimmer = document.getElementById('timeBadezimmer');
const timeSchlafzimmer = document.getElementById('timeSchlafzimmer');
const timeWohnzimmer = document.getElementById('timeWohnzimmer');
const totalServerEntrys = document.getElementById('totalServerEntrys');
const lastDataPull = document.getElementById('lastDataPull');

const addBackendToken = document.getElementById('addBackendToken');
const getDataButton = document.getElementById('getDataButton');

const minuteTimer = 1;
let count = 0;
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

async function getTotalAmountOfDbEntrys() {
    const response = await fetch('https://felixwegener.dev/api/temp/amount', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        },
        method: 'GET',
    });
    return await response.json();
}

function setInnerHtml(tempElement, humidelement, timeElement, data) {
    tempElement.innerHTML = `Temperature: ${data.temperature}°C`;
    humidelement.innerHTML = `Humidity: ${data.humidity}%`;
    timeElement.innerHTML = `created: ${formatDate(data.createdAt)}`;
}

async function setData() {
    setInnerHtml(temperatureBathroom, humidityBathroom, timeBadezimmer, await getLatestRoomData("badezimmer"));
    setInnerHtml(themperatureSchlafzimmer, humiditySchlafzimmer, timeSchlafzimmer, await getLatestRoomData("schlafzimmer"));
    setInnerHtml(temperatureWohnzimmer, humidityWohnzimmer, timeWohnzimmer, await getLatestRoomData("wohnzimmer"));

    totalServerEntrys.innerHTML = `BD entry's: ${await getTotalAmountOfDbEntrys()}`;
    lastDataPull.innerHTML = `last data pull: ${formatDate(new Date())}`
}

function addNewBackendToken() {
    const value = prompt("token");

    token = value;
    setData();
    localStorage.setItem('token', value);
}

function format(value) {
    if (value < 10) {
        return `0${value}`;
    } else {
        return value;
    }
}

function formatDate(valueString) {
    let date = new Date(valueString);

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return `${format(hour)}:${format(minutes)}:${format(seconds)}`;
}

setData();

setInterval(() => {
    setData();
}, minuteTimer * 60 * 1000)

getDataButton.addEventListener('click', () => setData());
addBackendToken.addEventListener('click', () => addNewBackendToken());
