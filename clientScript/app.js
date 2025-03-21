const notifier = require('node-notifier');
const path = require('path');

console.log('starting client application')

const token = process.env.BACKEND_TOKEN || '';
const timeoutMinutes =  process.env.TIMEOUTMINUTES || 10;
const url = process.env.SERVER_URL || '';

function sendNotification(title, message) {
    notifier.notify({
        title: title,
        message: message,
        icon: path.join(__dirname, 'icon.png'),
        sound: true,
        wait: false
    });
}

async function getLatestRoomData(room) {
    const response = await fetch(url, {
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

async function check() {
    console.log('checking data from the Api')
    const rooms = ["badezimmer", "wohnzimmer", "schlafzimmer"];

    for(let i = 0; i < rooms.length; i++) {
        let data = await getLatestRoomData(rooms[i]);

        if (data.humidity > 60) {
            sendNotification('SmartHome Warnung', `Feuchtigkeit in Raum ${rooms[i]} liegt bei ${data.humidity}`)
        }
    }
}

setInterval(() => {
    check();
}, timeoutMinutes * 60 * 1000)
