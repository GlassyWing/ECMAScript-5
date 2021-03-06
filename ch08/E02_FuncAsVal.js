/**
 * Created by manlier on 2016/7/29.
 */
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}
// (2+3) + (4 * 5)
var i = operate(add, operate(add(2, 3), operate(multiply(4, 5))));

var operators = {
    add: function (x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    },
    multiply:function (x, y) {
        return x * y;
    },
    divide: function (x, y) {
        return x / y;
    },
    pow: Math.pow
};

function operate2(operation, operand1, operand2) {
    if(typeof operators[operation] === "function")
        return operators[operation](operand1, operand2);
    else
        throw "unknown operator";
}