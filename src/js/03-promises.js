import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('[name=delay]');
const step = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const create = document.querySelector('button');

form.addEventListener('submit', onFormSub);

function onFormSub(event) {
  event.preventDefault();
  for (let i = 0; i < Number(amount.value); i += 1) {
    let delayVal = +delay.value;
    createPromise(i + 1, (delay += step))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
