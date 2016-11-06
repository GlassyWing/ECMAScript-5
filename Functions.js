/**
 * Created by manlier on 2016/7/30.
 */
/**
 * require("Arrays")
 */

/**
 * 返回一个复合函数，它组合f,g两个函数
 * 形成一个形如f(g())的函数
 * @param {function} f
 * @param {function} g
 * @returns {Function}
 */
function compose(f, g) {
    return function () {
        return f.call(this, g.apply(this, arguments));
    }
}

/**
 * 这个函数将实参传递至左侧
 * @param {function} f
 * @param {*...} ags
 * @returns {Function}
 */
function partialLeft(f, ags) {
    var args = arguments;
    return function () {
        var a = array(args, 1);
        a = a.concat(array(arguments));
        return f.apply(this, a);
    }
}

/**
 * 这个函数将实参传递至右侧
 * @param {function} f
 * @param {*...} ags
 * @returns {Function}
 */
function partialRight(f, ags) {
    var args = arguments;
    return function () {
        var a = array(arguments);
        a = a.concat(array(args, 1));
        return f.apply(this, a);
    }
}

/**
 * 这个函数的实参被用作模板
 * @param {function} f
 * @param {*...} ags
 * @returns {Function}
 */
function partial(f, ags) {
    var args = arguments;
    return function () {
        var a = array(args, 1);
        var i = 0, j = 0;
        for(; i < a.length; i++)
            if(!a[i]) a[i] = arguments[j++];
        a = a.concat(array(arguments, j));
        return f.apply(this, a);
    }
}

