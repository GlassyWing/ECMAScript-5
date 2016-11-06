/**
 * Created by manlier on 2016/7/26.
 */
/**
 * 返回一个继承自原型对象p的属性的新对象
 * @param {function|object} p 原型对象
 * @returns {object} 继承自原型对象p的属性的新对象
 */
function inherit(p) {
    if(p == null) throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== 'object' && t !== "function")
        throw TypeError();
    function F() {}
    F.prototype = p;
    return new F();
}

/**
 * 把p中的可枚举属性复制到o中，并返回
 * @param {object} o
 * @param {object} p
 * @returns {object} o
 */
function extend(o, p) {
    for(var prop in p) {
        //noinspection JSUnfilteredForInLoop
        o[prop] = p[prop];
    }
}

/**
 * 将p中的可枚举属性复制到o中，并返回
 * @param {object} o
 * @param {object} p
 * @returns {object} o
 */
function merge(o, p) {
    for(var prop in p) {
        //noinspection JSUnfilteredForInLoop
        if (o.hasOwnProperty(prop)) {
            continue;
        }
        //noinspection JSUnfilteredForInLoop
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 如果o中的属性不存在于p中，则删除该属性
 * @param {object} o
 * @param {object} p
 * @returns {object} o
 */
function restrict(o, p) {
    for(var prop in o) {
        if(!(prop in p)) { //noinspection JSUnfilteredForInLoop
            delete o[prop];
        }
    }
    return o;
}

/**
 * 如果o中的属性也存在于p中，则删除该属性
 * @param {object} o
 * @param {object} p
 * @returns {object} o
 */
function subtract(o, p) {
    for(var prop in p)
        { //noinspection JSUnfilteredForInLoop
            delete o[prop];
        } // 从o中删除（删除一个不存在的属性不会报错）
}

/**
 * 返回一个新对象，这个对象同时拥有o与p的属性
 * 如果o和p中有重名属性，使用p中的属性
 * @param {object} o
 * @param {object} p
 * @returns {Object}
 */
function union(o, p) {
    return extend(extend({}, o), p);
}

/**
 * 返回一个新对象，这个对象拥有同时在o和p出现的属性
 * 就像求o和p的交集，但p中的属性值被忽略
 * @param {object} o
 * @param {object} p
 * @returns {Object}
 */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}

/**
 * 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
 * @param {object} o
 * @returns {Array}
 */
function keys(o) {
    if(typeof o !== "object") throw TypeError; // 参数必须为对象
    var result = [];
    for(var prop in o) {
        if(o.hasOwnProperty(prop))
            result.push(prop);
    }
    return result;
}

/**
 * 给Object.prototype添加一个不可枚举的extend()方法
 */
Object.defineProperty(Object.prototype, "extend",{
    writable: true,
    enumerable: false,
    configurable: true,
    /**
     * 该方法将作为参数传入的对象的属性一一复制
     * 除了值以外，还将复制属性的所有特性，除非在目标对象中存在同名的属性
     * @param {object} o
     */
    value: function (o) {
        var names = Object.getOwnPropertyNames(o);
        for(var i = 0; i < names.length; i++) {
            if(names[i] in this) continue;
            var desc = Object.getOwnPropertyDescriptor(o, names[i]);
            Object.defineProperty(this, names[i], desc);
        }
    }
});


/**
 * 获得对象的类型
 * @param {*} o
 * @returns {*}
 */
function classof(o) {
    if( o === null ) return "Null";
    if( o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

/**
 * 返回一个处理IE bug的带补丁的extend()版本
 */
var extend = (function () {
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];

    //noinspection LoopStatementThatDoesntLoopJS
    for (var p in {toString: null}) {
        return function (o) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var prop in source)
                    { //noinspection JSUnfilteredForInLoop
                        o[prop] = source[prop];
                    }
            }
            return o;
        }
    }

    return function (o) {
        for(var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for(var prop in source) { //noinspection JSUnfilteredForInLoop
                o[prop] = source[prop];
            }

            for(var j = 0; j < protoprops.length; j++) {
                prop = protoprops[i];
                if(source.hasOwnProperty(prop))
                    o[prop] = source[prop];
            }
        }
        return o;
    }
}());

/**
 * 返回一个绑定指定上下文的函数
 * @param {function} f
 * @param {object} o
 * @returns {function}
 */
function bind(f, o) {
    if(f.bind) return f.bind(o);
    else return function () {
        f.apply(o, arguments);
    }
}

/**
 * 判断是否是函数
 * @param {*} f
 * @returns {boolean}
 */
function isFunction(f) {
    return Object.prototype.toString.call(f) === "[object Function]";
}

var map = Array.prototype.map ?
    function (a, f) {
        return a.map(f);
    } :
    function (a, f) {
        var result = [];
        for(var i = 0, len = a.length; i < len; i++)
            if(i in a) result[i] = f.call(null, a[i], i, a);
        return result;
    };

var reduce = Array.prototype.reduce ?
    function (a, f, initial) {
        if(arguments.length > 2)
            return a.reduce(f, initial);
        else return a.reduce(f);
    } :
    function (a, f, initial) {
        var i = 0, len = a.length, accumulator;
        if(arguments.length > 2) accumulator = initial;
        else {
            if(len == 0) throw TypeError();
            while (i < len) {
                if(i in a) {
                    accumulator = a[i++];
                    break;
                }
                i++;
            }
            if(i == len) throw TypeError;
        }
        while(i < len) {
            if(i in a)
                accumulator = f.call(null, accumulator, a[i], i, a);
        }
        return accumulator;
    };

function defineClass(constructor, methods, statics) {
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    return constructor;
}

function defineSubclass(superclass, constructor, methods, statics){
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    return constructor;
}

Function.prototype.extend = function (constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};

/**
 * 冻结指定的属性
 * @param {object} o
 * @param {String...} [props]
 * @returns {object} o
 */
function freezeProps(o, props) {
    props = arguments.length == 1 ?
        Object.getOwnPropertyNames(o) :
        Array.prototype.slice.call(arguments, 1);
    props.forEach(function (n) {
        if(!Object.getOwnPropertyDescriptor(o, n).configurable) return;
        Object.defineProperty(o, n, {writable: false, configurable: false});
    });
    return o;
}

/**
 * 将o中指定名字（或所有）的属性设置为不可枚举的
 * @param {object} o
 * @param {String...} [props]
 * @returns {object} o
 */
function hideProps(o, props) {
    props = arguments.length == 1 ?
        Object.getOwnPropertyNames(o) :
        Array.prototype.slice.call(arguments, 1);
    props.forEach(function (n) {
        if(!Object.getOwnPropertyDescriptor(o, n).configurable)
            return;
        Object.defineProperty(o,n,{enumerable: false});
    });
    return o;
}

/**
 * 安排函数f在未来的调用模式
 * 在等待若干毫秒之后调用f
 * 如果设置了interval并没有设置end，则f调用
 * 永不会停止，如果没有设置interval和end,
 * 只在若干毫秒后调用f一次
 * @param {Function} f
 * @param {Number} [start]
 * @param {Number} [interval]
 * @param {Number} [end]
 */
function invoke(f, start, interval, end) {
    if(!start) start = 0;
    if(arguments.length < 2)
        setTimeout(f, start);
    else {
        setTimeout(repeat, start);
        function repeat() {
            var h = setInterval(f, interval);
            if(end) setTimeout(function () {
                clearInterval(h);
            }, end);
        }
    }
}

/**
 * 这个函数用来解析来自URL的查询串中的name=value参数对
 * 它将name=value存储在一个对象的属性中，并返回该对象
 * @example
 * // var args = urlArgs();
 * // var q = args.q || "";
 * // var n = args.n ? parseInt(args.n) : 10;
 * @returns {{}}
 */
function urlArgs() {
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}

/**
 * 传递函数给whenReady(),当文档解析完成且为操作准备就绪时，
 * 函数将作为文档对象方法调用
 * DOMContentLoaded, readystatechange或load事件发生时会触发
 * 注册函数，一旦文档准备就绪，所有函数都将被调用，任何传递给whenReady()的函数都将被立即调用
 * @function
 */
var whenReady = (function () {
    var funcs = [];  // 当获得事件时，将要运行的函数
    var ready = false; // 当触发事件处理程序时，切换到true

    // 当文档准备就绪时，调用事件处理程序
    function handler(e) {
        // 如果已经运行过一次，只需要返回
        if(ready) return;

        if(e.type === "readystatechange" && document.readyState !== "complete")
            return;
        for(var i = 0; i < funcs.length; i++)
            funcs[i].call(document);

        ready = true;
        funcs = null;
    }

    if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange",handler, false);
    } else if(document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        document.attachEvent("onload", handler);
    }

    return function (f) {
        if(ready) f.call(document);
        else funcs.push(f);
    }
})();

/**
 * 客户端嗅探，检测结果如下
 * "webkit|applewebkit": Chrome, Edge或Safari, 或其它基于webkit的浏览器
 * "mozilla": Firefox 或其它基于gecko内核的浏览器
 * "msie": IE10之前的浏览器
 * ".net": IE11
 * @type {{name, version}}
 */
var brower = (function () {
    var s = navigator.userAgent.toLowerCase();
    var matches = /(applewebkit|webkit)\/([\w.]+)/.exec(s) ||
        /(msie)\s([\w.]+)/.exec(s) ||
        /(\.net)(?:.*? rv:([\w.]+))?/.exec(s) ||
        !/compatible/.test(s) &&
        /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s);
    return {name: matches[1] || "", version: matches[2] || "0"};
}());

/**
 * 将document.cookie的值以名/值对组成的一个
 * 对象返回，假设存储cookie的值以encodeURIComponent()
 * 函数编码
 * @returns {{}}
 */
function getCookie() {
    var cookie = {};
    var all = document.cookie;
    if(all === "")
        return cookie;
    var list = all.split("; ");
    for(var i = 0; i < list.length; i++) {
        var record = list[i];
        var p = record.indexOf("=");
        var name = record.substring(0, p);
        var value = record.substring(p+1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
