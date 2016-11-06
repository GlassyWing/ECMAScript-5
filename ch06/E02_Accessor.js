/**
 * Created by manlier on 2016/7/27.
 */
var p = {
    x: 1.0,
    y: 1.0,

    get r() {return Math.sqrt(this.x * this.x + this.y * this.y);},
    set r(newvalue) {
        var oldvalue = this.r;
        var ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta() {return Math.atan2(this.y, this.x); }
};

console.log(p.r = 2);
console.log(p);

var q = inherit(p);
q.x = 2; q.y = 2;
console.log(q.r);
console.log(q.theta);

var serialnum = {
    $n: 0,

    get next() { return this.$n++; },
    set next(n) {
        if(n >= this.$n) this.$n = n;
        else throw "序列号的值不能比当前值小"
    }
};


