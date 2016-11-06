/**
 * Created by manlier on 2016/7/30.
 */
var square = function (x) {
    return x * x;
};

var sum = function (x, y) {
    return x + y;
};

var squareOfSum = compose(square, sum);
console.log(squareOfSum(2, 3));
