'use strict';

let pattern = [];
let userInput = [];
let soundsArr = ['../sounds/red.mp3', '../sounds/yellow.mp3', '../sounds/green.mp3', '../sounds/blue.mp3'];
let gameBtns = document.querySelectorAll('.btn');
let gameStatus = false;


document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' && e.key != 'Alt') {
        handleKey();
    }
});


function handleKey() {
    if (!gameStatus) {
        startMatch();
        gameStatus = true;
    }
}

function randomPattern() {
    let rand = Math.floor(Math.random() * 4);
    return rand;
}

function startMatch() {
    pattern.push(randomPattern());
    new Audio(soundsArr[pattern[0]]).play();
    animate(gameBtns[pattern[pattern.length - 1]]);
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].id = `${i}`;
        gameBtns[i].addEventListener('click', function (e) {
            handleClick(e);
        });
    }
}

function handleClick(e) {
    userInput.push(e.target.id);
    animate(e.target);
    new Audio(soundsArr[e.target.id]).play();
    if (checkMatch()) {
        if (pattern.length == userInput.length) {
            pattern.push(randomPattern());
            setTimeout(function () {
                animate(gameBtns[pattern[pattern.length - 1]]);
            }, 500);
            userInput = [];
        }
    } else {
        new Audio('../sounds/wrong.mp3').play();
        gameStatus = false;
        pattern = [];
        userInput = [];
    }
}

function checkMatch() {
    let check = false;
    for (let i in userInput) {
        if (userInput[i] == pattern[i]) {
            check = true;
        } else {
            return false;
        }
    }
    return check;
}

function animate(obj) {

    obj.classList.add('animate');

    setTimeout(function () {
        obj.classList.remove('animate');
    }, 100);
}