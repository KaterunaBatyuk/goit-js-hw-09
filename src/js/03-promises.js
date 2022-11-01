import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('[name=delay]');
const step = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const create = document.querySelector('button');

form.addEventListener('submit', onFormSub);

function onFormSub(event) {
  event.preventDefault();
  let delayVal = +delay.value;
  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i + 1, delayVal)
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
