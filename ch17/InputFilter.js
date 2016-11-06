/**
 * Created by manlier on 2016/8/8.
 */
whenReady(function () {
    var inputelts = document.getElementsByTagName("input");
    // 遍历它们
    for(var i = 0; i < inputelts.length; i++) {
        var elt = inputelts[i];
        // 跳过不是文本域或没有data-allowed-chars属性的元素
        if(elt.type != "text" || !elt.getAttribute("data-allowed-chars"))
            continue;

        if(elt.addEventListener) {
            elt.addEventListener("keypress", filter, false);
            elt.addEventListener("textInput", filter, false);
            elt.addEventListener("textinput",filter, false);
        } else {
            elt.attachEvent("onkeypress", filter);
        }
    }

    function filter(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var text = null;

        if(e.type === 'textinput' || e.type === 'textInput') text = e.data;
        else {
            var code = e.charCode || e.keyCode;
            if(code < 32 ||
                e.charCode == 0 ||
                e.ctrlKey || e.altKey)
                return;
            text = String.fromCharCode(code);
        }

        var allowed = target.getAttribute("data-allowed-chars");
        var messageid = target.getAttribute("data-messageid");
        if(messageid)
            var messageElement = document.getElementById(messageid);

        for(var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if(allowed.indexOf(c) == -1) {
                if(messageElement) messageElement.style.visibility = 'visible';

                // 取消默认行为，所有输入框不会插入文本
                if(e.preventDefault) e.preventDefault();
                if(e.returnValue) e.returnValue = false;
                return false;
            }
        }

        // 如果所有字符都合法，隐藏存在的消息元素
        if(messageElement) messageElement.style.visibility = "hidden";
    }
});