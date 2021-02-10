'use strict'

var gCanvas;
var gCtx;


function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderMems();
    renderKeyWords();
    console.log('ho')
};


function renderMems() {
    var strHTMLs = gImgs.map(img => {
        return `<div class="grid-item meme-img">
            <img onclick="onEdit(${img.id})" class="img${img.id}" src="img/${img.id}.jpg" alt="meme-img">
        </div>`
    });
    var elGallery = document.querySelector('.gallery-grid');
    elGallery.innerHTML = strHTMLs.join('');
}

function renderKeyWords() {
    var keyWords = gKeyWords;
    var strHTMLs = ``;
    keyWords.forEach(word => {
        strHTMLs += `<span style="font-size: ${word.count + 15}px" >${word.genre} </span>`;
    });
    var elKeyWords = document.querySelector('.key-words');
    elKeyWords.innerHTML = strHTMLs;
}


function rendergMeme() {
    var img = getImg();
    var elImg = new Image();
    drawImg(elImg, img);
    elImg.src = img.url;
}

function drawImg(elImg, img) {
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
    }
};


function onEdit() {
    var elMainPage = document.querySelector('.main-page');
    var elEditPage = document.querySelector('.meme-editor');
    elMainPage.classList.add('hidden');
    elEditPage.classList.remove('hidden');
}