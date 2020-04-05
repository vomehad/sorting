const DEMO_LENGTH = 4; // длина демо массива
const DEFAULT_MIN = defaultGenerate(); // начало демо массива
const SHUFFLE = "переставляем"; // операция: переставить элементы
const BUBBLE_OK = "не переставляем"; // операция: не переставлять элементы
const SORTED = "отсортировано"; // завершение сортировки

let generated = []; // по кнопке create здесь будет "перемешаный" исходный массив

initButtons(); // "берём" кнопки

create.onclick = () => { // кнопка создать
    let min = +document.getElementById('input-go').value; // "забираем" минимальное число
    min = demoMin(min); // исключаем некорректные значения (демо-режим)

    let max = +document.getElementById('input-end').value; // "забираем" максимальное число
    max = demoMax(min, max); // исключаем некорректные значения (демо-режим)

    let generatedArray = document.getElementsByClassName('value-gen-p')[0]; // берем абзац для вставки (удалить)
    let input = getInputArray(min, max); // создаём массив чисел из промежутка от min до max
    let div = document.createElement('div'); // div где окажется "перемеаный" массив
    div.className = "gen"; // класс для css

    generated = generateArray(input); // "перемешаный" массив
    generatedArray.innerHTML = generated; // вставляем "перемешаный" массив в абзац (удалить)
}

bubbleSort.onclick = () => { // кнопка пузырьковая сортировка
    if (generated.length == 0) { // если забыли создать исходный массив
        return alert('сначала создайте массив'); // создайте его
    }
    let elems = generated.length; // колличество элементов в исходном массве
    let needSort = true; // флаг для проходов сортировки
    let div = document.createElement('div'); // ход сортировки
    div.className = "sort-log"; // класс для css

    while (needSort) { // непосредственно сортировка
        let ul = document.createElement('ul'); // проход сортировки
        ul.className = "sort-iter"; // класс для css

        needSort = false; // флаг для проходов сортировки
        for (let i = 0; i < (elems - 1); i++) { // этапы прохода
            if (generated[i] > generated[i + 1]) { // нужно ли переставить эементы?
                let li = document.createElement('li'); // вывод этапа
                li.className = "shuffling"; // класс для css
                li.innerHTML = generated[i] + ' > ' + generated[i + 1]; // вставим значение этапа
                li.append(' - ' + SHUFFLE); // имя операции

                ul.append(li); // вставим этап в проход

                needSort = true; // флаг для проходов сортировки
                reshuffle(generated, i); // непосредственно перестановка
            } else {
                let li = document.createElement('li'); // вывод этапа
                li.className = "sort-yet"; // класс для css
                li.innerHTML = generated[i] + ' < ' + generated[i + 1]; // вставим значение этапа
                li.append(' - ' + BUBBLE_OK); // имя операции

                ul.append(li); // вставим этап в проход
            }
            div.append(ul); // конец прохода
        }
    }
    let liEnd = document.createElement('li'); // вывод об окончании сортировки
    liEnd.className = "sorted"; // класс для css
    liEnd.innerHTML = generated + " - " + SORTED; // конец ортировки
    div.append(liEnd); // конец сортировки

    document.body.append(div); // вывод хода сортировки
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

function getInputArray(min, max) {
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
    if (+min === 0 || isNaN(min)) {
        min = DEFAULT_MIN;
    }
    return min;
}

function demoMax(min = 0, max = 0) {
    if (+min === 0) {
        min = DEFAULT_MIN;
    }
    if (+max < min || isNaN(max)) {
        max = min + DEMO_LENGTH;
    }
    return max;
}