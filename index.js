const DEMO_LENGTH = 7; // длина демо массива
const DEFAULT_MIN = demoValue(); // начало демо массива
const SHUFFLE = "переставить"; // операция: переставить элементы
const BUBBLE_OK = "не переставлять"; // операция: не переставлять элементы
const SORTED = "отсортировно"; // завершение сортировки

initButtons(); // "берём" кнопки

create.onclick = () => { // кнопка создать
    let inputValues = document.getElementsByTagName('input');
    let div = document.getElementById('result');
    recreateArray(div);

    min = demoMin(inputValues); // исключаем некорректные значения (демо-режим)
    max = demoMax(inputValues, min); // исключаем некорректные значения (демо-режим)
    generated = generateArray(getSourceArray(min, max)); // "перемешаный" массив
    console.log(min, max, generated)

    elemInDiv(div);
}

bubbleSort.onclick = () => { // кнопка пузырьковая сортировка
    if (generated.length == 0) { // если забыли создать исходный массив
        return alert('сначала создайте массив'); // создайте его
    }
    let elems = generated.length; // колличество элементов в исходном массве
    let needSort = true; // флаг для проходов сортировки
    let div = document.getElementById('result'); // ход сортировки

    while (needSort) { // непосредственно сортировка
        let ul = document.createElement('ul'); // проход сортировки
        ul.className = "sort-iter"; // класс для css

        needSort = false; // флаг для проходов сортировки
        for (let i = 0; i < (elems - 1); i++) { // этапы прохода
            if (generated[i] > generated[i + 1]) { // нужно ли переставить элементы?
                let li = document.createElement('li'); // вывод этапа
                li.className = "shuffling"; // класс для css
                li.innerHTML = generated[i] + ' > ' + generated[i + 1]; // вставим значение этапа

                ul.append(li); // вставим этап в проход

                needSort = true; // флаг для проходов сортировки
                reshuffle(generated, i); // непосредственно перестановка
            } else {
                let li = document.createElement('li'); // вывод этапа
                li.className = "sort-yet"; // класс для css
                li.innerHTML = generated[i] + ' < ' + generated[i + 1]; // вставим значение этапа

                ul.append(li); // вставим этап в проход
            }
            div.append(ul); // конец прохода
        }
    }
    let end = document.createElement('div'); // вывод об окончании сортировки
    end.className = "sorted"; // класс для css

    elemInDiv(div);
}

clear.onclick = () => {
    let trash = document.getElementById('result');

    while (trash.firstChild) {
        trash.removeChild(trash.firstChild);
    }
}

function initButtons() {
    let buttons = document.getElementsByTagName('button');

    create = buttons[0];
    bubbleSort = buttons[1];
    clear = buttons[2];
}

function elemInDiv(div) {
    let create = document.createElement('div');
    create.className = "create";
    if (generated.length > 0) {
        Array.from(generated).forEach((el) => {
            let elem = document.createElement('div');
            elem.className = "block-array";
            elem.innerHTML = el;
            create.appendChild(elem);
        });
    }
    div.append(create);
}

function reshuffle(array, base) {
    [array[base], array[base + 1]] = [array[base + 1], array[base]];

    return array;
}

function getSourceArray(min, max) {
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

function demoValue() {
    return Math.floor(Math.random() * 9);
}

function demoMin(input) {
    let min = +input[0].value;
    if (+min == 0 || isNaN(min) || +min < 0 || min > 32) {
        min = DEFAULT_MIN;
    }
    return min;
}

function demoMax(input, min = 0) {
    let max = +input[1].value;
    if (+min == 0) {
        min = DEFAULT_MIN;
    }
    if (+max <= min || isNaN(max) || max > 40) {
        max = min + DEMO_LENGTH;
    }
    return max;
}

function recreateArray(result) {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}