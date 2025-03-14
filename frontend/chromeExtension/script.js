
const header1 = document.getElementById('header1');
const minuteTimer = 1;

async function getLatestEntry() {
    const response = await fetch('https://felixwegener.dev/api/temp/latest')
    const data = await response.json();
    return data;
}

async function getAllData() {
    const response = await fetch('https://felixwegener.dev/api/temp')
    const data = await response.json();
    return data;
}

async function setData() {
    const latestEntry = await getLatestEntry();
    console.log(latestEntry)
    header1.innerHTML = `${latestEntry.room} current temperature: ${latestEntry.temperature}°C and ${latestEntry.humidity}% humid`;
}

setInterval(() => {
    setData();
}, minuteTimer * 60 * 1000);
