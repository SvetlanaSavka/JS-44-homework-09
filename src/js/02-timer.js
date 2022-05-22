//Создаем объект:
/* const timer = {
  start() {
    const startTime = Date.now(); // хотим сохранить текущее время, время старта

    setInterval(() => {
      // во время вызова старт запускаем интервал, который запустит функцию каждую секунду
      // мы можем получить время на момент вызова функции
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const { hours, mins, secs } = getTimeComponents(deltaTime);
      //console.log('start -> currentTime', currentTime);

      //console.log(timeComponents);
      //console.log(`${hours}:${mins}:${secs}`);

      console.log(
        `${pad(new Date(deltaTime).getUTCHours())}:${pad(new Date(deltaTime).getMinutes())}:${pad(
          new Date(deltaTime).getSeconds(),
        )}`,
      );
    }, 1000);
  },
};

timer.start();

//Метод pad, принимает число, приводит к строке и добавляет в начало "0" если число меньше 2-х знаков

function pad(value) {
  return String(value).padStart(2, '0');//возьми строку и добавь слева два "00" // 1 -> 01
}

//Эта ф-я берет кол-во милисекунд и считает сколько в них влeзит часов,минут,секунд
// Адская капипаста со стека

function getTimeComponents(time) {
  const hours = pad(Math.floor((time % (1000 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 24)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60 * 24)) / 1000));

  return { hours, mins, secs };
} */

//flatpickr('input#datetime-picker', options);

/* const options = {
  enableTime: true, //Включает выбор времени
  time_24hr: true, //Отображает средство выбора времени в 24-часовом режиме
  defaultDate: new Date(), //Устанавливает начальную выбранную дату
  minuteIncrement: 1, //Регулирует шаг ввода минут (включая прокрутку)
  onClose(selectedDates) {
    //Функция(и) для запуска при каждом закрытии календаря.
    //selectedDates массив выбранных дат
    /* const currentTime = options.defaultDate.getTime();
    const selectedTime = selectedDates[0].getTime();
    if (selectedDates > currentTime) {
      startBtn.disable = false; //Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
    } else {
      window.alert('Please choose a date in the future'); //Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
    }
  },
}; */

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (result.selectedDates[0].getTime() - new Date() > 0) {
      startBtn.disable = false;
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

const result = flatpickr('input#datetime-picker', options);

const startBtn = document.querySelector('button[data-start]');
startBtn.addEventListener('click', onStartBtnClick);

let timeoutId = null;

function onStartBtnClick() {
  timeoutId = setInterval(() => {
    if (result.selectedDates[0].getTime() - new Date() < 0) {
      clearInterval(timeoutId);
      return;
    }
    const newDate = new Date();
    const selectedDate = result.selectedDates[0].getTime();
    const deltaTime = newDate.getTime() - selectedDate;
  }, 1000);
}

const time = convertMs(result.selectedDates[0].getTime() - new Date());
updateClockface(time);
//console.log(`${days}:${hours}:${minutes}:${seconds}`);
//console.log(result.selectedDates[0].getTime() - new Date());

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

//startBtn.addEventListener('click', onStartBtnClick);

function updateClockface(data) {
  days.textContent = addLeadingZero(data.days);
  hours.textContent = addLeadingZero(data.hours);
  minutes.textContent = addLeadingZero(data.minutes);
  seconds.textContent = addLeadingZero(data.seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(`${days}:${hours}:${minutes}:${seconds}`);
console.log(result.selectedDates[0].getTime() - new Date());
