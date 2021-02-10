'use strict'

var gCanvas;
var gCtx;


function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderMems();
    renderKeyWords();
}


function renderMems() {
    var strHTMLs = gImgs.map(img => {
        return `<div class="grid-item meme-img">
            <img onclick="onEdit(${img.id}) class="img${img.id}" 
            src="img/${img.id}.jpg" alt="meme-img">
        </div>
        `
    });
    var elGallery = document.querySelector('.gallery-grid');
    elGallery.innerHTML = strHTMLs.join('');
}

function renderKeyWords() {
    var keyWords = gKeyWords;
    console.log(keyWords);
    var strHTMLs;
    keyWords.forEach(word => {
        console.log(word);
        strHTMLs += `<span> style="font-size: ${word.value + 10}px"></span>`;
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
    const elHomePage = document.querySelector('.main-page');
    const elEditPage = document.querySelector('.meme-editor');
    elHomePage.classList.add('hidden');
    elEditPage.classList.remove('hidden');
}