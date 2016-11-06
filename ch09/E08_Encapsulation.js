/**
 * Created by manlier on 2016/8/1.
 */
function Range(from, to) {
    if(from > to)
        throw new Error("Range: from must be <= to");

    function getFrom() {
        return from;
    }

    function getTo() {
        return to;
    }

    function setFrom(f) {
        if(f <= to) from = f;
        else throw new Error("Range: from must be <= to");
    }

    function setTo(t) {
        if(t >= from) to = t;
        else throw new Error("Range: to must be >= from");
    }

    Object.defineProperties(this, {
        from: {get: getFrom, set: setFrom, enumerable: true, configurable: false},
        to: {get: getTo, set: setTo, enumerable: true, configurable:false}
    });
}

Range.prototype = hideProps({
    constructor: Range,
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    forEach: function (f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++)
            f(x);
    },
    toString: function () {
        return "(" + this.from + "..." + this.to + ")";
    }
});