// constants
const timeEl   = document.querySelector('.time');
const dateEl   = document.querySelector('.date');
const cityEl   = document.querySelector('.city');
const greetEl  = document.querySelector('.greeting');
const nameEl   = document.querySelector('.name');
const LS       = window.localStorage;



// Date & Time getters
const getTime = () => {
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

const setGreeting = () => {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let properGreeting = '';

  if (h > 6 && h < 12 && m < 59) {
    properGreeting = 'Goog morning';
  } else if (h > 12 && h < 17 && m < 59) {
    properGreeting = 'Good afternoon';
  } else if (h > 18 && h < 25 && m < 59) {
    properGreeting = 'Good evening';
  } else if (h > 0 && h < 6 && m < 59) {
    properGreeting = 'Good night';
  } 

  return properGreeting;
}





// Time every second
setInterval(() => {
  timeEl.textContent = getTime();
}, 1000);

// Setting proper time-of-day greeting every minute
setInterval(() => {
  greetEl.textContent = setGreeting();
}, 60000);

// Setiing date(), greeting, loading username 
window.addEventListener('load', () => {
    nameEl.value = LS.getItem('name')
    greetEl.textContent = setGreeting();
    dateEl.textContent = getDate();
})

// Saving username
nameEl.addEventListener('input', () => {
  LS.setItem('name', nameEl.value); 
})