/**
 * Created by manlier on 2016/8/1.
 */
(function () {
    Object.defineProperty(Object.prototype,"objectId", {
        get: idGetter,
        enumerable: false,
        configurable: false
    });

    function idGetter() {
        if(!(idprop in this)) {
            if(!Object.isExtensible(this))
                throw Error("Can't define id for non-extensible objects");
            Object.defineProperty(this, idprop, {
                value: nextId++
            });
        }
        return this[idprop];
    }

    var idprop = "|**objectId**|";
    var nextId = 1;
})();