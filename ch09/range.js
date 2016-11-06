/**
 * Created by manlier on 2016/7/30.
 */
function range(from, to) {
    var r = inherit(range.methods);
    r.from = from;
    r.to = to;
    return r;
}

range.methods = {
    include: function (x) {
        return this.from <= x && x <= this.to;
    },
    forEach: function (f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++)
        f(x);
    },
    toString: function () {
        return "(" + this.from + "..." + this.to + ")";
    }
};