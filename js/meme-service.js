'use strict'
var gSavedMemes = [];

var gKeyWords;

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        font: 'Impact',
        color: 'red',
        strokeColor: 'black'
    }]
};

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animals', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animals', 'cute', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['animals', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['explain', 'classics'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'explain', 'classics'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy', 'politics'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'sport', 'explain'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'explain'] },
    { id: 13, url: 'img/13.jpg', keywords: ['movies', 'explain'] },
    { id: 14, url: 'img/14.jpg', keywords: ['explain', 'classics', 'movies'] },
    { id: 15, url: 'img/15.jpg', keywords: ['movies', 'explain'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'movies'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'explain', 'movies'] },
];

_createKeyWords();

function _createKeyWords() {
    var keyWords = loadFromStorage('key-words');
    if (!keyWords) {
        gKeyWords = [
            { genre: 'animals', count: 3 },
            { genre: 'funny', count: 8 },
            { genre: 'politics', count: 4 },
            { genre: 'movies', count: 5 },
            { genre: 'sport', count: 1 },
            { genre: 'baby', count: 4 },
            { genre: 'explain', count: 8 },
            { genre: 'classics', count: 3 }
        ];
        saveToStorage('key-words', gKeyWords);
    } else {
        gKeyWords = keyWords;
    };
};

function createMeme(imgId) {
    var meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        selectedFont: 'Impact',
        lines: [createLine()]
    };
    return meme;
}

function createLine() {
    var line = {
        txt: gCurrText.value,
        size: 40,
        align: 'center',
        color: 'white',
        strokeColor: 'black'
    }
    return line;
};

function getImg() {
    var imgId = gMeme.selectedImgId;
    var img = getImgById(imgId);
    return img;
};

function getImgById(imgId) {
    var img = gImgs.find((Img) => {
        return imgId === Img.id;
    });
    return img;
};


// function updategMeme(imgId) {
//     gMeme = createMeme(imgId);
// };

///////////////////////////////Edit-Funcs///////////////////////////////
var gLineHeight = 60;

function moveUp() {
    gLineHeight -= 5;
    var currUrl = `img/${gMeme.selectedImgId}.jpg`;
    renderCanvasImg(currUrl);
    drawText(gCanvas.width / 2, gLineHeight);
}

function moveDown() {
    gLineHeight += 5;
    var currUrl = `img/${gMeme.selectedImgId}.jpg`;
    renderCanvasImg(currUrl);
    drawText(gCanvas.width / 2, gLineHeight);
}

function addLine() {
    var newLine = createLine();
    gMeme.lines.push(newLine);
    console.log(gMeme)
    drawText(gCanvas.width / 2, gLineHeight + 160);

}



///////////////////////////////Icons///////////////////////////////

function createIcons() {
    for (var i = 0; i < 50; i++) {
        var icon = createIcon(i);
        gIcons.push(icon);
    };
    // console.log(gIcons);
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
    if (gPageIdx * 4 <= 0) {
        gPageIdx = ((gIcons.length - 1) / 4);
    }
}