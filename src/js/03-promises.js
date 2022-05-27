import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'), //объявляем элемент по классу
  firstDelay: document.querySelector('.form input delay'),
  stepDelay: document.querySelector('.form input step'),
  amount: document.querySelector('.form input amount'),
};
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault(); //отменять действие по умолчанию

  const elements = event.currentTarget.elements;

  if (elements.delay.value === '' || elements.step.value === '' || elements.amount.value === '') {
    return console.log('Please fill in all the fields!');
  }
  console.log(
    `Delay:${elements.delay.value}, Step:${elements.step.value}, Amount:${elements.amount.value}`,
  );

  console.log(Number(elements.delay.value));

  for (
    let i = 0;
    i < Number(elements.amount.value);
    i += 1 // запускаю цикл от 0  до amount
  ) {
    setTimeout(() => {
      makePromise(i + 1, Number(elements.delay.value) + i * Number(elements.step.value))
        .then(message => Notiflix.Notify.success(message))

        .catch(error => Notiflix.Notify.failure(error));
    }, Number(elements.delay.value) + i * Number(elements.step.value));
  }
}

function makePromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`:white_check_mark: Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`:x: Rejected promise ${position} in ${delay}ms`);
    }
  });
}
