/**
 * Created by manlier on 2016/8/8.
 */

/**
 * @callback bindCallback
 * @param {KeyboardEvent} event
 * @param {string} keyid
 */

/**
 * 这个类的实例表示按键标识符到处理程序函数的映射
 * Keymap能配置到HTML元素上以处理keydown事件
 * 当此类事件发生时，Keymap会使用它的映射来调用合适的处理程序
 *
 * @param {{}=} bindings
 *      此对象的属性名是按键标识符，而属性值是处理程序函数
 * @constructor
 */
function Keymap(bindings) {
    this.map = {}; // 定义按键标识符->处理程序映射
    if(bindings) {
        for(var name in bindings)
            this.bind(name,bindings[name]);
    }
}

/**
 * 绑定指定的按键标识符和指定的程序函数
 * @param {string} key
 * @param {bindCallback} func
 */
Keymap.prototype.bind = function (key, func) {
    this.map[Keymap.normalize(key)] = func;
};

/**
 * 解除指定按键标识和指定的处理函数
 * @param {string} key
 */
Keymap.prototype.unbind = function (key) {
    delete this.map[Keymap.normalize(key)];
};

/**
 * 在指定的HTML元素上配置Keymap
 * @param {Element} element
 */
Keymap.prototype.install = function (element) {
    var keymap = this;

    function handler(event) {
        return keymap.dispatch(event, element);
    }

    if(element.addEventListener)
        element.addEventListener("keydown", handler, false);
    else if(element.attachEvent)
        element.attachEvent("onkeydown", handler);
};

/**
 * 这个方法基于Keymap绑定分派按键事件
 * @param {KeyboardEvent} event
 * @param {Element} element
 * @returns {*}
 */
Keymap.prototype.dispatch = function (event, element) {
    var modifiers = "";
    var keyname = null;

    if(event.altKey) modifiers += "alt_";
    if(event.ctrlKey) modifiers += "ctrl_";
    if(event.metaKey) modifiers += "meta_";
    if(event.shiftKey) modifiers += "shift_";

    if(event.key) keyname = event.key;
    else if(event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+")
        keyname = event.keyIdentifier;
    else
        keyname = Keymap.keyCodeToKeyName[event.keyCode];

    // 如果不能找出键名，只能返回忽略这个事件
    if(!keyname) return;

    var keyid = modifiers + keyname.toLowerCase();

    var handler = this.map[keyid];

    if(handler) {
        var retval = handler.call(element, event, keyid);

        // 如果处理程序返回false, 取消默认操作并阻止冒泡
        if(retval === false) {
            if(event.stopPropagation)
                event.stopPropagation();
            else event.cancelBubble = true;
            if(event.preventDefault)
                event.preventDefault();
            else
                event.returnValue = false;
        }

        return retval;
    }
};

/**
 * 格式化按键id
 * @param {string} keyid
 * @returns {string}
 */
Keymap.normalize = function (keyid) {
    keyid = keyid.toLowerCase();
    var words = keyid.split(/\s+|[\-+_]/);
    var keyname = words.pop();
    keyname = Keymap.aliases[keyname] || keyname;
    words.sort();
    words.push(keyname);
    return words.join("_");
};

/**
 * 工厂函数，为元素绑定按键事件处理程序
 * @param {{}} bindings
 * @param {Element} element
 */
Keymap.createKeymap = function (bindings, element) {
    new Keymap(bindings).install(element);
};

Keymap.aliases = {        // Map common key aliases to their "official"
    "escape":"esc",       // key names used by DOM Level 3 and by
    "delete":"del",       // the key code to key name map below.
    "return":"enter",     // Both keys and values must be lowercase here.
    "ctrl":"control",
    "space":"spacebar",
    "ins":"insert"
};

// The legacy keyCode property of the keydown event object is not standardized
// But the following values seem to work for most browsers and OSes.
Keymap.keyCodeToKeyName = {
    // Keys with words or arrows on them
    8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
    19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Spacebar", 33:"PageUp",
    34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right",
    40:"Down", 45:"Insert", 46:"Del",

    // Number keys on main keyboard (not keypad)
    48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",

    // Letter keys. Note that we don't distinguish upper and lower case
    65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
    74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
    83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",

    // Keypad numbers and punctuation keys. (Opera does not support these.)
    96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
    106:"Multiply", 107:"Add", 109:"Subtract", 110:"Decimal", 111:"Divide",

    // Function keys
    112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6",
    118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12",
    124:"F13", 125:"F14", 126:"F15", 127:"F16", 128:"F17", 129:"F18",
    130:"F19", 131:"F20", 132:"F21", 133:"F22", 134:"F23", 135:"F24",

    // Punctuation keys that don't require holding down Shift
    // Hyphen is nonportable: FF returns same code as Subtract
    59:";", 61:"=", 186:";", 187:"=", // Firefox and Opera return 59,61
    188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
};