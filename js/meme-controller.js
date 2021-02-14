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

function onFilter(genre) {
    var filtered = gImgs.filter(img => {
        return img.keywords.includes(genre);
    });
    var strHTMLs = filtered.map(img => {
        return `<div class="grid-item meme-img">
            <img onclick="onEdit(${img.id})" class="img${img.id}" src="img/${img.id}.jpg" alt="meme-img">
        </div>`
    });
    var elGallery = document.querySelector('.gallery-grid');
    elGallery.innerHTML = strHTMLs.join('');

}

function onSearch() {
    var searchInput = document.querySelector('.search-input');
    var filtered = gImgs.filter(img => {
        return img.keywords.includes(searchInput.value);
    });
    var strHTMLs = filtered.map(img => {
        return `<div class="grid-item meme-img">
            <img onclick="onEdit(${img.id})" class="img${img.id}" src="img/${img.id}.jpg" alt="meme-img">
        </div>`
    });
    var elGallery = document.querySelector('.gallery-grid');
    elGallery.innerHTML = strHTMLs.join('');
    if (searchInput.value === '') onGallery();

}
// function onSearch() {
//     var strHTMLs = gImgs.filter(img => {
//         var searchInput = document.querySelector('.search-input');
//         if (img.keywords.includes(searchInput.value)) {
//             return `<div class="grid-item meme-img">
//                 <img onclick="onEdit(${img.id})" class="img${img.id}" src="img/${img.id}.jpg" alt="meme-img">
//                 </div>`
//         }
//     });
//     var elGallery = document.querySelector('.gallery-grid');
//     elGallery.innerHTML = strHTMLs.join('');

// }

function onGrow(elKeyWord, keyword) {
    var match = gKeyWords.find(({ genre }) => genre === keyword);
    if (match.popularity === 30) return;
    console.log('match', match);
    match.popularity += 2;
    elKeyWord.style = `font-size: ${match.popularity + match.count}px`;
}

function onShowMore(elBtn) {
    var elKeyWords = document.querySelector('.key-words');
    // elKeyWords.style = 'overflow: visible; width: 400px';
    elBtn.innerHTML = 'Less';
    if (elKeyWords.classList.contains('shown')) {
        elBtn.innerHTML = 'More';
        elKeyWords.classList.remove('shown');
        console.log(elKeyWords.classList);
        ////// למה לא עובד הREMOVE?

    } else {
        elKeyWords.classList.add('shown');
    }
}

function renderKeyWords() {
    var keyWords = gKeyWords;
    var strHTMLs = ``;
    keyWords.forEach(word => {
        strHTMLs += `<span class="kw ${word.genre}" onclick="onFilter('${word.genre}'); onGrow(this, '${word.genre}')" style="font-size: ${word.count + word.popularity}px" >${word.genre} </span>`;
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


function reset() {
    gCanvasIcons = [];
    gMeme = [];
    gCurrStroke = 'black';
    gCurrColor = 'white';
    var elStrokeColor = document.querySelector('.stroke-color');
    var elTextColor = document.querySelector('.text-color');
    elStrokeColor.value = '#000000';
    elTextColor.value = '#ffffff';
    gCurrText.value = '';

}

function onGallery() {
    renderMems();
    var elMainPage = document.querySelector('.main-page');
    var elEditPage = document.querySelector('.meme-editor');
    elMainPage.classList.remove('hidden');
    elEditPage.classList.add('hidden');
    reset();
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
    // gFontSize += 2;
    gMeme.lines[gMeme.selectedLineIdx].size += 2;
    var currUrl = `img/${gMeme.selectedImgId}.jpg`;
    renderCanvasImg(currUrl);
    drawText(gCanvas.width / 2, gLineHeight);

}

function onDecFont() {
    // gFontSize -= 2;
    // gMeme.lines[0].size = gFontSize;
    gMeme.lines[gMeme.selectedLineIdx].size -= 2;

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


function onChangeColor(color) {
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
    gCtx.save();
    gCurrColor = color;
    renderCanvasImg(`img/${gMeme.selectedImgId}.jpg`);
    drawText(gCanvas.width / 2, gLineHeight);

}

function onChangeStroke(color) {
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
    gCtx.save();
    gCurrStroke = color;
    renderCanvasImg(`img/${gMeme.selectedImgId}.jpg`);
    drawText(gCanvas.width / 2, gLineHeight);
}

function onSetFont(font) {
    gMeme.selectedFont = font;
    gCtx.font = `${gFontSize}px ${font}`;
    renderCanvasImg(`img/${gMeme.selectedImgId}.jpg`);
    drawText(gCanvas.width / 2, gLineHeight);
}


///////////////////////////////Icons///////////////////////////////


var gIcons = [];
var gCanvasIcons = [];
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