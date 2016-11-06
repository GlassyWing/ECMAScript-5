/**
 * Created by manlier on 2016/9/17.
 */
whenReady(function () {
    // 是否有机会使用跨域请求？
    var supportsCORS = "withCredentials" in (new XMLHttpRequest());

    // 遍历文档中的所有链接
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if(!link.href) continue; // 跳过没有超链接的锚点
        if(link.title) continue; // 跳过已经有工具提示的链接

        // 如果这是一个跨域链接
        if(link.host !== location.host || link.protocol !== location.protocol) {
            link.title = "站外链接";
            if(!supportsCORS) continue;

        }

        // 注册事件处理程序，当鼠标悬停时下载链接详细信息
        if(link.addEventListener)
            link.addEventListener("mouseover", mouseoverHandler, false);
        else
            link.attachEvent("onmouseover")
    }

    function mouseoverHandler(e) {
        var link = e.target || e.srcElement;
        var url = link.href;

        var req = new XMLHttpRequest();
        req.open("HEAD", url);
        req.onreadystatechange = function () {
            if(req.readyState !== 4) return;
            if(req.status === 200) {
                var type = req.getResponseHeader("Content-Type");
                var size = req.getResponseHeader("Content-Length");
                var date = req.getResponseHeader("Last-Modified");
                link.title = "类型：" + type + " \n" +
                        "大小：" + size + " \n" + "时间: " + date;
            } else {
                if(!link.title)
                    link.title = "Couldn't fetch details:\n" +
                            req.status + " " + req.statusText;
            }
        };
        req.send();

        if(link.removeEventListener)
            link.removeEventListener("mouseover", mouseoverHandler, false);
        else
            link.detachEvent("onmouseover")
    }
});