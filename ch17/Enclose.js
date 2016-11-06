/**
 * Created by manlier on 2016/9/10.
 */

function enclose(content, framewidth, frameheight, contentX, contentY) {

    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0);
    contentY = Math.min(contentY, 0);

    // 创建frame元素，且设置CSS类名和样式
    var frame = document.createElement("div");
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";
    frame.style.boxSizing = "border-box";
    frame.style.webkitBoxSizing = "border-box";
    frame.style.mozBoxSizing = "border-box";

    // 把frame放入文档中，并把内容移入frame中
    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);

    // 确定元素相对于frame的位置
    content.style.position = "relative";
    content.style.left = contentX + "px";
    content.style.top = contentY + "px";

    var isMozilla = brower.name === "mozilla";

    frame.onwheel = wheelHandler;
    frame.onmousewheel = wheelHandler;
    if(isMozilla)
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);

    function wheelHandler(event) {
        var e = event || window.event;
        // 由于浏览器兼容性原因，此处不能依赖event.delta属性
        var delta = 30,
            directionX = event.deltaX / -Math.abs(event.deltaX) ||
                    event.wheelDeltaX / Math.abs(event.wheelDeltaX) || 0,
            directionY = event.deltaY / -Math.abs(event.deltaY) ||
                    event.wheelDelta / Math.abs(event.wheelDelta) ||
                    event.detail / -Math.abs(event.detail) || 0,
            deltaX = delta * directionX,
            deltaY = delta * directionY;

        // 如果在Firefox(未来版本)中得到mousewheel或wheel事件
        // 那么就不需要DOMMouseScroll
        if(isMozilla && e.type !== "DOMMouseScroll")
            frame.removeEventListener("DOMMouseScroll", wheelHandler, false);

        // 获取内容元素的当前尺寸
        var contentbox = content.getBoundingClientRect();
        var contentwidth = contentbox.width || contentbox.right - contentbox.left;
        var contentheight = contentbox.height || contentbox.bottom - contentbox.top;

        if(e.altKey) { //如果按下Alt键，就可以调整frame大小
            if(deltaX) {
                framewidth -= deltaX;
                framewidth = Math.min(framewidth, contentwidth);
                framewidth = Math.max(framewidth, 50);
                frame.style.width = framewidth + "px";
            }
            if(deltaY) {
                frameheight -= deltaY;
                frameheight = Math.min(frameheight, contentheight);
                frameheight = Math.max(frameheight, 50);
                frame.style.height = frameheight + "px";
            }
        } else { // 没有按下Alt键，可以平移frame中的内容
            if(deltaX) {
                var minoffset = Math.min(framewidth - contentwidth, 0);
                contentX = Math.max(contentX + deltaX, minoffset);
                contentX = Math.min(contentX, 0);
                content.style.left = contentX + "px";
            }
            if(deltaY) {
                var minoffset = Math.min(frameheight - contentheight, 0);
                contentY = Math.max(contentY + deltaY, minoffset);
                contentY = Math.min(contentY, 0);
                content.style.top = contentY + "px";
            }
        }

        if(e.preventDefault) e.preventDefault();
        if(e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}