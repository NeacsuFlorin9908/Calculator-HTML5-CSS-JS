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
        sum = b;
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

    document.addEventListener("keydown", e => {
        if(e.code === 'Numpad0'){
            const newInput = "0";
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
        }
        
        if(e.code === 'Numpad1'){
            const newInput = "1";
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
        }
        if(e.code === 'Numpad2'){
            const newInput = "2";
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
        }
        if(e.code === 'Numpad3'){
            const newInput = "3";
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
        }
        
        if(e.code === 'Numpad4'){
            const newInput = "4";
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
        }
        
        if(e.code === 'Numpad5'){
            const newInput = "5";
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
        }
        
        if(e.code === 'Numpad6'){
            const newInput = "6";
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
        }
        
        if(e.code === 'Numpad7'){
            const newInput = "7";
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
        }
        
        if(e.code === 'Numpad8'){
            const newInput = "8";
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
        }
        
        if(e.code === 'Numpad9'){
            const newInput = "9";
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
        }
        
        if(e.code === 'NumpadAdd'){
            if (newNumberFlag) {
                previousValueElem.textContent = "";
                itemArray = [];
            }
            const newOperator = "+";
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
        }
        
        if(e.code === 'NumpadSubtract'){
            if (newNumberFlag) {
                previousValueElem.textContent = "";
                itemArray = [];
            }
            const newOperator = "-";
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
        }

        if(e.code === 'NumpadMultiply'){
            if (newNumberFlag) {
                previousValueElem.textContent = "";
                itemArray = [];
            }
            const newOperator = "*";
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
        }
        
        if(e.code === 'NumpadDivide'){
            if (newNumberFlag) {
                previousValueElem.textContent = "";
                itemArray = [];
            }
            const newOperator = "/";
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
        }
        if(e.code === 'NumpadEnter'){
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
        } 
        if(e.code === 'NumpadDecimal'){
            const newInput = ".";
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
        }

        if(e.code === 'Backspace'){
            currentValueElem.value = currentValueElem.value.slice(0, -1);
            if (!currentValueElem.value.length) currentValueElem.value = 0;
        }
        if(e.code === 'Delete'){
            currentValueElem.value = 0;
            previousValueElem.textContent = '';
        }
    })

}

document.addEventListener("DOMContentLoaded", initApp);
