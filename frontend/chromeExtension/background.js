const token = "6d22911e-a249-4a33-9d3a-d4be567cea3d";

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

function showNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "API Warnung",
        message: message
    });
}

async function checkApi() {
    const rooms = ["badezimmer", "wohnzimmer", "schlafzimmer"];

    for (const room of rooms) {
        let data = await getLatestRoomData(room);
        if (data.humidity > 60) {
            showNotification(`Der Raum ${room} hat eine humidity von ${data.humidity}%`);
        }
    }

}

chrome.alarms.create("HumidityCheck", { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "HumidityCheck") {
        checkApi();
    }
});
