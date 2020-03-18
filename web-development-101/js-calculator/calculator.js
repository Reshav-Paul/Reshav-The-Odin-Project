let buttonClickHandler = function (button) {
    let key = button.textContent;
    if (key === 'C') {
        op1 = '';
        op2 = '';
        operator = null;
        primaryDisplay.textContent = '';
        secondaryDisplay.textContent = '';
        historyPanel.innerHTML = '<div id="cursor"><span>|</span></div>';
        historyText = '';
        return;
    }
    if (key === '<-') {
        removedChar = primaryDisplay.textContent.slice(-1);
        primaryDisplay.textContent = primaryDisplay.textContent.slice(0, -1);
        if(removedChar.match(/^[+^x/-]$/g))
            operator = null;
        else {
            if(op2.length === 0)
                op1 = op1.slice(0, -1);
            else
                op2 = op2.slice(0, -1);
        }
        return;
    }
    if (key === '=') {
        calculate();
        addToHistory();
        secondaryDisplay.textContent = primaryDisplay.textContent + '=';
        primaryDisplay.textContent = op1;
        return;
    }
    if(operator && key.match(/^[+^x/-]$/g)) {
        calculate();
        addToHistory();
        primaryDisplay.textContent = op1;
    }
    if(key.match(/^[+^x/-]$/g) && op2.length === 0)
        operator = key;
    if(operator != null && key.match(/^[0-9.]$/))
        op2 += key;
    if(operator === null && key.match(/^[0-9.]$/))
        op1 += key;
    primaryDisplay.textContent += button.textContent;
}

const calculate = function() {
    if(op1.length === 0)
        return;
    if(operator === null) {
        historyText = op1 + ' = ' + op1;
        return;
    }
    if(op2.length === 0)
        return;

    let num1 = parseFloat(op1);
    let num2 = parseFloat(op2);
    let result = 0;
    if(operator === '+')
        result = num1 + num2;
    if(operator === '-')
        result = num1 - num2;
    if(operator === 'x')
        result = num1 * num2;
    if(operator === '/')
        result = num1 / num2;
    if(operator === '^')
        result = num1 ** num2;
    result = result.toFixed(6);
    result = reduceFractionalZeroes(result);
    historyText = [op1, operator, op2, '=', result].join(' ');
    op1 = result.toString();
    op2 = '';
    operator = null;
}

const addToHistory = function () {
    console.log(historyText);
    if(historyText.length === 0)
        return;
    let newHistoryText = document.createElement('p');
    newHistoryText.textContent = historyText;
    historyPanel.insertBefore(newHistoryText, document.querySelector('#cursor'));
    historyText = '';
}

const reduceFractionalZeroes = function(r) {
    newNumber = '';
    let i;
    for(i = r.length - 1; i >= 0 && r.charAt(i) === '0'; --i) {}
    if(i === -1) return '0';
    r = r.slice(0, i + 1);
    if(r.slice(-1) === '.')
        return r.slice(0, -1);
    return r;
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
buttons.forEach(button => button.addEventListener('click', event => buttonClickHandler(event.target)));
document.addEventListener('keyup', e => {
    if(e.key === ' ')   return;
    if(e.key.match(/^[+^x/*-]$/g) || e.key.match(/^[C=0-9/.]$/)
        || e.key === '<-' || e.keyCode === 8 || e.keyCode === 13){
        console.log('looping');
        for(let i = 0; i < buttons.length; ++i) {
            button = buttons.item(i);
            if(e.keyCode === 8 && button.textContent === '<-') {
                buttonClickHandler(buttons.item(i));
                return;
            }
            if(e.keyCode === 13 && button.textContent === '=') {
                console.log(e.keyCode);
                buttonClickHandler(button);
                return;
            }
            if(e.key === '*' && button.textContent === 'x') {
                buttonClickHandler(button);
                return;
            }
            if(button.textContent === e.key) {
                buttonClickHandler(button);
                return;
            }
        }
    }
});
