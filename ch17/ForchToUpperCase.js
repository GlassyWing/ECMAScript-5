/**
 * Created by manlier on 2016/8/8.
 */

function forceToUpperCase(element) {
    if(typeof element === "string")
        element = document.getElementById(element);

    function upcase(event) {
        this.value = this.value.toUpperCase();
    }

    element.oninput = upcase;
    element.onpropertychange = upcaseOnPropertyChange;

    function upcaseOnPropertyChange(event) {
        var e = event || window.event;
        if(e.propertyName === "value") {
            // 防止递归调用
            this.onpropertychange = null;
            this.value = this.value
                .toUpperCase();
            this.onpropertychange = upcaseOnPropertyChange;
        }
    }
}