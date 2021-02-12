'use strict'
//////////////////////////Canvas///////////////////////////////


function renderCanvasImg(imgUrl) {
    var image = new Image();
    image.src = imgUrl;
    gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function drawText() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    context.font = "40px 'Segoe UI'";
    context.strokeText("HTML5 Rocks!", 20, 100);
}

function drawImage() {

    var img = new Image();
    img.src = "img/koala.jpg";

    img.onload = function() {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}

/////////////////////////Upload-Download///////////////////////


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvasImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}



// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(function(res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function(err) {
            console.error(err)
        })
}