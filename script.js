const audio = document.getElementById('audioPlayer');
const nowPlaying = document.getElementById('nowPlaying');
const m3uUrl = "https://m3u.ch/pl/73fa55d4154a02a57ee31d6ec99947d7_3458172a87d84ee977943cdbf7c054d1.m3u";
let stations = [];
let currentStationIndex = 0;

async function fetchStations() {
    try {
        const response = await fetch(m3uUrl);
        const text = await response.text();
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF')) {
                let name = lines[i].split(',')[1]?.trim();
                let url = lines[i + 1]?.trim();
                if (name && url) {
                    stations.push({ name, url });
                }
            }
        }
        displayStations();
    } catch (error) {
        alert('Error fetching the station list.');
    }
}

function displayStations() {
    const list = document.getElementById('stationList');
    list.innerHTML = '';
    stations.forEach((station, index) => {
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.href = '#';
        link.textContent = station.name;
        link.onclick = (e) => {
            e.preventDefault();
            playStream(index);
        };
        li.appendChild(link);
        list.appendChild(li);
    });
}

function playStream(index) {
    currentStationIndex = index;
    audio.src = stations[index].url;
    nowPlaying.textContent = stations[index].name;
    audio.play();
}

window.onload = fetchStations;
