/**
 * Created by manlier on 2016/8/5.
 */
function scale(e, factor) {
    var size = parseInt(window.getComputedStyle(e,"").fontSize);

    e.style.fontSize = factor * size + "px";
}

function scaleColor(e, factor) {
    var color = window.getComputedStyle(e, "").backgroundColor;
    var components = color.match(/\d+/g);
    for(var i = 0; i < 3; i++) {
        var x = Number(components[i]) * factor;
        x = Math.round(Math.min(Math.max(x, 0), 255));
        components[i] = String(x);
    }
    if(components.length == 3)
        e.style.backgroundColor = "rgb(" + components.join() + ")";
    else
        e.style.backgroundColor = 'rgba(' +
                components.join() + ")";
}