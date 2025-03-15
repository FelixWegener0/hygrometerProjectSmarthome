const temperatureBadezimmer = document.getElementById('TemperatureBadezimmer');
const humidityBadezimmer = document.getElementById('HumidityBadezimmer');
const themperatureSchlafzimmer = document.getElementById('TemperatureSchlafzimmer');
const humiditySchlafzimmer = document.getElementById('HumiditySchlafzimmer');
const getDataButton = document.getElementById('getDataButton');

const minuteTimer = 3;
const token = localStorage.getItem('token') || '';

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

    temperatureBadezimmer.innerHTML = `Temperature: ${dataBadezimmer.temperature}°C`;
    humidityBadezimmer.innerHTML = `Humidity: ${dataBadezimmer.humidity}%`;

    themperatureSchlafzimmer.innerHTML = `Temperature: ${dataSchlafzimmer.temperature}°C`;
    humiditySchlafzimmer.innerHTML = `Humidity:${dataSchlafzimmer.humidity}%`;
}

setData();
getDataButton.addEventListener('click', () => setData());
