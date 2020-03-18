function splitRGB(rgb) {
    colors = rgb.slice(4, -1).split(',');
    for(i = 0; i < colors.length; i++) {
        colors[i] = parseInt(colors[i]);
    }
    return colors;
}
function generateRandomColor() {
    let red = 64 + Math.round(Math.random() * 192);
    let green = 64 + Math.round(Math.random() * 192);
    let blue = 64 + Math.round(Math.random() * 192);
    return `rgb(${red},${green},${blue})`;
}
function setColorShift(element) {
    let color = element.style['background-color'];
    let colorValues = splitRGB(color);

    cellColorShiftArray[parseInt(element.getAttribute('data-cell-count'))] =
        `rgb(${Math.round(colorValues[0] / 10)},${Math.round(colorValues[1] / 10)},
        ${Math.round(colorValues[2] / 10)})`;
}
function changeCellColor(element) {
    if(selectedBrush === colorBrushes.monoColorBrush) {
        element.style['background-color'] = selectedColor;
        setColorShift(element);
        return;
    }
    if(element.style['background-color'] !== 'rgb(255, 255, 255)') {
        let colorValues = splitRGB(element.style['background-color']);
        let colorShifts = splitRGB(cellColorShiftArray[parseInt(element.getAttribute('data-cell-count'))]);

        for(i = 0; i < colorValues.length; ++i) {
            if(colorValues[i] < colorShifts[i]) colorValues[i] = 0;
            else colorValues[i] -= colorShifts[i];
        }
        element.style['background-color'] = 
            `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`;
        hoverCount = parseInt(element.getAttribute('data-count'));
        element.setAttribute('data-count', ++hoverCount);
        return;
    }
    let randomColor = generateRandomColor();
    element.style['background-color'] = randomColor;
    setColorShift(element);
}
function toggleButtonSelectionStatus(element) {
    if (element.classList.contains('selected-button')){
        element.classList.remove('selected-button');
        element.classList.add('non-selected-button');
    } else if (element.classList.contains('non-selected-button')) {
        element.classList.remove('non-selected-button');
        element.classList.add('selected-button');
        if(element === resetButton || element === resizeButton) return;
        selectedBrush = element;
    }
}
function toggleColorSelection(element) {
    let otherButton = rainbowColorButton;
    if(element === rainbowColorButton)
        otherButton = monoColorButton;
    toggleButtonSelectionStatus(element);
    toggleButtonSelectionStatus(otherButton);
}

function drawGrid(n = 10) {
    gridArea.innerHTML = '';
    gridArea.style['grid-template-columns'] = 'repeat(' + n +', 1fr)';
    gridArea.style['grid-template-rows'] = 'repeat(' + n +', 1fr)';
    cellColorShiftArray = new Array(n * n);

    for(let i = 0; i < n * n; i++){
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-count', '0');
        cell.setAttribute('data-cell-count', `${i}`)
        cell.style['transition'] = 'all 30ms'
        cell.style['background-color'] = '#fff';
        gridArea.appendChild(cell);
    }

    cellArray = document.querySelectorAll('.cell');
    for(let i = 0; i < cellArray.length; i++){
        cellArray[i].addEventListener('mouseover', (e) => changeCellColor(e.target));
    }
}

function resetGrid() {
    for(let i = 0; i < cellArray.length; i++){
        cellArray[i].style['background-color'] = '#fff';
    }
}

function changeSelectedBrushColor(element) {
    let color = element.value;
    document.querySelector('#color-picker > div').style['background-color'] = color;
    selectedColor =  color;
}

const DEFAULT_GRID_SIZE = 10;
let gridSize = DEFAULT_GRID_SIZE;
let gridArea = document.querySelector('#paint-area');
let cellArray = [];
let cellColorShiftArray = [];
drawGrid(DEFAULT_GRID_SIZE);

let monoColorButton = document.getElementById('mono-color-button');
let rainbowColorButton = document.getElementById('rainbow-color-button');

const colorBrushes = Object.freeze({'rainbowBrush':rainbowColorButton, 'monoColorBrush':monoColorButton});
let selectedBrush = colorBrushes.rainbowBrush;
let selectedColor = '#000';

monoColorButton.addEventListener('click', e => toggleColorSelection(e.target));
rainbowColorButton.addEventListener('click', e => toggleColorSelection(e.target));

let resetButton = document.getElementById('reset-button');
resetButton.addEventListener('mousedown', e => toggleButtonSelectionStatus(e.target));
resetButton.addEventListener('mouseup', e => {
    toggleButtonSelectionStatus(e.target);
    resetGrid();
});
resetButton.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('selected-button');
    e.target.classList.add('non-selected-button');
})

let resizeButton = document.getElementById('grid-resize-button');
resizeButton.addEventListener('mousedown', e => toggleButtonSelectionStatus(e.target));
resizeButton.addEventListener('mouseup', e => {
    toggleButtonSelectionStatus(e.target);
    let inputTextElement = document.getElementById('grid-size-input');
    gridSize = parseInt(inputTextElement.value);
    gridSize = gridSize <= 30 && gridSize >= 2? gridSize : DEFAULT_GRID_SIZE;
    drawGrid(gridSize);
});
resizeButton.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('selected-button');
    e.target.classList.add('non-selected-button');
})

let colorPickerInput = document.querySelector('#color-picker-input');
colorPickerInput.addEventListener('change', e => changeSelectedBrushColor(e.target));
