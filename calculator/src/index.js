
import Parser from './scripts/parser';
import { add,multiply,divide,subtract } from './scripts/core';
import {insert,clean,back,inputAccount} from './scripts/utils';
import './styles/style.scss';


function evaluateAsFloat(code) {

    const p = new Parser();
    function evaluate(obj) {
        console.log(obj);
        switch (obj.type) {
        case "number":  return parseInt(obj.value);
        case "+":  return add(evaluate(obj.left), evaluate(obj.right));
        case "-":  return subtract(evaluate(obj.left), evaluate(obj.right));
        case "*":  return multiply(evaluate(obj.left), evaluate(obj.right));
        case "/":  return divide(evaluate(obj.left), evaluate(obj.right));
        // todo: добавить остальные операции, написать на них тесты
        }
    }

    console.log(code);
    return evaluate(p.parse(code));
}

function writeResult(){
    inputAccount.value=evaluateAsFloat(inputAccount.value)
}

// console.log(evaluateAsFloat('1 + 1'));
// работает только с "+", добавьте остальные операции
console.log(evaluateAsFloat('1 + 2 + 3 + 47'));
console.log(evaluateAsFloat('1 + 2 * 3 / 2'));


const main = document.querySelector('.main');

main.addEventListener('click', (e) => {

    if (e.target.innerText==='C'){
        clean();
    }else if(e.target.innerText==='B'){
        back();
    }else if (e.target.innerText==='='){
        writeResult();
    }else {
        console.log(e.target.innerText);
        insert(e.target.innerText);
    }

})
