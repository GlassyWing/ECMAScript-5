/**
 * Created by manlier on 2016/7/27.
 */
var a = {};
a.x = 3;
console.log(Object.isExtensible(a), a);
Object.preventExtensions(a);
a.y = 4;
console.log(Object.isExtensible(a), a);
console.log("origin: ", Object.getOwnPropertyDescriptor(a, "x"));
Object.seal(a);
console.log("after seal: ", Object.getOwnPropertyDescriptor(a, "x"));
Object.freeze(a);
console.log("after freeze: ", Object.getOwnPropertyDescriptor(a, "x"));

var o = Object.seal(
    Object.create(Object.freeze({x:1}),
        {y:{value:2, writable: true}})
);
console.log(Object.getOwnPropertyDescriptor(o, "y"));