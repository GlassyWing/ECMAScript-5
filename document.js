/**
 * 返回元素e的第n层祖先元素，如果不存在此类祖先或祖先不是
 * Element(Document或DocumentFragment)则返回null
 * @param {Node} e
 * @param {number} n
 * @returns {Node|null}
 */
function parent(e, n) {
    if (n === undefined) n = 1;
    while (n-- && e) e = e.parentNode;
    if (!e || e.nodeType !== 1) return null;
    return e;
}

/**
 * 返回元素e的第n个兄弟元素
 * @param {Node|Element} e
 * @param {number} n 如果n为正，返回后续的第n个兄弟元素
 * 如果n为负，返回前面的第n个兄弟元素
 * 如果n为零，返回e本身
 * @returns {Element|null}
 *
 */
function sibling(e, n) {
    while (e && n !== 0) {
        if (n > 0) {
            if (e.nextElementSibling) e = e.nextElementSibling;
            else {
                //noinspection StatementWithEmptyBodyJS
                for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling)
                    /*empty*/;
            }
            n--;
        } else {
            if (e.previousElementSibling) e = e.previousElementSibling;
            else {
                //noinspection StatementWithEmptyBodyJS
                for (e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling)
                    /*empty*/;
            }
            n++;
        }
    }
    return e;
}

/**
 * 返回元素e的第n个子元素，如果不存在则返回null
 * @param {Element|Node}e
 * @param {number} n
 * @returns {Element|null}
 */
function child(e, n) {
    if (e.children) {
        if (n < 0) n += e.children.length;
        if (n < 0) return null;
        return e.children[n];
    }

    if (n >= 0) {
        if (e.firstElementChild) e = e.firstElementChild;
        else {
            //noinspection StatementWithEmptyBodyJS
            for (e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling) /*empty*/;
        }
        return sibling(e, n);
    } else {
        if (e.lastElementChild) e = e.lastElementChild;
        else {
            //noinspection StatementWithEmptyBodyJS
            for (e = e.lastChild; e && e.nodeType !== 1; e = e.previousSibling) /*empty*/;
        }
        return sibling(e, n + 1);
    }
}

/**
 * 用于获取或设置元素的文本值
 * @param {Element} element
 * @param {string} [value] 若存在该参数，
 * 将设置其文本值，否则即获得文本
 * @returns {*}
 */
function textContent(element, value) {
    var content = element.textContent;
    if (value === undefined) {
        if (content != null) return content;
        else return element.innerText;
    } else {
        if (content !== undefined) element.textContent = value;
        else element.innerText = value;
    }
}

/**
 * 查找元素的后代节点中所有的Text节点
 * 返回元素e的纯文本内容，递归进入其子元素
 * @param {Element} e
 * @returns {string}
 */
function text(e) {
    var child, type, s = "";
    for (child = e.firstChild; child != null; child = child.nextSibling) {
        type = child.nodeType;
        if (type === 3 || type === 4)
            s += child.nodeValue;
        else if (type === 1)
            s += text(child);
    }
    return s;
}

/**
 * 将child节点插入到parent中，使其称为第n个子节点
 * @param {Node} parent
 * @param {Node} child
 * @param {number} n
 */
function insertAt(parent, child, n) {
    if (n < 0 || n > parent.childNodes.length) throw new Error("invalid index");
    else if (n === parent.childNodes.length) parent.appendChild(child);
    else parent.insertBefore(child, parent.childNodes[n]);
}

/**
 * 倒序排列节点n的子节点
 * @param {Element} n
 */
function reverse(n) {
    var f = document.createDocumentFragment();
    while (n.lastChild)
        f.appendChild(n.lastChild);
    n.appendChild(f);
}

/**
 * 查询窗口滚动条的位置
 * @param {Window} [w]
 * @returns {{x:number, y:number}}
 */
function getScrollOffsets(w) {
    w = w || window;

    if (w.pageXOffset != null) {
        return {x: w.pageXOffset, y: w.pageYOffset};
    }

    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    return {x: d.body.scrollLeft, y: d.body.scrollTop}
}

/**
 * 查询窗口的视口尺寸
 * @param {Window} w
 * @returns {{w:number, h:number}}
 */
function getViewportSize(w) {
    w = w || window;

    if (w.innerWidth != null) {
        return {w: w.innerWidth, h: w.innerHeight}
    }

    var d = w.document;
    if (document.compatMode === "CSS1Compat")
        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

        return {w: d.body.clientWidth, h: d.body.clientHeight}
}

/**
 * 返回元素的文档坐标，用于老式浏览器
 * @param {Element} e
 * @returns {{x: number, y: number}}
 */
function getElementPosition(e) {
    var x = 0, y = 0;
    while(e != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return {x: x, y: y};
}

/**
 * 返回e的视口坐标（用于老式浏览器）
 * @param {Element} elt
 * @returns {{x: number, y: number}}
 */
function getElementPos(elt) {
    var x = 0, y = 0;
    for(var e = elt; e != null; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }

    for(var e = elt.parentNode; e && e.nodeType == 1; e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x:x, y:y};
}