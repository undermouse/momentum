// constants
const settings = document.querySelector('.settings-ico');
const settPopup = document.querySelector('.settings-popup');
const settListItem = document.querySelectorAll('.settings-list-item');
const flag = document.querySelector('.flag');
const timeEl   = document.querySelector('.time');
const dateEl   = document.querySelector('.date');
const cityEl   = document.querySelector('.city');
const greetEl  = document.querySelector('.greeting');
const greetCont  = document.querySelector('.greeting-container');
const nameEl   = document.querySelector('.name');
const slideNext= document.querySelector('.slide-next');
const slidePrev= document.querySelector('.slide-prev');;
const LS       = window.localStorage;
const quoteT   = document.querySelector('.quote');
const quoteA   = document.querySelector('.author');
const weather = document.querySelector('.weather');
const changeQuote = document.querySelector('.change-quote');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const player = document.querySelector('.player');
const playListUl = document.querySelector('.play-list');
const selectedSong = document.querySelector('.play-item');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playBtn  = document.getElementById('play-btn');
const footerCont = document.querySelector('.footer-container');
let isPlay = false;
let playNum = 0;

// Base 
const getUserLang = () => { 
  let navLang = navigator.language.slice(0, 2);
  return navLang;
}

const checkLangInLocalStorage = () => {
  let userLang = '';
  if (LS.getItem('lang') !== null) {
    userLang = LS.getItem('lang');
  } else {
    userLang = getUserLang();
  };
  return userLang;
}

let userLang = checkLangInLocalStorage();

const setUserFlag = (lang) => {
  if (lang === 'ru') {
    flag.classList.remove('flag-en');
    flag.classList.add('flag-ru');
    LS.setItem('lang', 'ru');
  } else if (lang === 'en') {
    flag.classList.remove('flag-ru');
    flag.classList.add('flag-en');
    LS.setItem('lang', 'en');
  }
}

setUserFlag(userLang)

flag.onclick = () => {
  if (userLang === 'en') {
    userLang = 'ru';
    flag.classList.remove('flag-en');
    flag.classList.add('flag-ru');
    LS.setItem('lang', 'ru');
    if (!LS.getItem('city')) {
      LS.setItem('city', 'Washington');
    }
    getWeather(cityEl.value);
    getQuote(userLang);
    dateEl.textContent = getDate();
    greetEl.textContent = setGreeting();

  } else if (userLang === 'ru') {
    userLang = 'en';
    flag.classList.remove('flag-ru');
    flag.classList.add('flag-en');
    LS.setItem('lang', 'en');
    getWeather(cityEl.value);
    getQuote(userLang);
    dateEl.textContent = getDate();
    greetEl.textContent = setGreeting();
  }
}

import playList from "./playList.js";
// Audio Player
const audio = new Audio(); 
audio.src = playList[playNum].src;

const toggleAudio = () => {
  if (isPlay === false) { 
    audio.play();
    audio.currentTime = 0; 
    isPlay = true;
  } else {
    audio.pause();
    audio.currentTime = 0; 
    isPlay = false;
  }
}

playNextBtn.addEventListener('click', () => {
  audio.pause();
  if (playNum < playList.length - 1) {
    playNum += 1;
  } else {
    playNum = 1;
  }
  audio.src = playList[playNum].src;
  audio.play();
})


playPrevBtn.addEventListener('click', () => {
  playNum -= 1;
  audio.play();
})

playBtn.onclick = () => {
   toggleAudio();
   playBtn.classList.toggle('pause');
}

function createPlayList() {
        playList.forEach(function (el) {
            const li = document.createElement('li');
            li.classList.add('play-item');
            li.innerHTML = el.title;
            playListUl.append(li);
        }
    )
}

createPlayList();

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
  
  if (userLang === 'ru') {
    return now.toLocaleString("ru-RU", options);
  } else {
    return now.toLocaleString("en-US", options);
  }
}

const getTimeName = () => {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let timeName = '';

  if (h > 6 && h < 12 && m <= 59) {
    timeName = 'morning';
  } else if (h >= 12 && h < 17 && m <= 59) {
    timeName = 'afternoon';
  } else if (h >= 18 && h < 25 && m <= 59) {
    timeName = 'evening';
  } else if (h >= 0 &&  h < 6 && m <= 59) {
    timeName = 'night';
  } 
  
  return timeName;
}

const setGreeting = () => {

  const greet = getTimeName();
  if (userLang === 'ru') {
    switch (greet) {
      case 'morning':
        return 'Доброе утро, '
        break;
      case 'afternoon':
        return 'Добрый день, '
        break;
      case 'evening':
        return 'Добрый вечер, '
        break;
      case 'night':
        return 'Доброй ночи, '
        break;
    }
  } else {
    return `Good ${greet}, `
  }
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

// Weather widget
async function getWeather(city) {  
  const lang = userLang;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=c20745821d8e3b80497a536dcc27c903&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

// Quotes widget
async function getQuote(lang) {  
  const quotes = `./quotes/quotes_${lang}.json`;
  
  const res = await fetch(quotes);
  const data = await res.json(); 
  
  let randomQuoteNum = Number(getRandomInt(1, data.length));
  

  quoteT.textContent = (data[randomQuoteNum].text);
  quoteA.textContent = (data[randomQuoteNum].author);
  
}

// Settings
const loadOnlyVisibleStuff = () => {
  console.log(LS);
  
  settListItem.forEach((el) => {
    let blockToHide = document.getElementById(el.id);
    if (LS.getItem(`${el.id}`) !== null) {
      blockToHide.classList.remove('visible');
      blockToHide.classList.add('transparent');
      el.classList.add('line-through');
    };
  })
}

let isVisible = false;
settings.onclick = () => {
  setSettingsLang(userLang);
  if (!isVisible) {
    settPopup.classList.remove('transparent');
    settPopup.classList.add('visible');
    isVisible = true;
  } else {
    settPopup.classList.remove('visible');
    settPopup.classList.add('transparent');
    isVisible = false;
  }
}

document.querySelector('.main').onclick = () => {
  settPopup.classList.remove('visible');
  settPopup.classList.add('transparent');
} 
document.querySelector('.header').onclick = () => {
  settPopup.classList.remove('visible');
  settPopup.classList.add('transparent');
}
document.querySelector('.footer').onclick = () => {
  settPopup.classList.remove('visible');
  settPopup.classList.add('transparent');
}



let blockVisible = true;
settListItem.forEach((el) => {
  el.onclick = () => {
    let blockToHide = document.getElementById(el.id);


    if (blockVisible) {

      blockToHide.classList.remove('visible');
      blockToHide.classList.add('transparent')
      el.classList.add('line-through');
      LS.setItem(`${el.id}`, 'hidden');
      blockVisible = false;

    } else {

      blockToHide.classList.remove('transparent');
      blockToHide.classList.add('visible')
      el.classList.remove('line-through');
      LS.removeItem(`${el.id}`, 'hidden');
      blockVisible = true;
    }  
    console.log(LS) 
  }

})



const setSettingsLang = (lang) => {

  if (lang === 'ru') {
    document.querySelector('#settHead').textContent = 'Клик - скрыть';
    document.querySelector('#playerText').textContent = 'Плеер';
    document.querySelector('#weatherText').textContent = 'Погода';
    document.querySelector('#clockText').textContent = 'Часы';
    document.querySelector('#dateText').textContent = 'Дата';
    document.querySelector('#greetingText').textContent = 'Приветствие';
    document.querySelector('#photo-heading').textContent = 'Источник обоев';
  }
}

const photoRadio = document.getElementById('photo-radio');
photoRadio.onchange = (e) => {
  console.log(e.target.id);
  
}




// Time every second
setInterval(() => {
  timeEl.textContent = getTimeOfDay();
}, 1000);

// Setting proper time-of-day greeting every minute
setInterval(() => {
  greetEl.textContent = setGreeting();
}, 60000);

// Setiing date(), greeting, loading username 
window.addEventListener('load', () => {
    nameEl.value = `${LS.getItem('name')}!`
    greetEl.textContent = setGreeting();
    dateEl.textContent = getDate();
    timeEl.textContent = getTimeOfDay();
    if (!LS.getItem('city')) {
      cityEl.value = 'Минск';
      getWeather('Минск');
    } else {
      cityEl.value = LS.getItem('city');
      getWeather(cityEl.value);
    }
    
    setBg(randomNum);
    getQuote(userLang);

    loadOnlyVisibleStuff();

  }); 
  

// Saving username
nameEl.addEventListener('input', () => {
  LS.setItem('name', nameEl.value);
})

cityEl.addEventListener('change', () => {
  getWeather(cityEl.value);
  LS.setItem('city', cityEl.value)
})

// Slides switchers
slideNext.addEventListener('click', () => {
  getSlideNext();
})

slidePrev.addEventListener('click', () => {
  getSlidePrev();
})

changeQuote.addEventListener('click', () => {
  getQuote(userLang);
})

const showRandImg = () => {
  let imgDiv = document.querySelector('.imgTemp');
  tempUrl = "https://source.unsplash.com/random/800x600";
  let template = '';
  template += `<div><img src="${tempUrl}"></div>`;
  imgDiv.innerHTML = template;
}