'use strict'

var gCanvas;
var gCtx;

var gCurrColor = 'white';
var gCurrStroke = 'black';
var gCurrText = document.querySelector('.text-input');



function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderMems();
    renderKeyWords();
    addListeners();
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
        strHTMLs += `<span class="kw" onclick="onFilter(${word.genre})" style="font-size: ${word.count + 15}px" >${word.genre} </span>`;
    });
    var elKeyWords = document.querySelector('.key-words');
    elKeyWords.innerHTML = strHTMLs;
}

function onEdit(imgId) {
    var elMainPage = document.querySelector('.main-page');
    var elEditPage = document.querySelector('.meme-editor');
    elMainPage.classList.add('hidden');
    elEditPage.classList.remove('hidden');
    var imgObj = getImgById(imgId);
    var imgUrl = imgObj.url;
    renderCanvasImg(imgUrl);
    renderIcons();
    gMeme = createMeme(imgId);
}


function onGallery() {
    var elMainPage = document.querySelector('.main-page');
    var elEditPage = document.querySelector('.meme-editor');
    elMainPage.classList.remove('hidden');
    elEditPage.classList.add('hidden');
}

function onChangeLine() {
    changeLine();

}

function onMoveUp() {
    moveUp();
}

function onMoveDown() {
    moveDown();
}

function onAddLine() {
    addLine();
}

function onIncFont() {
    gFontSize += 2;
    gMeme.lines[0].size = gFontSize;
    var currUrl = `img/${gMeme.selectedImgId}.jpg`;
    renderCanvasImg(currUrl);
    drawText(gCanvas.width / 2, gLineHeight);

}

function onDecFont() {
    gFontSize -= 2;
    gMeme.lines[0].size = gFontSize;
    var currUrl = `img/${gMeme.selectedImgId}.jpg`;
    renderCanvasImg(currUrl);
    drawText(gCanvas.width / 2, gLineHeight);
}

var gLineAlign = 'center';

function alignText(direction) {
    if (direction === 'center') gLineAlign = 'center';
    if (direction === 'left') gLineAlign = 'left';
    if (direction === 'right') gLineAlign = 'right';
    gMeme.lines[0].align = direction;
    renderCanvasImg(`img/${gMeme.selectedImgId}.jpg`);
    drawText(gCanvas.width / 2, gLineHeight);
}

function onDelete() {
    console.log(gMeme.selectedLineIdx)
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderCanvasImg(`img/${gMeme.selectedImgId}.jpg`);
    drawText(gCanvas.width / 2, gLineHeight);
}

///////////////////////////////Icons///////////////////////////////


var gIcons = [];
var  gPageIdx  = 0;

createIcons();

function onNextPage() {
    nextPage();
    renderIcons();
}

function onPrevPage() {
    prevPage();
    renderIcons();
}

function renderIcons() {
    var icons = getIcons();
    var strHtmls = icons.map(function(icon) {
        return `<td><img class="icon" src="img/icons/${icon.idx}.png" alt="${icon.idx}"></td>`;
    });
    var elIcons = document.querySelector('.icon-table-row');
    elIcons.innerHTML = strHtmls.join('');
}