// constants
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const cityEl = document.querySelector('.city');



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








// Invoking
// Date once on load/reload
dateEl.textContent = getDate();

// Time every second
setInterval(() => {
  timeEl.textContent = getTime();
}, 1000);