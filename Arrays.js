/**
 * Created by manlier on 2016/7/27.
 */
/**
 * 判断一个对象是否为真正的数组
 * @type {Function}
 * @returns {boolean}
 */
var isArray = Function.isArray || function (o) {
        return typeof o === "object" &&
                Object.prototype.toString.call(o) === "[object Array]";
    };

/**
 * 判定o是否为一个类数组对象
 * 字符串和函数有length属性，但是它们
 * 可以用typeof检查。在客户端JavaScript中，
 * DOM文本节点也有length属性，需要用额外判断
 * o.nodeType != 3 将其排除
 * @param {object} o
 * @returns {boolean}
 */
function isArrayLike(o) {
    return !!(o &&
    typeof o === "object" &&
    o.length === Math.floor(o.length) &&
    o.length < 4294967296);
}

/**
 *
 * @param {Array} a
 * @param {string} sep
 * @returns {string}
 */
function join(a, sep) {
    return Array.prototype.join.call(a, sep);
}

/**
 *
 * @param {Array} a
 * @param {int} from
 * @param {int} to
 * @returns {Array}
 */
function slice(a, from, to) {
    return Array.prototype.slice.call(
        a, from, to
    );
}


/**
 * @param {Array} a
 * @param {function(=, number=, Array=)} callback
 * @param {*} [thisArg]
 * @returns {Array}
 */
function map(a, callback, thisArg) {
    return Array.prototype.map.call(
        a, callback, thisArg
    );
}

/**
 * 讲一个数组按指定位置和长度复制到另一个数组中
 * @param {Array} from 原数组
 * @param {int} from_start 起始位置
 * @param {Array} to 目标数组
 * @param {int} to_start 目标数组起始位置
 * @param {int} length 复制的元素个数
 */
function arraycopy(from, from_start, to, to_start, length) {

    if(!isArray(from) || !isArray(to))
        throw new TypeError("The from or to must be an array");

    if(length != Math.floor(length))
        throw new TypeError("The length must be integer");

    if(length < 0 || length > from.length)
        throw new Error("out bounds");

    for(var i = from_start; i < length; i++) {
        to[to_start + i] = from[from_start + i];
    }
}

/**
 *
 * @param {{from,from_start,to,to_start, length}} args
 */
function easycocy(args) {
    arraycopy(
        args.from,
        args.from_start || 0,
        args.to,
        args.to_start || 0,
        args.length
    );
}

/**
 * 将类数组对象（或对象）转换成真正的数组
 * @param {*} a
 * @param {int} [n]
 * @returns {Array}
 */
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}