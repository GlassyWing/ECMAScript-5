/**
 * Created by manlier on 2016/8/2.
 */

/**
 * 根据元素id获得元素
 * @param {String...} ids
 * @returns {{}}
 */
function getElements(ids) {
    var elements = {};
    for(var i = 0; i < arguments.length; i++) {
        var id = arguments[i];
        var elt = document.getElementById(id);
        if(elt == null)
            throw new Error("No such element with id: " + id);
        elements[id] = elt;
    }
    return elements;
}