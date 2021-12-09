const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//THIS IS HOW YOU CHANGE THE SPEED OF THE SNAKE!!!!!!
let speed = 14;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
//Snake Starting Length
let tailLength = 2;

let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);

let xVelocity=0;
let yVelocity=0;

const appleSound = new Audio("AppleNew.mp4")
const deadSound = new Audio("DeadNew.mp4")
const downSound = new Audio("DownNew.mp4")
const leftSound = new Audio("LeftNew.mp4")
const rightSound = new Audio("RightNew.mp4")
const upSound = new Audio("UpNew.mp4")

//Game Loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();



    checkAppleCollision();
    drawApple();
    drawSnake();

    setTimeout(drawGame, 1000/ speed);
}


function isGameOver(){
  let gameOver = false;

  if(yVelocity ===0 && xVelocity ===0){
    return false;
  }

  //walls
  if(headX < 0 ){
    gameOver = true;
    deadSound.play();
  }

  else if(headX === tileCount ){
    gameOver = true;
    deadSound.play();
  }

  else if(headY < 0 ){
    gameOver = true;
    deadSound.play();
  }

  else if(headY === tileCount ){
    gameOver = true;
    deadSound.play();
  }

  for(let i =0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    if(part.x === headX && part.y === headY){
      gameOver = true;
      deadSound.play();
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '50px Common Pixel, sans-serif';
    ctx.fillText("Game Over!", canvas.width / 11, canvas.height / 8)
  }

  return gameOver;
}



function clearScreen(){
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


function drawSnake(){

    ctx.fillStyle = 'white';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize, tileSize);

}


function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}


function drawApple(){
    ctx.fillStyle = "black";
    ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
    if (appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        appleSound.play();
    }
}


document.body.addEventListener('keydown', keyDown);


function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
        upSound.play();
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
        downSound.play();
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
        leftSound.play();
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
        rightSound.play();
    }

}





drawGame();
