const ERROR_SHORT = 'too short';

let button = document.getElementsByTagName('button')[0];

button.onclick = () => {
    let min = Number(document.getElementById('input_go').value);
    let max = Number(document.getElementById('input_end').value);

    let sourceArray = document.getElementsByClassName('value_source_p')[0];
    let generatedArray = document.getElementsByClassName('value_generate_p')[0];

    let input = getInputArray(min, max);
    sourceArray.innerHTML = input;

    let generated = generateArray(input);
    generatedArray.innerHTML = generated;
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
    console.log(source);
    let gener = [];
    while (source.length > 0) {
        let index = Math.floor(Math.random() * Math.floor(source.length));
        gener.push(source[index]);
        source.splice(index, 1);
    }
    console.log(gener);
    return gener;
}