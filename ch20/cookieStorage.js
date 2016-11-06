/**
 * Created by manlier on 2016/9/21.
 */
function cookieStorage(maxage, path) {

    var cookie = (function () {
        var cookie = {};
        var all = document.cookie;
        if(all == "")
            return cookie;
        var list = all.split("; ");
        for(var i = 0; i < list.length; i++) {
            var cookie = list[i];
            var p = cookie.indexOf("=");
            var name = cookie.substring(0, p);
            var value = cookie.substr(p + 1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    })();

    var keys = [];
    for(var key in cookie) keys.push(key);

    this.length = keys.length;

    this.key = function (n) {
        if(n < 0 || n >= keys.length) return null;
        return keys[n];
    };

    this.getItem = function (name) {
        return cookie[name] || null;
    };

    this.setItem = function (key, value) {
        if(!(key in cookie)) {
            keys.push(key);
            this.length++;
        }

        cookie[key] = value;

        var cookie = key + "=" + encodeURIComponent(value);

        if(maxage) cookie += "; max-age=" + maxage;
        if(path) cookie += "; path=" + path;

        document.cookie = cookie;
    };

    this.removeItem = function (key) {
        if(!(key in cookie)) return;

        delete cookie[key];

        for(var i = 0; i < keys.length; i++) {
            if(keys[i] === key) {
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;

        document.cookie = key + "=; max-age=0";
    };

    this.clear = function () {
        for(var i = 0; i < keys.length; i++)
            document.cookie = keys[i] + "=; max-age=0";
        cookie = {};
        keys = [];
        this.length = 0;
    }
}