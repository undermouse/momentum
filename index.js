// constants
const timeEl   = document.querySelector('.time');
const dateEl   = document.querySelector('.date');
const cityEl   = document.querySelector('.city');
const greetEl  = document.querySelector('.greeting');
const nameEl   = document.querySelector('.name');
const slideNext= document.querySelector('.slide-next');
const slidePrev= document.querySelector('.slide-prev');;
const LS       = window.localStorage;
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

// Additional funcs
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let num = Math.floor(Math.random() * (max - min)) + min;
  if (num < 10) {
    return String(num).padStart(2, 0);
  }
  return String(num);
} // min 1, max 20

let randomNum  = getRandomInt(1, 20);


// Date, Time, greeting funcs
const getTimeOfDay = () => {
  let now = new Date();
  return now.toLocaleTimeString();
}

const getDate = () => {
  let now = new Date();
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  
  return now.toLocaleString("ru-RU", options);
}

const getTimeName = () => {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let timeName = '';

  if (h > 6 && h < 12 && m < 59) {
    timeName = 'morning';
  } else if (h > 12 && h < 17 && m < 59) {
    timeName = 'afternoon';
  } else if (h > 18 && h < 25 && m < 59) {
    timeName = 'evening';
  } else if (h > 0 && h < 6 && m < 59) {
    timeName = 'night';
  } 

  return timeName;
}

// Background 
const setBg = (bgNum) => {
  let timeOfDay = getTimeName();
  let bgUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  let body = document.getElementById('body');
  const img = new Image();
  img.src = bgUrl;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  }
}

const getSlideNext = () => {
  randomNum = Number(randomNum);
  if (randomNum < 20) {
    randomNum += 1;
  } else {
    randomNum = 1;
  }
  let nextBg = String(randomNum).padStart(2, 0);
  setBg(nextBg);
};

const getSlidePrev = () => {
  randomNum = Number(randomNum);
  if (randomNum > 1) {
    randomNum -= 1;
  } else {
    randomNum = 20;
  }
  let prevBg = String(randomNum).padStart(2, 0);
  setBg(prevBg);
};

async function getWeather(city) {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=c20745821d8e3b80497a536dcc27c903&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}




// Time every second
setInterval(() => {
  timeEl.textContent = getTimeOfDay();
}, 1000);

// Setting proper time-of-day greeting every minute
setInterval(() => {
  greetEl.textContent = `Good ${getTimeName()}, `;
}, 60000);

// Setiing date(), greeting, loading username 
window.addEventListener('load', () => {
    nameEl.value = `${LS.getItem('name')}!`
    greetEl.textContent = `Good ${getTimeName()}, `;
    dateEl.textContent = getDate();
    timeEl.textContent = getTimeOfDay();
    getWeather('Минск');
    cityEl.value = 'Минск';
    setBg(randomNum);
  }); 
  

// Saving username
nameEl.addEventListener('input', () => {
  LS.setItem('name', nameEl.value); 
})

cityEl.addEventListener('change', () => {
  getWeather(cityEl.value);
})

// Slides switchers
slideNext.addEventListener('click', () => {
  getSlideNext();
})

slidePrev.addEventListener('click', () => {
  getSlidePrev();
})