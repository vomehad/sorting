const ERROR_SHORT = 'Минимально число больше'; // минимальное число больше максимального
const DEMO_LENGTH = 4; // длина демо массива
const DEFAULT_MIN = defaultGenerate(); // начало демо массива

let generated = []; // по кнопке create здесь будет "перемешаный" исходный массив

initButtons(); // "берём" кнопки

create.onclick = () => { // кнопка создать
    let min = +document.getElementById('input-go').value; // "забираем" минимальное число
    console.log('min', min)
        // min = min != "" ? min : DEFAULT_MIN; // демо минимальное число
    min = demoMin(min);
    console.log('min demo', min)


    let max = +document.getElementById('input-end').value; // "забираем" максимальное число
    console.log('max', max)
        // max = max != "" ? max : min + DEMO_LENGTH; // демо максимальное число
    max = demoMax(min, max);
    console.log('max demo', max)


    let generatedArray = document.getElementsByClassName('value-gen-p')[0];
    let input = getInputArray(min, max);
    let div = document.createElement('div');
    div.className = "gen";

    generated = generateArray(input);
    generatedArray.innerHTML = generated;
}

bubbleSort.onclick = () => {
    if (generated.length == 0) {
        return alert('сначала создайте массив');
    }
    let elems = generated.length;
    let needSort = true;
    let div = document.createElement('div');
    div.className = "sort-log";

    while (needSort) {
        let ul = document.createElement('ul');
        ul.className = "sort-iter";

        needSort = false;
        for (let i = 0; i < (elems - 1); i++) {
            if (generated[i] > generated[i + 1]) {
                let li = document.createElement('li');
                li.className = "shuffling";
                li.innerHTML = generated[i] + ' > ' + generated[i + 1];
                li.append(' - переставляем');

                ul.append(li);

                needSort = true;
                reshuffle(generated, i);
            } else {
                let li = document.createElement('li');
                li.className = "sort-yet";
                li.innerHTML = generated[i] + ' < ' + generated[i + 1];
                li.append(' - ok');

                ul.append(li);
            }
            div.append(ul)
        }
    }
    let liEnd = document.createElement('li');
    liEnd.className = "sorted";
    liEnd.innerHTML = generated + " - sorted";
    // ul.append(liEnd);
    div.append(liEnd);

    document.body.append(div);
}

function initButtons() {
    let buttons = document.getElementsByTagName('button');

    create = buttons[0];
    bubbleSort = buttons[1];
    clear = buttons[2];
}

function reshuffle(array, baseIndex) {
    [array[baseIndex], array[baseIndex + 1]] = [array[baseIndex + 1], array[baseIndex]];

    return array;
}

function checkInputValues(min, max) {
    if (max <= min) {

        return alert(ERROR_SHORT);
    }
}

function getInputArray(min, max) {
    checkInputValues(min, max);
    let input = [];
    for (let i = min; i <= max; i++) {
        input.push(i);
    }
    return input;
}

function generateArray(source) {
    let gener = [];
    while (source.length > 0) {
        let index = Math.floor(Math.random() * Math.floor(source.length));
        gener.push(source[index]);
        source.splice(index, 1);
    }
    return gener;
}

function defaultGenerate() {
    return Math.floor(Math.random() * 9);
}

function demoMin(min = 0) {
    if (min === 0) {
        min = DEFAULT_MIN;
    }
    return min;
}

function demoMax(min = 0, max = 0) {
    if (min === 0) {
        min = DEFAULT_MIN;
    }
    if (max < min) {
        max = min + DEMO_LENGTH;
    }
    return max;
}