/**
 * Created by manlier on 2016/7/29.
 */

/**
 * Function.bind
 */
if(!Function.prototype.bind) {
    Function.prototype.bind = function (o, args) {
        var self = this, boundArgs = arguments;

        return function () {
            var args = [], i;
            for(i = 1; i < boundArgs.length; i++)
                args.push(boundArgs[i]);
            for(i = 0; i < arguments.length; i++)
                args.push(arguments[i]);
            return self.apply(o, args);
        }
    }
}

/**
 * Array.map, Array.reduce
 */
if(!Array.prototype.map) {
    
    Array.prototype.map = function (f) {
        var result = [];
        for(var i = 0, len = this.length; i < len; i++) {
            if(i in this) result[i] = f.call(null, a[i], i, a);
        }
        return result;
    };
    
    Array.prototype.reduce = function (f, initial) {
        var i = 0, len = this.length, accumulator;
        
        if(arguments.length > 1)
            accumulator = initial;
        else {
            if(len == 0) throw TypeError();
            while (i < len) {
                if(i in this) {
                    accumulator = this[i++];
                    break;
                }
                i++;
            }
            if(i == len) throw TypeError();
        }
        while (i < len) {
            if(i in this)
                accumulator = f.call(null, accumulator, this[i], i, this);
            i++;
        }
        return accumulator;
    }
}

/**
 * 给Object.prototype定义properties()方法，
 * 返回的对象定义了4个有用的方法：toString(),descriptors(),hide()和show()
 */
(function () {

    /**
     * 这个方法返回一个表示调用它的对象上的属性名列表的对象
     * （如果不带参数调用它，就表示该对象的所有属性）
     * @param {Array|String...} [props]
     * @returns {Properties}
     */
    function properties(props) {
        var names;
        if(arguments.length == 0)
            names = Object.getOwnPropertyNames(this);
        else if(arguments.length == 1 && Array.isArray(arguments[0]))
            names = arguments[0];
        else
            names = Array.prototype.slice.call(arguments, 0);
        return new Properties(this, names);
    }

    Object.defineProperty(Object.prototype, "properties",{
        value: properties,
        enumerable: false,
        writable: true,
        configurable: true
    });

    /**
     *
     * @param {object} o
     * @param {Array.<String>} names
     * @constructor
     */
    function Properties(o, names) {
        this.o = o;
        this.names = names;
    }

    /**
     * 将代表这些属性的对象设置为不可枚举的
     * @returns {Properties}
     */
    Properties.prototype.hide = function () {
        var o = this.o, hidden = {enumerable: false};
        this.names.forEach(function (n) {
            if(o.hasOwnProperty(n))
                Object.defineProperty(o, n, hidden);
        });
        return this;
    };

    /**
     * 将这些属性设置为只读的和不可配置的
     * @returns {Properties}
     */
    Properties.prototype.freeze = function () {
        var o = this.o, frozen = { writable: false, configurable:false};
        this.names.forEach(function (n) {
            if(o.hasOwnProperty(n))
                Object.defineProperty(o, n, frozen);
        });
        return this;
    };

    /**
     * 返回一个对象，这个对象是名字到属性描述符的映射表
     * 使用它来复制属性，连同属性特性一起复制
     * @example
     *  // Object.defineProperties(dest, src.properties().descriptors())
     * @returns {{}}
     */
    Properties.prototype.descriptors = function () {
        var o = this.o, desc = {};
        this.names.forEach(function (n) {
            if(!o.hasOwnProperty(n)) return;
            desc[n] = Object.getOwnPropertyDescriptor(o, n);
        });
        return desc;
    };

    /**
     * 这是一个格式化良好的属性列表
     * 列表中包含名字、值和属性特性，使用"permanent"表示不可配置
     * 使用"readonly"表示不可写，使用"hidden"表示不可枚举
     * 普通的可枚举、可写和可配置属性不包含特性列表
     * @returns {string}
     */
    Properties.prototype.toString = function () {
        var o = this.o;
        var lines = this.names.map(nameToString);
        return "{\n " + lines.join(",\n ") + "\n}";

        function nameToString(n) {
            var s = "", desc = Object.getOwnPropertyDescriptor(o, n);
            if(!desc) return "nonexistent " + n + ": undefined";
            if(!desc.configurable) s += "permanent ";
            if((desc.get && !desc.set) || !desc.writable)
                s += "readonly";
            if(!desc.enumerable) s += "hidden ";
            if(desc.get || desc.set) s += "accessor " + n;
            else s += n + ": " + ((typeof desc.value === "function") ? "function" : desc.value);
            return s;
        }
    };

    Properties.prototype.properties().hide();

})();

/**
 * 为那些不支持它的浏览器实现outerHTML属性
 * 假设浏览器确实支持innerHTML, 并有个可扩展的Element.prototype,
 * 并且可以定义getter和setter
 */
(function () {
    if(document.createElement("div").outerHTML) return;

    function outerHTMLGetter() {
        var container = document.createElement("div");
        container.appendChild(this.cloneNode(true));
        return container.innerHTML;
    }

    function outerHTMLSetter(value) {
        var container = document.createElement("div");
        container.innerHTML = value;
        while(container.firstChild)
            this.parentNode.insertBefore(container.firstChild, this);
        this.parentNode.removeChild(this);
    }
    
    if(Object.defineProperty) {
        Object.defineProperty(Element.prototype, "outerHTML", {
            get: outerHTMLGetter,
            set: outerHTMLSetter,
            enumerable: false,
            configurable: true
        })
    } else {
        Element.prototype.__defineGetter__("outerHTML", outerHTMLGetter);
        Element.prototype.__defineSetter__("outerHTML",outerHTMLSetter);
    }
})();

/**
 * 本模块为不支持它的浏览器定义了Element.insertAdjacentHTML
 * 还定义了一些可移植的HTML插入函数，它们的名字比insertAdjacentHTML更符合逻辑：
 * @example
 * // Insert.before(),Insert.after(),Insert.atStart(),
 * // Insert.atEnd()
 * @type {{before, after, atStart, atEnd}}
 */
var Insert = (function () {
    if(document.createElement("div").insertAdjacentHTML) {
        return {
            before: function (e, h) {
                e.insertAdjacentHTML("beforebegin", h);
            },
            after: function (e, h) {
                e.insertAdjacentHTML("afterend", h);
            },
            atStart:function (e, h) {
                e.insertAdjacentHTML("afterbegin", h);
            },
            atEnd: function (e, h) {
                e.insertAdjacentHTML("beforeend", h);
            }
        }
    }

    function fragment(html) {
        var elt = document.createElement("div");
        var frag = document.createDocumentFragment();
        elt.innerHTML = html;
        while(elt.firstChild)
            frag.appendChild(elt.firstChild);
        return frag;
    }

    var Insert = {
        before: function (elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt);
        },
        after: function (elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt.nextSibling);
        },
        atStart:function (elt, html) {
            elt.insertBefore(fragment(html), elt.firstChild);
        },
        atEnd: function (elt, html) {
            elt.appendChild(fragment(html));
        }
    };

    Element.prototype.insertAdjacentHTML = function (pos, html) {
        switch (pos.toLowerCase()) {
            case "beforebegin": return Insert.before(this, html);
            case "afterend": return Insert.after(this, html);
            case "afterbegin": return Insert.atStart(this, html);
            case "beforeend": return Insert.atEnd(this, html);
        }
    };

    Element.prototype.properties("insertAdjacentHTML").hide();

    return Insert;
})();

/**
 * 在IE5和IE6中模拟XMLHttpRequest()构造函数
 */
if(window.XMLHttpRequest === undefined) {
    window.XMLHttpRequest = function () {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e1) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e2) {
                throw new Error("XMLHttpRequest is not supported");
            }
        }
    }
}

/**
 * 在不支持EventSource API的浏览器中进行模拟
 * 需要有一个XMLHttpRequest对象在新数据写到
 * 长期存在的HTTP连接中时发送readystatechange事件
 * <note>
 * 注意，这个API的实现是不完整的，
 * 它不支持readyState属性、close方法、open和error事件
 * 消息事件也是通过onmessage属性注册的-这个版本还没有定义
 * addEventListener方法
 * </note>
 */
if(window.EventSource === undefined) {
    window.EventSource = function (url) {
        var xhr,
            evtsrc = this,
            charsReceived = 0,
            type = null,
            data = "",
            eventName = "message",
            lastEventId = "",
            retrydelay = 1000,
            aborted = false;

        xhr = new XMLHttpRequest();

        // 定义一个事件处理程序
        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 3: processData(); break; // 当数据块到达时
                case 4: reconnect(); break; // 当请求关闭的时候
            }
        };

        // 通过connect() 创建一个长期存在的链接
        connect();

        // 如果链接正常关闭，等待1秒后再次尝试链接
        function reconnect() {
            if(aborted) return;
            if(xhr.status >= 300) return;
            setTimeout(connect, retrydelay);
        }

        function connect() {
            charsReceived = 0;
            type = null;
            xhr.open("GET", url);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            if(lastEventId) xhr.setRequestHeader("Last-Event-ID", lastEventId);
            xhr.send();
        }

        function processData() {
            if(!type) {
                type = xhr.getResponseHeader("Content-Type");
                if(type !== "text/event-stream") {
                    aborted = true;
                    xhr.abort();
                    return;
                }
            }

            // 记录接收的数据
            // 获得响应中未处理的数据
            var chunk = xhr.responseText.substring(charsReceived);
            charsReceived = xhr.responseText.length;

            // 将大块的文本分成多行并遍历它们
            var lines = chunk.replace(/(\r\n|\r|\n)$/,"")
                .split(/\r\n|\r|\n/);
            for(var i = 0; i < lines.length; i++) {
                var line = lines[i], pos = line.indexOf(":"), name, value = "";
                if(pos == 0) continue;
                if(pos > 0) {
                    name = line.substring(0, pos);
                    value = line.substring(pos + 1);
                    if(value.charAt(0) == " ") value = value.substring(1);
                } else
                    name = line;

                switch (name) {
                    case "event": eventName = value;
                        break;
                    case "data": data += value + "\n";
                        break;
                    case "id": lastEventId = value;
                        break;
                    case "retry": retrydelay = parseInt(value) || 1000;
                        break;
                    default: break;
                }
                if(line === "" ) {
                    if(evtsrc.onmessage && data !== "") {
                        // 如果末尾有新行，就裁剪新行
                        if(data.charAt(data.length - 1) == "\n")
                            data = data.substring(0, data.length - 1);
                        evtsrc.onmessage({
                            type: eventName,
                            data: data,
                            origin: url
                        });
                    }
                    data = "";
                }
            }
        }
    };
}
