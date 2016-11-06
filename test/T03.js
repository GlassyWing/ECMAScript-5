/**
 * Created by manlier on 2016/4/29.
 */
function a() {
    b();
    c();
}

a();

function b() {
    console.log("B")
}

var c = function() {
    console.log("C")
};

