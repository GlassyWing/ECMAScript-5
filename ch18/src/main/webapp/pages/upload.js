/**
 * Created by manlier on 2016/9/16.
 */
whenReady(function () {
    var elts = document.getElementsByClassName("fileDropTarget");
    for(var i = 0; i < elts.length;i++) {
        var target = elts[i];
        var url = target.getAttribute("data-uploadto");
        if(!url) continue;
        createFileUploadDropTarget(target, url);
    }

    function createFileUploadDropTarget(target, url) {
        // 跟踪当前是否正在上传，使能够拒绝上传
        var uploading = false;

        console.log(target, url);

        target.ondragenter = function (e) {
            console.log("dragenter");
            if(uploading) return; // 若正在忙，忽略拖放
            var types = e.dataTransfer.types;
            if(types &&
                ((types.contains && types.contains("Files")) ||
                (types.indexOf && types.indexOf("Files") !== -1))
            ) {
                target.classList.add("wantdrop");
                return false;
            }
        };
        target.ondragover = function (e) {
            if(!uploading) return false;
        };
        target.ondragleave =function (e) {
            if(!uploading) target.classList.remove("wantdrop");
        };
        target.ondrop = function (e) {
            if(uploading) return false;
            var files = e.dataTransfer.files;
            if(files && files.length) {
                uploading = true;
                var message = "Uploading files: <ul>";
                for(var i = 0; i < files.length;i ++)
                    message += "<li>" + files[i].name + "</li>";
                message += "</ul>";

                target.innerHTML = message;
                target.classList.remove("wantdrop");
                target.classList.add("uploading");

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                var body = new FormData();
                for(var i = 0; i < files.length; i++)
                    body.append(i, files[i]);
                xhr.upload.onprogress = function (e) {
                    if(e.lengthComputable) {
                        target.innerHTML = message +
                            Math.round(e.loaded / e.total * 100) + "% Complete";
                    }
                };
                xhr.upload.onload = function (e) {
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Drop files to upload";
                };
                xhr.send(body);

                return false;
            }
            target.classList.remove("wantdrop");
        }
    }
});