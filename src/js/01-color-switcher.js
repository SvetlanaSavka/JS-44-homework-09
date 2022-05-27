let timeoutId = null;

refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorSwitchers);
refs.stopBtn.addEventListener('click', stopColorSwitchers);

refs.stopBtn.disabled = true;

function startColorSwitchers() {
  refs.startBtn.disabled = true; //неактивна
  refs.stopBtn.disabled = false; //активна

  timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitchers() {
  clearInterval(timeoutId); // очистить интервал

  refs.startBtn.disabled = false; //активна
  refs.stopBtn.disabled = true; //неактивна
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
