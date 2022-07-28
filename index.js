// constants
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');



// Date & Time funcs
const getTime = () => {
  let now = new Date();
  let h = now.getHours().toLocaleString();
  let m = now.getMinutes().toLocaleString();
  let s = now.getSeconds().toLocaleString();

  return `${h}:${m}:${s}`;
}

const getDate = () => {
  let now = new Date();
  let options = {

    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',

  };

  return now.toLocaleString("ru", options);
}








// Invoking
// Date once on load/reload
dateEl.innerHTML = getDate();

// Time every second
setInterval(() => {
  timeEl.innerHTML = getTime();
}, 1000);