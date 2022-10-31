import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
};

let timerId = null;
refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    let date = new Date();

    let ident = Boolean(date < selectedDates[0]);
    if (ident) {
      refs.btnStart.removeAttribute('disabled');
      refs.btnStart.addEventListener('click', () => {
        if (ident) {
          refs.btnStart.setAttribute('disabled', true);
          refs.input.setAttribute('disabled', true);
          timerId = setInterval(() => {
            date = new Date();

            let delta = selectedDates[0] - date;
            let values = convertMs(delta);
            refs.days.textContent = values.days.toString().padStart(2, '0');
            refs.hours.textContent = values.hours.toString().padStart(2, '0');
            refs.minutes.textContent = values.minutes
              .toString()
              .padStart(2, '0');
            refs.seconds.textContent = values.seconds
              .toString()
              .padStart(2, '0');
            if (delta < 1000) {
              clearInterval(timerId);
              Notify.success('timeout');
            }
          }, 1000);
        } else {
          refs.btnStart.setAttribute('disabled', true);
        }
      });
    } else {
      refs.btnStart.setAttribute('disabled', true);
      //   window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.input, options);

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
