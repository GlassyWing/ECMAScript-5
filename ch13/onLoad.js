/**
 * Created by manlier on 2016/8/1.
 */
function onLoad(f) {
    if(onLoad.loaded)
        window.setTimeout(f, 0);
    else if(window.addEventListener)
        window.addEventListener("load", f, false);
    else if(window.attachEvent)
        window.attachEvent("onload", f);
}

onLoad.loaded = false;
onLoad(function () {
    onLoad.loaded = true;
});