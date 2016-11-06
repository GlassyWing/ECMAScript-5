/**
 * Created by manlier on 2016/7/26.
 */
function A() {

}

A.prototype.echo = function () {
    console.log("This is A's prototype method: echo")
};

A.echo = function () {
    console.log("This is A's method: echo")
};

var b = inherit(A);
console.log(b.echo());