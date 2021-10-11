let gameCanvas,screen;
const FPS =10;
const tilesCount=20;
let skX=10, skY=10;
let appleX=15,appleY=15;
let xV=0,yV=0;
let snakeBoxes=[];
let tailLength=2;
let score=0;

window.onload = function()
{
gameCanvas=document.getElementById('gameCanvas');
screen=gameCanvas.getContext('2d');
setInterval(()=>{
    gameLoop();
},1000 / FPS);
document.addEventListener('keyup', onKeyUp);
}
function gameLoop(){
    screen.fillStyle='green';
    screen.fillRect(0,0,gameCanvas.width,gameCanvas.height);
    screen.fillStyle='brown';
    screen.fillRect(skX * tilesCount,skY * tilesCount,tilesCount-2,tilesCount-2);
    screen.fillStyle='blue';
    screen.fillRect(appleX * tilesCount,appleY * tilesCount,tilesCount-3,tilesCount-3);
    skX+=xV;
    skY+=yV;
    if(skX==appleX && skY==appleY)
    {
        appleX=Math.floor(Math.random()*tilesCount);
        appleY=Math.floor(Math.random()*tilesCount);
        tailLength++;
        score=score+10;
    }
    if(skX<0)
    {
        skX=tilesCount-1;
    }
    if(skX>tilesCount-1)
    {
        skX=0;
    }
    if(skY<0)
    {
        skY=tilesCount-1;
    }
    if(skY>tilesCount-1)
    {
        skY=0;
    }
    screen.fillStyle='brown';
    for(let i=0;i<snakeBoxes.length;i++)
    {
        screen.fillRect(snakeBoxes[i].x * tilesCount,snakeBoxes[i].y * tilesCount,tilesCount-2,tilesCount-2);
        if(snakeBoxes[i].x === skX && snakeBoxes[i].y === skY)
       {
            tailLength=2;
            skX=10;
            skY=10;
            appleX=15;
            appleY=15;
            xV=0;
            yV=0;
            score=0;
            // alert("Game Over");
       }
    }
    snakeBoxes.push({x:skX,y:skY});
    while(snakeBoxes.length>tailLength)
    {
        snakeBoxes.shift();
    }
    screen.font="14px TimesNewRoman";
    screen.strokeStyle="violent";
    screen.strokeText(`Score is : ${score}`,10,20);
}
function onKeyUp(event){
    switch(event.keyCode){
        case 37:
            xV=-1;
            yV=0;
            break;
        case 38:
            xV=0;
            yV=-1;
            break;
        case 39:  
            xV=1;
            yV=0;
            break;
        case 40:
            xV=0;
            yV=1;
            break;
    }
} 