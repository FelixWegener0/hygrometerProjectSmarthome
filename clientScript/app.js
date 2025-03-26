const { WindowsToaster } = require('node-notifier');
const path = require('path');

const notifier = new WindowsToaster();

console.log(`${new Date()} - Starting client application`);

const token = process.env.BACKEND_TOKEN || '';
const timeoutMinutes =  process.env.TIMEOUTMINUTES || 10;
const url = process.env.SERVER_URL || '';
const triggerHumid = process.env.TRIGGER_HUMIDITY || 60;

function sendNotification(title, message) {
    console.log(`${new Date()} - Send notification with ${title} ; ${message}`);

    notifier.notify({
        title: title,
        message: message,
        icon: path.join(__dirname, 'icon.png'),
        sound: true,
        wait: false
    }, (err, res) => {
        if (err) {
            console.log('error: ', err)
        } else {
            console.log('responce: ', res)
        }
    });
}

async function getLatestRoomData(room) {
    try {
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
    } catch (e) {
        console.log(`${new Date()} - Exception while fetching data: ${e}`);
    }
}

async function check() {
    console.log(`${new Date()} - Checking data from the Api`);
    const rooms = ["badezimmer", "wohnzimmer", "schlafzimmer"];

    for(let i = 0; i < rooms.length; i++) {
        let data = await getLatestRoomData(rooms[i]);

        if (data.humidity > triggerHumid) {
            sendNotification('SmartHome Warnung', `Feuchtigkeit in Raum ${rooms[i]} liegt bei ${data.humidity}%`)
        }
    }
}

setInterval(() => {
    check();
}, timeoutMinutes * 60 * 1000)
