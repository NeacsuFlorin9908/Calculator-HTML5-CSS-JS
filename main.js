function add(a, b) {
    let sum = 0;
    if(a == "Infinity"){
        sum = b;
        console.log("Infinity Add");
    }
    else{
        sum = a + b;
    }

    return sum;
}
function substract(a, b) {
    let sum = 0;
    if(a == "Infinity"){
        sum = a;
        console.log("Infinity Substract");
    }
    else{
        sum = a - b;
    }

    return sum;
}
function multiply(a, b) {
    let sum = 1;
    if(a == "Infinity"){
        sum = 0;
        console.log("Infinity Multiply");
    }
    else{
        sum = a * b;
    }
    return sum;
}
function divide(a, b) {
    let sum = 0;
    if(a == "Infinity"){
        sum = 0;
        console.log("Infinity Divide");
    }
    else{
        sum = a / b;
    }

    return sum;
}
function operate(a, b, op) {
    if(op === '+') {
        return add(a,b);
    } else if(op === '-') {
        return substract(a,b);
    } else if(op === '*') {
        return multiply(a,b);
    } else if(op === '/') {
        return divide(a,b);
    }
}

const initApp = () => {

    const currentValueElem = document.querySelector('.currentValue');
    const previousValueElem = document.querySelector('.prevValue');
    let itemArray = [];
    let equationArray = [];
    let newNumberFlag = false;

    const inputButtons = document.querySelectorAll('.number');
    inputButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            const newInput = event.target.textContent;
            if (newNumberFlag) {
                currentValueElem.value =
                    newInput === '.'
                        ? "0."
                        : newInput;
                newNumberFlag = false;
            } else if (currentValueElem.value.includes('.') && newInput === '.') {
                return;
            } else {
                currentValueElem.value = currentValueElem.value == 0 && currentValueElem.value.length == 1 && newInput !== '.'
                        ? newInput
                        : `${currentValueElem.value}${newInput}`;
            }
        });
    });

    const opButtons = document.querySelectorAll('.operator');
    opButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            if (newNumberFlag) {
                previousValueElem.textContent = "";
                itemArray = [];
            }
            const newOperator = event.target.textContent;
            let currentVal = parseFloat(currentValueElem.value);
            if (!itemArray.length) {
                itemArray.push(currentVal, newOperator);
                previousValueElem.textContent =
                    `${currentVal} 
                     ${newOperator}`;
                return newNumberFlag = true;
            }

            if (itemArray.length) {
                itemArray.push(currentVal);

                const equationObj = {
                    num1: parseFloat(itemArray[0]),
                    num2: parseFloat(currentVal),
                    op: itemArray[1]
                }

                equationArray.push(equationObj);
                const newValue = operate(equationObj.num1, equationObj.num2, equationObj.op);
                previousValueElem.textContent = `${newValue} ${newOperator}`;
                itemArray = [newValue, newOperator];
                newNumberFlag = true;
                console.log(equationArray);
            }
        });
    });

    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', () => {
        const currentVal = currentValueElem.value;
        let equationObj;

        if (!itemArray.length && equationArray.length) {
            const lastEquation = equationArray[equationArray.length - 1];
            equationObj = {
                num1: parseFloat(currentVal),
                num2: lastEquation.num2,
                op: lastEquation.op
            }
        } else if (!itemArray.length) {
            return currentVal;
        } else {
            itemArray.push(currentVal);
            equationObj = {
                num1: parseFloat(itemArray[0]),
                num2: parseFloat(currentVal),
                op: itemArray[1]
            }
        }

        equationArray.push(equationObj);
        previousValueElem.textContent = `${equationObj['num1']} ${equationObj['op']} ${equationObj['num2']}`;
        currentValueElem.value = operate(equationObj.num1, equationObj.num2, equationObj.op);
        newNumberFlag = true;
        itemArray = [];
        console.log(equationArray);
    });

    const clear = document.querySelectorAll('.clear, .clearEntry');
    clear.forEach(button => {
        button.addEventListener('click', (event) => {
            currentValueElem.value = 0;
            previousValueElem.textContent = '';
            if (event.target.classList.contains('clear')) {
                itemArray = [];
                equationArray = [];
            }
        });
    });

    const backspace = document.querySelector('.delete');
    backspace.addEventListener('click', () => {
        currentValueElem.value = currentValueElem.value.slice(0, -1);
        if (!currentValueElem.value.length) currentValueElem.value = 0;
    });

    const signChange = document.querySelector('.signChange');
    signChange.addEventListener('click', () => {
        currentValueElem.value = parseFloat(currentValueElem.value) * -1;
    });

}
document.addEventListener("DOMContentLoaded", initApp);
