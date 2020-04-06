//Select element
const container = document.querySelector('.container');
const noti = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const tempVal = document.querySelector('.temperature-value');
const tempDesc = document.querySelector('.temperature-description');
const loc = document.querySelector('.location');
const submit = document.querySelector('.submit')
const city = document.querySelector('.city')
const country = document.querySelector('.country')

//Define variables and key
const weather = {
  key1: {},
  key2: {},
  key3: {},
  key4: {},
  key5: {},
  key6: {},
  key7: {}
};

weather.unit = 'celsius';

const K = 273;
const key = '82005d27a116c2880c8f0fcb866998a0';

//Check if browser supports geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(success, fail);
} else {
  noti.style.display = 'block';
  container.style.height = '790px';
  noti.innerHTML = '<p>Browser does not support geolocation!</p>';
}

function success(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  getWeather(lat, lon);
}

//lat: 1.3896599030990173
//lon: 103.8941043007939

function fail(err) {
  noti.style.display = 'block';
  container.style.height = '790px';
  noti.innerHTML = `<p>${err.message}</p>`;
}

//https://api.openweathermap.org/data/2.5/forecast?lat=1.3896599030990173&lon=103.8941043007939&appid=82005d27a116c2880c8f0fcb866998a0

const today = new Date();
const todayDt = today.getTime()

//Request weather data from api
function getWeather(lat, lon) {
  const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

  axios
    .get(api)
    .then(res => {
      const apiD = res.data;
      let u = 1;
      for (let i = 0; i <= 8; i++) {
        const apiDate = apiD.list[i].dt_txt;
        const apiT = apiDate.replace(/-/g,'/');
        const apiDt = new Date(apiT).getTime();
        if (apiDt - todayDt >= 0) {
          weather[`key${u}`].dateTime = hourFormat(apiDate);
          weather[`key${u}`].temperature = Math.floor(
            apiD.list[i].main.temp - K
          );
          weather[`key${u}`].description = apiD.list[i].weather[0].description;
          weather[`key${u}`].iconId = apiD.list[i].weather[0].icon;
          weather[`key${u}`].country = apiD.city.country;
          weather[`key${u}`].city = apiD.city.name;
          u++;
        }
      }
    })
    .then(() => displayWeather());
}

function hourFormat(apiDate) {
  const hour = `${apiDate[11]}${apiDate[12]}`;
  switch (hour) {
    case '00':
      return '12 am';
      break;
    case '03':
      return '3 am';
      break;
    case '06':
      return '6 am';
      break;
    case '09':
      return '9 am';
      break;
    case '12':
      return '12 pm';
      break;
    case '15':
      return '3 pm';
      break;
    case '18':
      return '6 pm';
      break;
    case '21':
      return '9 pm';
  }
}

//Display weather data from variable to ui
function displayWeather() {
  icon.innerHTML = `<img src="./icons/${weather.key1.iconId}.png" />`;
  tempVal.innerHTML = `<p>${weather.key1.temperature}°<span>C</span></p>`;
  tempDesc.innerHTML = `<p>${weather.key1.description}</p>`;
  loc.innerHTML = `<p>${weather.key1.city}, ${weather.key1.country}</p>`;
  for (let i = 2; i < 7; i++) {
    const weatherIcon = weather[`key${i}`].iconId;
    const weatherTemp = weather[`key${i}`].temperature;
    document.querySelector(`.fc${i}`).querySelector('.dt').innerHTML =
      weather[`key${i}`].dateTime;
    document
      .querySelector(`.fc${i}`)
      .querySelector('img').src = `./icons/${weatherIcon}.png`;
    document.querySelector(`.fc${i}`).querySelector('.desc').innerHTML =
      weather[`key${i}`].description;
    document
      .querySelector(`.fc${i}`)
      .querySelector('.temp').innerHTML = `${weatherTemp}°<span>C</span>`;
  }
}

//C to F function
function CToF(C) {
  return Math.floor((C * 9) / 5 + 32);
}

//Check temp from C to F when clicked
tempVal.addEventListener('click', () => {
  if (weather.key1.temperature === undefined) return;

  if (weather.unit === 'celsius') {
    const fahrenheit = CToF(weather.key1.temperature);
    tempVal.innerHTML = `<p>${fahrenheit}°<span>F</span></p>`;
    weather.unit = 'fahrenheit';
    for (let i = 1; i < 6; i++) {
      const fah = CToF(weather[`key${i}`].temperature);
      document
        .querySelector(`.fc${i}`)
        .querySelector('.temp').innerHTML = `${fah}°<span>F</span>`;
    }
  } else {
    tempVal.innerHTML = `<p>${weather.key1.temperature}°<span>C</span></p>`;
    weather.unit = 'celsius';
    for (let i = 1; i < 6; i++) {
      const weatherTemp = weather[`key${i}`].temperature;
      document
        .querySelector(`.fc${i}`)
        .querySelector('.temp').innerHTML = `${weatherTemp}°<span>C</span>`;
    }
  }
});

//Action to get values to put in api
function whenSubmit() {
  const cityV = city.value
  const countryV = country.value.slice(-2)
  if (!cityV && !countryV) {
    return;
  } else {
    getWeatherwLoc(cityV, countryV)
    city.value = ''
    country.value = ''
  }
}

city.addEventListener('keyup', e => {
  if (city.value && e.keyCode === 13 || city.value && e.keyCode === 9) {
    e.preventDefault();
    country.focus();
  } else if (!city.value && e.keyCode === 13) {
    return;
  }
})

country.addEventListener('keyup', e => {
  if (city.value && e.keyCode === 13) {
    e.preventDefault();
    whenSubmit();
    city.focus();
  } else if (!city.value && e.keyCode === 13) {
    city.focus();
  }
})

 submit.addEventListener('click', e => {
  e.preventDefault();
   whenSubmit();
  })


 function getWeatherwLoc(cityV, countryV) {
  const api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityV},${countryV}&appid=${key}`;

  axios
    .get(api)
    .then(res => {
      if (res.data) {
          noti.style.display = 'none';
          container.style.height = '730px';
        }
      const apiD = res.data;
      let u = 1;
      for (let i = 0; i <= 8; i++) {
        const apiDate = apiD.list[i].dt_txt;
        const apiT = apiDate.replace(/-/g,'/');
        const apiDt = new Date(apiT).getTime();
        if (apiDt - todayDt >= 0) {
          weather[`key${u}`].dateTime = hourFormat(apiDate);
          weather[`key${u}`].temperature = Math.floor(
            apiD.list[i].main.temp - K
          );
          weather[`key${u}`].description = apiD.list[i].weather[0].description;
          weather[`key${u}`].iconId = apiD.list[i].weather[0].icon;
          weather[`key${u}`].country = apiD.city.country;
          weather[`key${u}`].city = apiD.city.name;
          u++;
        }
      }
    })
    .then(() => displayWeather())
    .catch(err => {
      noti.style.display = 'block';
      container.style.height = '790px';
      noti.innerHTML = `<p>Input information invalid! Please try again!</p>`
    })
}

