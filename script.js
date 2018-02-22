const btnRed = document.getElementById("red");
const btnGreen = document.getElementById("green");
const btnBlue = document.getElementById("blue");
const btnYellow = document.getElementById("yellow");
const btnStart = document.getElementById("startbutton");
let btnStrict = document.getElementById("strictmode");

var db = 'https://dl.dropboxusercontent.com/s/';
var aud_src = ['kbgd2jm7ezk3u3x/hihat.mp3', 'h2j6vm17r07jf03/snare.mp3', '1cdwpm3gca9mlo0/kick.mp3', 'h8pvqqol3ovyle8/tom.mp3'];

var audioRed = new Audio(db + aud_src[0]);
var audioGreen = new Audio(db + aud_src[1]);
var audioBlue = new Audio(db + aud_src[2]);
var audioYellow = new Audio(db + aud_src[3]);

btnStart.addEventListener("click", startGame);

btnStrict.addEventListener("click", changeMode);

function changeMode() {
    if (gameParameters.strictMode === false) {
        gameParameters.strictMode = true;
        btnStrict.textContent = "YES";
    } else {
        gameParameters.strictMode = false;
        btnStrict.textContent = "NO";  
    }
}

const register = document.getElementById("register");

let gameParameters = {
    colors: ["red", "green", "blue", "yellow"],
    playerPattern: [],
    gamePattern: [],
    counter: 0,
    strictMode: false
}

function startGame() {
    clearParameters();
    
    btnStart.removeEventListener("click", startGame);
    
    btnRed.addEventListener("click", addToPlayerPattern);
    btnGreen.addEventListener("click", addToPlayerPattern);
    btnBlue.addEventListener("click", addToPlayerPattern);
    btnYellow.addEventListener("click", addToPlayerPattern);

    btnStart.style.color = "#ccc";
}

function clearParameters() {
    gameParameters.counter = 0;
    register.textContent = "--";
    
    gameParameters.gamePattern = [];
    
    startCounting();
}

function startCounting() {
    gameParameters.counter++;
    register.textContent = gameParameters.counter;
    
    nextGamePattern();
}

function nextGamePattern() {
    gameParameters.gamePattern.push(gameParameters.colors[Math.floor(Math.random() * 4)]);
    
    showGamePattern();
}


function showGamePattern() {
    let i = 0;
    let displayPattern = setInterval(() => {
        playGame(gameParameters.gamePattern[i]);

        i++;
        
        if (i >= gameParameters.gamePattern.length) {
            clearInterval(displayPattern);
        }
    }, 500)
    
    clearPlayer();
}

function playGame(square) {
    switch(square) {
        case "red":
            $("#red").addClass("btnhover");
            audioRed.pause();
            audioRed.currentTime = 0;
            audioRed.play(); //SOUNDS;
            setTimeout(() => {
                $("#red").removeClass("btnhover");
            }, 200);            
            break;
        case "green":
            $("#green").addClass("btnhover");
            audioGreen.pause();
            audioGreen.currentTime = 0;
            audioGreen.play(); //SOUNDS;
            setTimeout(() => {
                $("#green").removeClass("btnhover");
            }, 200);
            break;
        case "blue":
            $("#blue").addClass("btnhover");
            audioBlue.pause();
            audioBlue.currentTime = 0;
            audioBlue.play(); //SOUNDS;
            setTimeout(() => {
                $("#blue").removeClass("btnhover");
            }, 200);
            break;
        case "yellow":
            $("#yellow").addClass("btnhover");
            audioYellow.pause();
            audioYellow.currentTime = 0;
            audioYellow.play(); //SOUNDS;
            setTimeout(() => {
                $("#yellow").removeClass("btnhover");
            }, 200);
            break;
    }
}

function clearPlayer() {
    gameParameters.playerPattern = [];
}

function addToPlayerPattern(e) {
    gameParameters.playerPattern.push(e.target.id);
    playerTurn(e.target.id);
}

function playerTurn(pad) {
    if (gameParameters.playerPattern[gameParameters.playerPattern.length-1] !== gameParameters.gamePattern[gameParameters.playerPattern.length-1]) {
        if (gameParameters.strictMode) {
            alert("Wrong, start again");
            startGame();
        } else {
            alert("Wrong, try again");
            showGamePattern();
        }
    } else {
        switch(pad) {
            case "red":
                $("#red").addClass("btnhover");
                audioRed.pause(); 
                audioRed.currentTime = 0;        
                audioRed.play(); //SOUNDS;
                setTimeout(() => {
                    $("#red").removeClass("btnhover");
                }, 200);            
                break;
            case "green":
                $("#green").addClass("btnhover");
                audioGreen.pause();
                audioGreen.currentTime = 0;
                audioGreen.play(); //SOUNDS;
                setTimeout(() => {
                    $("#green").removeClass("btnhover");
                }, 200);
                break;
            case "blue":
                $("#blue").addClass("btnhover");
                audioBlue.pause();
                audioBlue.currentTime = 0;
                audioBlue.play(); //SOUNDS;
                setTimeout(() => {
                    $("#blue").removeClass("btnhover");
                }, 200);
                break;
            case "yellow":
                $("#yellow").addClass("btnhover");
                audioYellow.pause();
                audioYellow.currentTime = 0;
                audioYellow.play(); //SOUNDS;
                setTimeout(() => {
                    $("#yellow").removeClass("btnhover");
                }, 200);
                break;
        }
        
        let checkGameStatus = (gameParameters.gamePattern.length == gameParameters.playerPattern.length);
        if (checkGameStatus) {
            if (gameParameters.counter > 4) {
                alert("Congrats! You've won!");
                startGame();
            } else {
                setTimeout(nextRound, 1500);
            }            
        }
    }
}

function nextRound() {
    startCounting();
}

