/**
 * Created by manlier on 2016/7/31.
 */

/**
 * 创建一个枚举类
 * @param {{...}} namesToValues
 * @returns {enumeration}
 */
function enumeration(namesToValues) {

    function Enum() {
        throw "Can't Instantiate Enumerations";
    }

    var proto = {
        constructor: enumeration,
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value;
        },
        toJSON: function () {
            return this.name;
        }
    };

    Enum.prototype = proto;

    Enum.values = [];

    for(var name in namesToValues) {
        var e = inherit(proto);
        e.name = name;
        e.value = namesToValues[name];
        Enum[name] = e;
        Enum.values.push(e);
    }

    Enum.forEach = function (f, c) {
        for(var i = 0; i < this.values.length; i++)
        f.call(c, this.values[i]);
    };

    Object.freeze(Enum.values);
    Object.freeze(Enum);

    return Enum;
}