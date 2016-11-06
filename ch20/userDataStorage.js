/**
 * Created by manlier on 2016/9/22.
 */
function UserDataStorage(maxage) {
    // 创建一个document元素并附加userData行为
    // 因此钙元素获得save()和load()方法
    var memory = document.createElement("div");
    memory.style.display = "none";
    memory.style.behavior = "url('#default#userData')";
    document.body.appendChild(memory);

    // 如果传递了maxage参数（单位为秒），则将其设置为userData的有效期，以毫秒为单位
    if(maxage) {
        var now = new Date().getTime();
        var expires = now = maxage * 1000;
        memory.expires = new Date(expires).toUTCString();
    }

    // 通过载入存储的数据来初始化memory元素
    // 参数是任意的，只要是在保存的时候存在就可以了
    memory.load("UserDataStorage");

    this.getItem = function (key) {
        return memory.getAttribute(key) || null;
    };
    this.setItem = function (key, value) {
        memory.setAttribute(key, value);
        memory.save("UserDataStorage");
    };
    this.removeItem = function (key) {
        memory.removeAttribute(key);
        memory.save("UserDataStorage");
    }
}