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
        'fill-color': 'red',
        'stroke-color': 'black'
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
        gKeyWords = { 'animals': 3, 'funny': 8, 'explain': 8, 'politics': 4, 'movies': 5, 'sport': 1, 'baby': 4, 'classics': 3 }
        saveToStorage('key-words', gKeyWords);
    } else {
        gKeyWords = keyWords;
    };
};

function createMeme(imgId = 1) {
    var meme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        selectedFont: 'Impact',
        lines: [createLine()]
    }
    return meme;
}

function createLine() {
    var line = {
        txt: '"Type Something"',
        size: 35,
        align: 'center',
        'fill-color': 'white',
        'stroke-color': 'black'
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