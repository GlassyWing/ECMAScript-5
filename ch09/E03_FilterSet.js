/**
 * Created by manlier on 2016/8/1.
 */
function filteredSetSubclass(superclass, filter) {
    var constructor = function () {
        superclass.apply(this, arguments);
    };
    var proto = constructor.prototype = inherit(superclass.prototype);
    proto.constructor = constructor;
    proto.add = function () {
        for(var i = 0; i < arguments.length;i++) {
            var v = arguments[i];
            if(!filter(v))
                throw ("value" + v + " rejected by filter");
        }
        superclass.prototype.add.apply(this,arguments);
    };
    return constructor;
}

var FilteredSet = Set.extend(
    function (set, filter) {
        this.set = set;
        this.filter = filter;
    },
    {
        add: function () {
            if(this.filter) {
                for(var i = 0; i < arguments.length; i++) {
                    var v = arguments[i];
                    if(!this.filter(v))
                        throw new Error("FilteredSet: value " + v + " rejected by filter");
                }
            }
            this.set.add.apply(this.set, arguments);
        },
        remove: function () {
            this.set.remove.apply(this.set, arguments);
            return this;
        },
        contains: function (v) {
            return this.set.contains(v);
        },
        size: function () {
            return this.set.size();
        },
        forEach: function (f, c) {
            this.set.forEach(f, c);
        }
    }
);