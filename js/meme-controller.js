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
        strHTMLs += `<span style="font-size: ${word.count + 15}px" >${word.genre} </span>`;
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
    console.log(imgUrl);
    renderImg(imgUrl);
    renderIcons();
    updategMeme(imgId);
}


///////////////////////////////Icons///////////////////////////////

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

var gIcons = [];
var  gPageIdx  = 0;

createIcons();

function createIcons() {
    for (var i = 0; i < 50; i++) {
        var icon = createIcon(i);
        gIcons.push(icon);
    };
    console.log(gIcons);
}

function createIcon(id) {
    var icon = { idx: id };
    return icon;
}

function getIcons() {
    var  startIdx  =  gPageIdx * 4;    
    return  gIcons.slice(startIdx,  startIdx  +  4)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * 4 >= gIcons.length) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * 4 < 0) {
        gPageIdx = ((gIcons.length - 1) / 4);
    }
}