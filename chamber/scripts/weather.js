const apiKey = 'e8975bf2cd6a45dd55ec5132b7505e39';
const city = 'Tegucigalpa,hn';
const units = 'metric';

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather fetch failed');

        const data = await response.json();

        const current = data.list[0];
        document.querySelector('#weather .current-weather .temp').textContent = `${Math.round(current.main.temp)}°C`;
        document.querySelector('#weather .current-weather .desc').textContent = current.weather[0].description;

        for (let i = 1; i <= 3; i++) {
            const forecast = data.list[i*8];
            const dayElem = document.querySelector(`#day${i}`);
            const date = new Date(forecast.dt * 1000);
            const options = { weekday: 'short' };
            dayElem.querySelector('.day-name').textContent = date.toLocaleDateString('en-US', options);
            dayElem.querySelector('.day-temp').textContent = `${Math.round(forecast.main.temp)}°C`;
        }

    } catch (error) {
        console.error(error);
        document.querySelector('#weather .current-weather .desc').textContent = 'Unable to load weather';
    }
}

getWeather();