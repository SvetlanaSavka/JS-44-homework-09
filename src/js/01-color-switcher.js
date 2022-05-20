let timeoutId = null;

refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorSwitchers);
refs.stopBtn.addEventListener('click', stopColorSwitchers);

function startColorSwitchers() {
  if (refs.stopBtn) {
    refs.startBtn.disable = true;
  }
  timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitchers() {
  clearInterval(timeoutId); // очистить интервал
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
