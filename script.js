let btnStart = document.getElementById('start');
let game = document.querySelector('#game');
let score = 0;
let time = document.querySelector('#time');
let startGameBox = false;
let btnStartDisplay = window.getComputedStyle(btnStart).getPropertyValue('display');
let gameBackgroundColor = window.getComputedStyle(game).getPropertyValue('background-color');
let timeHeader = document.querySelector('#time-header');
let resultHeader = document.querySelector('#result-header');
let result = document.querySelector('span#result');
let gameTime = document.querySelector('input#game-time');

setGameTime()
btnStart.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function startGame() {
    score = 0;
    setGameTime();
    startGameBox = true;
    hide(btnStart);
    game.style.backgroundColor = '#fff';

    //отключим ввод времени игры во время игры
    gameTime.setAttribute('disabled', 'true')

    let interval = setInterval(() => {
        let timeContent = parseFloat(time.textContent);

        if (timeContent <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.textContent = (timeContent - 0.1).toFixed(1)
        }

    }, 100);

    renderBox()
}

/*Функция генерации элементов клика*/
function renderBox() {
    game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(30, 70);
    let gameSize = game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.top = getRandom(boxSize, maxTop) + 'px';
    box.style.left = getRandom(boxSize, maxLeft) + 'px';
    box.style.backgroundColor = 'rgb(' + getRandom(0, 256)+ ', ' + getRandom(0, 256) + ', ' + getRandom(0, 256) + ')';
    box.style.borderRadius = '50%';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    game.insertAdjacentElement('afterbegin', box)
}

/*Функция, которая проверяет клик по элементу и генерирует новый элемент*/
function handleBoxClick(e) {
    if (!startGameBox) {
        return;
    }
    if(e.target.dataset.box) {
        score++;
        renderBox()
    }
}
/*Функция генерации случайного целого числа из диапазона*/
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

/*Функция завершения игры*/
function endGame() {
    startGameBox = false;
    btnStart.classList.remove('hide');
    // btnStart.style.display = btnStartDisplay;
    game.style.backgroundColor = gameBackgroundColor;
    // game.innerHTML = '';
    document.querySelector('.game > div[data-box]').remove();
    //меняем заголовки о времени игры и количестве очков
    hide(timeHeader);
    show(resultHeader);
    getResult();
    gameTime.removeAttribute('disabled');
}

/*Функция вывода очков*/
function getResult() {
    result.textContent = score.toString();
}

/*Функция передачи значения времени игры в заголовок*/
function setGameTime() {
    if ( +gameTime.value && +gameTime.value > 0) {
        time.textContent = gameTime.value.toString(1)
    } else {
        return
        // gameTime.value = 5;
    }
    hide(resultHeader);
    show(timeHeader);
}

/*Функция показа node*/
function show($el) {
    $el.classList.remove('hide')
}
/*Функция скрытия node*/
function hide($el) {
    $el.classList.add('hide')
}
