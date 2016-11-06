/**
 * Created by manlier on 2016/7/27.
 */
var a1 = [,,,];
var a2 = new Array(3);
console.log(a1.length,0 in a1);  //=> false 可能存在编译器优化
console.log(a2.length, 0 in a2);  //=> false

var a3 = [,];
var a4 = [undefined];
console.log(a3.length, 0 in a3);  //=> false
console.log(a4.length, 0 in a4);  //=> true