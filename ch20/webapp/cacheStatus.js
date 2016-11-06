/**
 * Created by manlier on 2016/9/25.
 */
function status(msg) {
    console.log(msg);
}

window.applicationCache.addEventListener("checking",function (e) {
    status("Checking for a new version.");
    e.preventDefault();
});

window.applicationCache.addEventListener("noupdate", function (e) {
    status("The version is up-to-date")
    e.preventDefault();
});

window.applicationCache.addEventListener("downloading", function (e) {
    status("Downloading new version")
    window.progresscount = 0;
    e.preventDefault();
});

window.applicationCache.addEventListener("progress", function (e) {
    var progress = "";
    if(e && e.lenghComputable)
        progress = " " + Math.round(100 * e.loaded / e.total) + "%";
    else
        progress = "(" + progresscount++  + ")";
    status("Downloading new version" + progress);
    e.preventDefault();
});

window.applicationCache.addEventListener("cached", function (e) {
    status("This application is now cached locally");
    e.preventDefault();
});

window.applicationCache.addEventListener("updateready",function (e) {
    status("A new version has been downloaded. Reload to run it");
    e.preventDefault();
});

window.applicationCache.addEventListener("error", function (e) {
    status("Couldn't load manifest or cache application")
    e.preventDefault();
});

window.applicationCache.addEventListener("obsolete", function (e) {
    status("This application is no longer cached. " + "Reload to get the latest version from the network");
    e.preventDefault();
})