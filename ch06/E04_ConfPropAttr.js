/**
 * Created by manlier on 2016/7/27.
 */
var o = {};
Object.defineProperty(o,"x",{
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

console.log(o.x);
console.log(Object.keys(o));
console.log(Object.getOwnPropertyNames(o));

Object.defineProperty(o, "x", {writable: false});

o.x = 2;

console.log(o.x);

Object.defineProperty(o, "x", {value: 2});
console.log(o.x);

Object.defineProperty(o, "x", {writable: true});

o.x = 3;
console.log(o.x);

Object.defineProperty(o, "x", {get: function () {
    return 0;
}});

console.log(o.x);