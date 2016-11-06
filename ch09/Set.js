/**
 * Created by manlier on 2016/7/31.
 */

/**
 * 值的任意集合
 * @param {*...} elms
 * @constructor
 */
function Set(elms) {
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments);
}

/**
 * 添加元素
 * @param {*...} elms
 * @returns {Set}
 */
Set.prototype.add = function (elms) {
    for(var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if(!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

/**
 * 移除元素
 * @param {*...} elms
 * @returns {Set}
 */
Set.prototype.remove = function (elms) {
    for(var i = 0; i < arguments.length; i++) {
        var str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

/**
 * 返回当前集合的大小
 * @returns {number}
 */
Set.prototype.size = function () {
    return this.n;
};

/**
 * 是否包含元素
 * @param {*} value
 * @returns {boolean}
 */
Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};

/**
 * 遍历集合中的元素
 * @param {function(*=)} f
 * @param {*} context
 */
Set.prototype.forEach = function (f, context) {
    for(var s in this.values)
        if(this.values.hasOwnProperty(s))
            f.call(context, this.values[s]);
};

/**
 * 判断两个集合是否相等
 * @param {Set} that
 * @returns {boolean}
 */
Set.prototype.equals = function (that) {
    if(this === that) return true;

    if(!(that instanceof Set)) return false;

    if(this.size() != that.size()) return false;

    try {
        this.forEach(function (v) {
            if(!that.contains(v))
                throw false;
            return true;
        })
    } catch (x) {
        if(x === false) return false;
        throw x;
    }
};

/**
 * 根据值的类型生成一个键
 * @param {*} val
 * @returns {String}
 * @private
 */
Set._v2s = function (val) {
    switch (val) {
        case undefined: return 'u';
        case null: return 'n';
        case true: return 't';
        case false: return 'f';
        default: switch (typeof val) {
            case 'number': return '#' + val;
            case 'string': return '"' + val;
            default: return '@' + objectId(val);
        }
    }

    function objectId(o) {
        var prop = "|**objectid**|";
        if(!o.hasOwnProperty(prop))
            o[prop] = Set._v2s.next++;
        return o[prop];
    }
};
Set._v2s.next = 100;

extend(Set.prototype, {
    toString: function () {
        var s = "{",
            i = 0;
        this.forEach(function (v) {
            s += ((i++ > 0) ? ", " : "") + v;
        });
        return s + "}";
    },
    toLocaleString: function () {
        var s = "{",
            i = 0;
        this.forEach(function (v) {
            if(i++ > 0) s += ", ";
            if(v == null) s += v;
            else s += v.toLocaleString();
        });
        return s + "}";
    },
    toArray: function () {
        var a = [];
        this.forEach(function (v) {
            a.push(v);
        });
        return a;
    }
});