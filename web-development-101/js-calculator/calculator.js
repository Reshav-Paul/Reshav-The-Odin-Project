let buttonClickHandler = function (button) {
    let key = button.textContent;
    let operatorPattern = /^[+^x/-]$/g;
    let numberPattern = /^[0-9.]$/;
    primaryDisplay.focus();
    if (key === 'C') {
        clear();
        return;
    }
    if (key === '<-') {
        let removedChar = primaryDisplay.textContent.slice(-1);
        if (removedChar === 'y') {
            primaryDisplay.textContent = primaryDisplay.textContent.slice(0, -8);
            if(op2.toLowerCase() === 'infinity')
                op2 = '';
            if(op1.toLowerCase() === 'infinity')
                op1 = '';
            return;
        }
        primaryDisplay.textContent = primaryDisplay.textContent.slice(0, -1);
        if (removedChar.match(operatorPattern))
            operator = null;
        else {
            if (op2.length === 0) op1 = op1.slice(0, -1);
            else op2 = op2.slice(0, -1);
        }
        return;
    }
    if (key === '=') {
        if (op1.length === 0) return;
        calculate();
        addToHistory();
        secondaryDisplay.textContent = primaryDisplay.textContent + '=';
        primaryDisplay.textContent = op1;
        return;
    }
    if (key.match(operatorPattern) && op1.length === 0)
        return;
    if (key.match(operatorPattern) && op2.length === 0) {
        if(operator && primaryDisplay.textContent.slice(-1).match(operatorPattern))
            primaryDisplay.textContent = primaryDisplay.textContent.slice(0, -1);
        operator = key;
    }
    if (operator && key.match(operatorPattern) && op2.length > 0) {
        calculate();
        addToHistory();
        secondaryDisplay.textContent = primaryDisplay.textContent + '=';
        primaryDisplay.textContent = op1;
        operator = key;
    }
    if (operator != null && key.match(numberPattern))
        op2 += key;
    if (operator === null && key.match(numberPattern))
        op1 += key;
    primaryDisplay.textContent += button.textContent;
}
const clear = function () {
    op1 = '';
    op2 = '';
    operator = null;
    primaryDisplay.textContent = '';
    secondaryDisplay.textContent = '';
    historyPanel.innerHTML = '<div id="cursor"><span>|</span></div>';
    historyText = '';
};
const calculate = function () {
    if (op1.length === 0)
        return;
    if (operator === null) {
        historyText = op1 + ' = ' + op1;
        return;
    }
    if (op2.length === 0)
        return;

    let num1 = parseFloat(op1);
    let num2 = parseFloat(op2);
    let result = 0;

    if (operator === '+')
        result = num1 + num2;
    if (operator === '-')
        result = num1 - num2;
    if (operator === 'x')
        result = num1 * num2;
    if (operator === '/')
        result = num1 / num2;
    if (operator === '^')
        result = num1 ** num2;

    result = result.toFixed(6);
    if(result.toLowerCase() !== 'infinity')
        result = reduceFractionalZeroes(result);

    historyText = [op1, operator, op2, '=', result].join(' ');
    op1 = result.toString();
    op2 = '';
    operator = null;
}

const addToHistory = function () {
    if (historyText.length === 0)
        return;
    let newHistoryTextElement = document.createElement('p');
    newHistoryTextElement.textContent = historyText;
    historyPanel.insertBefore(newHistoryTextElement, document.querySelector('#cursor'));
    historyText = '';
}

const reduceFractionalZeroes = function (r) {
    let fractionPart = r.split('.')[1];
    let integerPart = r.split('.')[0];

    if (integerPart.length === 0 || fractionPart.length === 0)
        return r;

    let redundantZeroesStartIndex = fractionPart.length - 1;
    while(redundantZeroesStartIndex >= 0 && fractionPart.charAt(redundantZeroesStartIndex) === '0')
        --redundantZeroesStartIndex;
    let newFractionPart = fractionPart.slice(0, redundantZeroesStartIndex + 1);
    if(newFractionPart.length === 0)
        return integerPart;
    return integerPart + '.' + newFractionPart;
}

const keyboardHitHandler = function (e) {
    if (e.key === ' ') return;
    if (e.keyCode === 8) {
        buttonClickHandler(document.querySelector(`.button[data-key="<-"]`));
        return;
    }
    if (e.keyCode === 13) {
        buttonClickHandler(document.querySelector(`.button[data-key="="]`));
        return;
    }
    if (e.key === '*') {
        buttonClickHandler(document.querySelector(`.button[data-key="x"]`));
        return;
    }
    if (e.key === 'c') {
        buttonClickHandler(document.querySelector(`.button[data-key="C"]`));
        return;
    }
    button = document.querySelector(`.button[data-key="${e.key}"]`);
    if (button === null) return;
    buttonClickHandler(button);
}
let op1 = '';
let op2 = '';
let operator = null;

let primaryDisplay = document.getElementById('primary-display');
let secondaryDisplay = document.getElementById('secondary-display');
let historyPanel = document.getElementById('history-panel');
let historyText = '';

primaryDisplay.textContent = "";

let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('mouseup', event => buttonClickHandler(event.target));
    button.setAttribute('data-key', `${button.textContent}`);
});
document.addEventListener('keyup', e => keyboardHitHandler(e));
