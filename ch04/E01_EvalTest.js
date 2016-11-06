/**
 * Created by manlier on 2016/7/25.
 */
var foo = function (a) {
    eval(a);
};
console.log(foo("b = 3;"));
console.log(b);
// foo("return;");