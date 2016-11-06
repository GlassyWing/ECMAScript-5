/**
 * Created by manlier on 2016/8/5.
 */

/**
 * 将e转化为相对定位的元素，使之左右“整栋”
 * @param {string|Element} e 元素对象或者元素id
 * @param {function(Element=)} [oncomplete] 以e为参数，
 * 它将在动画结束时调用
 * @param {number} [distance] 指定间距
 * @param {number} [time] 指定时长
 */
function shake(e, oncomplete, distance, time) {
    if(typeof e === "string") e = document.getElementById(e);
    if(!time) time = 500;
    if(!distance) distance = 5;

    var originalStyle = e.style.cssText;
    e.style.position = "relative";
    var start = (new Date()).getTime();
    animate();

    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        var fraction = elapsed / time;

        if(fraction < 1) {
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";

            setTimeout(animate, Math.min(16, time - elapsed));
        } else {
            e.style.cssText = originalStyle;
            if(oncomplete) oncomplete(e);
        }
    }
}

/**
 * 以毫秒级的时间将e从完全不透明
 * 淡出到完全透明，在调用函数时假设e是完全
 * 不透明的
 * @param {String|Element} e 元素或id
 * @param {function(Element=)} [oncomplete]
 * @param {Number} [time]
 */
function fadeOut(e, oncomplete, time) {
    if(typeof e === "string") 
        e = document.getElementById(e);
    if(!time) time = 500;
    
    var ease = Math.sqrt;
    
    var start = (new Date()).getTime();
    animate();
    
    function animate() {
        var elapsed = (new Date()).getTime() - start;
        var fraction = elapsed / time;
        if(fraction < 1) {
            var opacity = 1 - ease(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(16, time - elapsed));
        } else {
            e.style.opacity = "0";
            if(oncomplete) oncomplete(e);
        }
    }
}