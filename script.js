let user = document.getElementById('username');
let username = document.getElementById('user');
let playBtn = document.getElementById('play-btn');
let welcome = document.getElementById('welcome');
let userBox = document.getElementById('userBox');
playBtn.addEventListener('click',playGame)

function playGame(){
    const userName = user.value;
    console.log('we get '+ userName)
    if(userName === ''){
        alert('Please enter your name');
    }
    else{
        username.innerHTML = userName;
        welcome.style.display = 'none';
        userBox.classList.add('user_on_play');
        playNow();
    }
}

function playNow(){
    // Game constants and Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('/music/food.mp3');
const gameOverSound = new Audio('/music/gameover.mp3');
const moveSound = new Audio('/music/move.mp3');
const musicSound = new Audio('/music/music.mp3');
const userScore = document.getElementById('score');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // bumpt into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    // bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}
function gameEngine() {
    // updating snake variable
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game Over, press any key to play again');
        snakeArr = [
            { x: 13, y: 15 }
        ];
        // musicSound.play();
        score = 0;
    };

    // if snake eaten food, icrement score and regenrate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score +=1;
        userScore.innerText = score;
        // console.log(score);
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })
        let a = 2;
        let b = 16;
        food = {

            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())

        };
    }

    // Move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Display the snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    
    // Display the snake food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    foodElement.classList.add('foodAnim');
    board.appendChild(foodElement);
}


// Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }   //starts the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log('up key');
            inputDir.x = 0;
            inputDir.y = -1;
            break
        case "ArrowDown":
            // console.log('Down key');
            inputDir.x = 0;
            inputDir.y = 1;
            break
        case "ArrowLeft":
            // console.log('Left key');
            inputDir.x = -1;
            inputDir.y = 0;
            break
        case "ArrowRight":
            // console.log('Right key');
            inputDir.x = 1;
            inputDir.y = 0;
            break
        default:
            break;
    }
});

console.log(snakeElement.classList);

}




