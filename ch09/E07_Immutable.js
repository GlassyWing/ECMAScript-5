/**
 * Created by manlier on 2016/8/1.
 */
function Range(from, to) {
    this.from = from;
    this.to = to;
    freezeProps(this);
}

Range.prototype = hideProps({
    constructor: Range,
    includes: function (x) {
        return this.from <= x && this.x <= this.to;
    },
    forEach: function (f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++)
        f(x);
    },
    toString: function () {
        return "(" + this.from + "..." + this.to + ")";
    }
});