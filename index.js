const ERROR_SHORT = 'too short';

let generated = [];
let button = document.getElementsByTagName('button');
let deff = defaultGenerate();

button[0].onclick = () => {
    let min = Number(document.getElementById('input_go').value);
    min = min != "" ? min : deff;

    let max = Number(document.getElementById('input_end').value);
    max = max != "" ? max : (deff + 4);

    let generatedArray = document.getElementsByClassName('value_generate_p')[0];
    let input = getInputArray(min, max);

    generated = generateArray(input);
    generatedArray.innerHTML = generated;
}

button[1].onclick = () => {
    if (generated.length == 0) {
        return alert('generate array before');
    }
    let elems = generated.length;
    let flag = true;
    let div = document.createElement('div');

    while (flag) {
        flag = false;
        for (let i = 0; i < (elems - 1); i++) {
            if (generated[i] > generated[i + 1]) {
                let p = document.createElement('p');
                p.className = "shuffling";
                p.innerHTML = generated[i] + ' > ' + generated[i + 1];
                p.append(' - shuffling');

                document.body.append(p);

                flag = true;
                reshuffle(generated, i);
            } else {
                let p = document.createElement('p');
                p.className = "sort_yet";
                p.innerHTML = generated[i] + ' < ' + generated[i + 1];
                p.append(' - ok');

                document.body.append(p);
            }
        }
    }
    let p = document.createElement('p');
    p.className = "sorted";
    p.innerHTML = generated + " - sorted";

    document.body.append(p);
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