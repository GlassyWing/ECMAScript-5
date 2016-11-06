/**
 * Created by manlier on 2016/9/11.
 */
function postMessage(msg) {
    var request = new XMLHttpRequest();
    request.open("POST", "/log.jsp");
    request.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
    request.send(msg);
}

/**
 * @callback requestCallback
 * @param {string} responseText
 */
/**
 * 发出一个HTTP GET请求以获得指定URL的内容
 * 当响应成功到达，验证它是否是纯文本
 * 如果是，把它传递给指定回调函数
 * @param {string} url
 * @param {requestCallback} [callback]
 */
function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if(type.match(/^text/))
                callback(request.responseText);
        }
    };
    request.send(null);
}

/**
 * 发起同步的HTTP GET请求以获得指定的URL内容
 * 返回响应文本，如果不成功或不是文本格式则报错
 * @param {string} url
 * @returns {string}
 */
function getTextSync(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    if(request.status !== 200) throw new Error(request.statusText);

    var type = request.getResponseHeader("Content-Type");
    if(!type.match(/^text/))
        throw new Error("Expected textual response; got: " +type);

    return request.responseText;
}

/**
 * 发起HTTP GET请求以获取指定URL的内容
 * 当相应到达时，把它以解析后的XML Document对象、解析后的
 * JSON对象或字符串形式传递给回调函数
 * @param {string} url
 * @param {function=} callback
 */
function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            console.log(type);
            if(type.indexOf("xml") !== -1 && request.responseXML)
                callback && callback(request.responseXML);
            else if(type.match(/application\/json/))
                callback && callback(JSON.parse(request.responseText));
            else
                callback && callback(request.responseText);
        }
    };
    request.send(null);
}

/**
 * 编码对象的属性，
 * 如果它们是来自HTML表单的名值对
 * 使用application/x-www-form-urlencoded
 * 格式
 * @param data
 * @returns {*}
 */
function encodeFormData(data) {
    if(!data) return "";
    var pairs = [];
    for(var name in data) {
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name] === "function")
            continue;
        var value = data[name].toString();
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20","+"));
        pairs.push(name + "=" + value);
    }
    return pairs.join("&");
}

/**
 * 使用表单编码数据发起一个HTTP POST请求
 * @param {string} url
 * @param {{}} data
 * @param {function=} callback
 */
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && callback) callback(request);
    };
    request.setRequestHeader("Content-Type", "application/x-www.form-urlencoded");
    request.send(encodeFormData(data));
}

/**
 * 使用表单编码数据发起GET请求
 * @param {string} url
 * @param {{}} data
 * @param {function=} callback
 */
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url + "?" +
            encodeFormData(data));
    request.onreadystatechange = function () {
        if(request.readyState === 4 && callback) callback(request);
    };
    request.send(null);
}

/**
 * 使用JSON编码主体来发起HTTP POST请求
 * @param {string} url
 * @param {{}} data
 * @param {function=} callback
 */
function postJSON(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && callback)
            callback(request);
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}

/**
 * 使用POST方法发送multipart/form-data请求主体
 * @param {string} url
 * @param {{}} data
 * @param {function=} callback
 */
function postFormData(url, data, callback) {
    if(typeof FormData === "undefined")
        throw new Error("FormData is not implemented");

    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && callback)
            callback(request);
    };
    var formData = new FormData();
    for(var name in data) {
        if(!data.hasOwnProperty(name)) continue;
        var value = data[name];
        if(typeof value === "function") continue;
        formData.append(name, value);
    }

    request.send(formData);
}