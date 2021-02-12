'use strict'

const gElIcons = document.querySelector('.icons-container');
// const gTextInput = document.querySelector('.text-input');


function onChangeColor(color) {
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
    gCtx.save();
    gCurrColor = color;
}

function onChangeStroke(color) {
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
    gCtx.save();
    gCurrStroke = color;
}

//////////////////////////Canvas///////////////////////////////


function renderCanvasImg(imgUrl) {
    var image = new Image();
    image.src = imgUrl;
    gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
}

function renderIcon(pos) {
    var image = new Image();
    image.src = gCurrIconUrl;
    gCtx.drawImage(image, pos.x - 50, pos.y - 50, 100, 100);

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

var gFontSize = 40;

function drawText(x, y) {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = gCurrStroke;
    gCtx.fillStyle = gCurrColor;
    gCtx.font = `${gFontSize}px Impact`;
    gCtx.textAlign = gLineAlign;

    if (gLineAlign === 'right') {
        x += 210;
    } else if (gLineAlign === 'left') {
        x -= 210;
    }

    if (gMeme.selectedLineIdx === 1) {
        gCtx.fillText(gMeme.lines[gMeme.lines.length - 1].txt, x, gLineHeight);
        gCtx.strokeText(gMeme.lines[gMeme.lines.length - 1].txt, x, gLineHeight);
        gCtx.fillText(gCurrText.value, x, gSecLineHeight);
        gCtx.strokeText(gCurrText.value, x, gSecLineHeight);

    } else {
        gCtx.fillText(gCurrText.value, x, gLineHeight);
        gCtx.strokeText(gCurrText.value, x, gLineHeight);
    }
}



function draw(ev) {
    const { offsetX, offsetY } = ev;
    drawText(offsetX, offsetY);
}

/////////////////////Touch & Mouse Events///////////////////////

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    addInputListener();
    // window.addEventListener('resize', () => { renderCanvas() });
}

function addInputListener() {
    gCurrText.addEventListener('input', onKeyChange);

}

function addMouseListeners() {
    gElIcons.addEventListener('mousemove', onMove);
    gElIcons.addEventListener('mousedown', onDown);
    gElIcons.addEventListener('mouseup', onUp);
    gCanvas.addEventListener('mouseup', onUp);
    gCanvas.addEventListener('mouseup', onDrop);
}

function addTouchListeners() {
    gElIcons.addEventListener('touchmove', onMove);
    gElIcons.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onDrop);
    gElIcons.addEventListener('touchend', onUp);
}

function onKeyChange(ev) {
    // var currUrl = `img/${gMeme.selectedImgId}.jpg`;
    renderCanvasImg(`img/${gMeme.selectedImgId}.jpg`);
    drawText(gCanvas.width / 2, 60);
    // console.log(ev);
    // return text;
}

function onDrop(ev) {
    const pos = getEvPos(ev);
    renderIcon(pos);
    // const pos = getEvPos(ev);
    // console.log(pos)
    // console.log(ev)

}

var gCurrIconUrl;

function onDown(ev) {
    const pos = getEvPos(ev);
    gCurrIconUrl = ev.target.src;
    // console.log(ev)
}

function onMove(ev) {
    const pos = getEvPos(ev);
}


function onUp(ev) {
    const pos = getEvPos(ev);
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        };
    };
    return pos;
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