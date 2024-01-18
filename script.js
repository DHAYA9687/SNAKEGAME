const gameBoard=document.querySelector('#gameboard');
const context=gameBoard.getContext('2d');
gameWidth=gameBoard.width;
gameHeight=gameBoard.height;
const UNIT=25;
let Foodx;
let Foody;
let xvel=UNIT;
let yvel=0;
let active=true;
let started=false;
let gamescore=document.querySelector('#gamescore');
score=0;
snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];
startGame();
window.addEventListener('keydown',keypress);
function startGame(){
    context.fillStyle='black';
    context.fillRect(0,0,gameWidth,gameHeight);
    createFood();
}
function clearboard(){
    context.fillStyle='black';
    context.fillRect(0,0,gameWidth,gameHeight);
}
function createFood(){
    Foodx=Math.floor(Math.random()*gameWidth/UNIT)*UNIT;
    Foody=Math.floor(Math.random()*gameHeight/UNIT)*UNIT;
}
function displayFood(){
    context.fillStyle='red';
    
    context.fillRect(Foodx,Foody,UNIT,UNIT);

}
function drawsnake(){
    snake.forEach((snakepart) => {
        context.fillStyle='white';
        context.strokeStyle='black';
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);
    });
}
function movesnake(){
    const head={
        x:snake[0].x+xvel,y:snake[0].y+yvel
    }

    snake.unshift(head);
    if(head.x===Foodx && head.y===Foody){
        createFood();
        score++;
        gamescore.innerHTML=score;
    }
    else{
        snake.pop();
    }

}
function nextTick(){
    if(active){ setTimeout(()=>{
        clearboard();
        movesnake();
        drawsnake();
        displayFood();
        checkGameOver();
        nextTick();
    },200)
    }
    else{
        clearboard();
        context.fillStyle='white';
        context.font=' bold 50px Arial';
        context.textAlign='center';
        context.fillText('Game Over!!',gameWidth/2,gameHeight/2);
    }
}
function keypress(event){
    if(!started){
        started=true;
        nextTick();
    }
    const LEFT=37;
    const UP=38;
    const RIGHT=39;
    const DOWN=40;
    switch(true){
        case(event.keyCode===LEFT && xvel!==UNIT):
            xvel=-UNIT;
            yvel=0;
            break;
        case(event.keyCode===UP && yvel!==UNIT):
            xvel=0;
            yvel=-UNIT;
            break;
        case(event.keyCode===RIGHT && xvel!==-UNIT):
            xvel=UNIT;
            yvel=0;
            break;
        case(event.keyCode===DOWN && yvel!==-UNIT):
            xvel=0;
            yvel=UNIT;
            break;
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>gameWidth):
        case(snake[0].y<0):
        case(snake[0].y>gameHeight):
            active=false;
            break;
    }
   for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            active = false;
        }
    }
}
