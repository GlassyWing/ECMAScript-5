/**
 * Created by manlier on 2016/8/5.
 */

/**
 * 在指定的事件目标上注册用于处理指定类型事件的指定处理程序
 * @param {Object} target
 * @param {String} type
 * @param {Function} handler
 */
function addEvent(target, type, handler) {
    if(target.addEventListener)
        target.addEventListener(type, handler, false);
    else
        target.attachEvent("on" + type,function (event) {
            return handler.call(target, event);
        })
}