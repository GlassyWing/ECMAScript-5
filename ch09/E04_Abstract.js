/**
 * Created by manlier on 2016/8/1.
 */
function abstractMethod() {
    throw new Error("abstract method");
}

/**
 *
 * @constructor
 */
function AbstractSet() {
    throw new Error("Can't instantiate abstract classes");
}

/**
 * @abstract
 */
AbstractSet.prototype.contains = abstractMethod;

/**
 * @augments AbstractSet
 */
var NotSet = AbstractSet.extend(
    function (set) {
        this.set = set;
    },
    {
        contains: function (x) {
            return !this.set.contains(x);
        },
        toString: function () {
            return "~" + this.set;
        },
        equals: function (that) {
            return that instanceof NotSet &&
                this.set.equals(that.set);
        }
    }
);

/**
 * @class
 * @augments AbstractSet
 */
var AbstractEnumerableSet = AbstractSet.extend(
    function () {
        throw new Error("Can't instantiate abstract classes");
    },
    {
        /**
         * @abstract
         */
        size: abstractMethod,
        /**
         * @abstract
         */
        forEach: abstractMethod,
        isEmpty: function () {
            return this.size() == 0;
        },
        toString: function () {
            var s = "{", i = 0;
            this.forEach(function (v) {
                if (i++ > 0) s += ", ";
                s += v;
            });
            return s + "}";
        },
        toLocaleString: function () {
            var s = "{", i = 0;
            this.forEach(function (v) {
                if (i++ > 0) s += ", ";
                if (!v) s += v;
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
        },
        equals: function (that) {
            if (!(that instanceof AbstractEnumerableSet)) return false;
            if (this.size() != that.size()) return false;
            try {
                this.forEach(function (v) {
                    if (!that.contains(v))
                        throw false;
                });
                return true;
            } catch (x) {
                if (x === false) return false;
                throw x;
            }
        }
    }
);

/**
 * @augments AbstractEnumerableSet
 */
var SingletonSet = AbstractEnumerableSet.extend(function (member) {
    this.member = member;
}, {
    contains: function (x) {
        return x === this.member;
    },
    size: function () {
        return 1;
    },
    forEach: function (f, ctx) {
        f.call(ctx, this.member);
    }
});

/**
 * @class
 * @augments AbstractEnumerableSet
 */
var AbstractWritableSet = AbstractEnumerableSet.extend(function () {
    throw new Error("Can't instantiate abstract classes")
},{
    /**
     * @abstract
     */
    add:abstractMethod,
    /**
     * @abstract
     */
    remove:abstractMethod,
    union: function (that) {
        var self = this;
        that.forEach(function (v) {
            self.add(v);
            return this;
        })
    },
    intersection: function (that) {
        var self = this;
        this.forEach(function (v) {
            if(!that.contains(v)) self.remove(v);
        });
        return this;
    },
    difference: function (that) {
        var self = this;
        that.forEach(function (v) {
            self.remove(v);
        });
        return this;
    }
});

/**
 * @class
 * @extends AbstractWritableSet
 */
var AraySet = AbstractWritableSet.extend(function () {
    this.values = [];
    this.add.apply(this, arguments);
},{
   contains: function (v) {
       return this.values.indexOf(v) != -1;
   },
    size: function () {
        return this.values.length;
    },
    forEach: function (f, c) {
        this.values.forEach(f, c);
    },
    add: function () {
        for(var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if(!this.contains(arg)) this.values.push(arg);
        }
        return this;
    },
    remove: function () {
        for(var i = 0; i < arguments.length; i++) {
            var p = this.values.indexOf(arguments[i]);
            if(p == -1) continue;
            this.values.splice(p, 1);
        }
        return this;
    }

});