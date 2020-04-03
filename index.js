const ERROR_SHORT = 'too short';

let button = document.getElementsByTagName('button');

button[0].onclick = () => {
    let min = Number(document.getElementById('input_go').value);
    let max = Number(document.getElementById('input_end').value);

    let sourceArray = document.getElementsByClassName('value_source_p')[0];
    let generatedArray = document.getElementsByClassName('value_generate_p')[0];

    let input = getInputArray(min, max);
    sourceArray.innerHTML = input;

    generated = generateArray(input);
    generatedArray.innerHTML = generated;
}

button[1].onclick = () => {
    let elems = generated.length;
    let u = 0;
    let flag = true;

    while (flag) {
        let y = 0;
        u++;

        flag = false;
        for (let i = 0; i < (elems - 1); i++) {
            console.log('step ' + u + '.' + ++y, generated);

            if (generated[i] > generated[i + 1]) {
                console.log(generated[i] + ' > ' + generated[i + 1]);
                flag = true;
                console.log('shuffle');
                reshuffle(generated, i);
            } else {
                console.log(generated[i] + ' < ' + generated[i + 1]);
                console.log('ok');
            }
        }
    }
    console.log('sorted');
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