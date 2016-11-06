/**
 * Created by manlier on 2016/7/25.
 */
console.log([] + 2);
var n = 17;
console.log("binary string: " + n.toString(2));
console.log("octal string: " + "0" + n.toString(8));
console.log("hex string: " + '0x' + n.toString(16));
var no = 123456.789;
console.log(no.toFixed(0));
console.log(no.toFixed(2));
console.log(no.toFixed(5));
console.log(no.toExponential(1));
console.log(no.toExponential(3));
console.log(no.toPrecision(4));
console.log(no.toPrecision(7));

console.log("\n");
console.log(parseInt("3 blind mice"));
console.log(parseFloat(" 3.14 meters"));
console.log(parseInt("-12.34"));
console.log(parseInt("0xFF"));
console.log(parseInt("-0xFF"));
console.log(parseFloat(".1"));
console.log(parseInt("0.1"));
console.log(parseInt(".1"));
console.log(parseFloat("$72.47"));
console.log(parseInt("033"));