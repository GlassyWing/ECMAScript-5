/**
 * Created by manlier on 2016/7/31.
 * require("Set")
 */
/**
 * 该集合中只有一个成员
 * @param member
 * @constructor
 */
function SingletonSet(member) {
    this.member = member;
}

// 继承自Set
SingletonSet.prototype = inherit(Set.prototype);
extend(SingletonSet.prototype, {
    constructor: SingletonSet,
    add: function () {
        throw "read-only set"
    },
    remove: function () {
        throw "read-only set"
    },
    size: function () {
        return 1;
    },
    forEach:function (f, context) {
        f.call(context, this.member);
    },
    contains: function (x) {
        return x === this.member;
    }
});

SingletonSet.prototype.equals = function (that) {
    return that instanceof Set && that.size() == 1 && that.contains(this.member);
};