//GAME CONSTANTS

let inputDir = {x:0, y:0};  //object with initial direction zero for snake to be static in beginning
const foodSound = new Audio("images/foodSound.mp3");
const gameoverSound = new Audio("images/gameover.mp3");
const moveSound = new Audio("images/move.mp3");
const musicSound = new Audio("images/music.mp3");
let speed = 5; 
let score = 0;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
];
food = {x:6 , y:7};    //food not an array
let userName = "";


//GAME FUNCTIONS

function main(ctime)                                       //current time
{ 
    window.requestAnimationFrame(main);                   //repeated calls
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed )      //to reduce the amount of time screen gets rendered
       return;                                      //dividing by 1000 because milli sec.
    lastPaintTime=ctime;
    
    gameEngine();           
}


function isCollide(snake)
{
    //if snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)  //snake's head bumps in any body part
        return true;
    }

    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) //snake's head collides in wall
        return true;

    return false;

}


function gameEngine()                              //to run the game
{
 //Part 1 - updating snake array & food
//  const userName = prompt("Please enter your name:");
//  urname.innerHTML = "Your name is " + userName;

 if(isCollide(snakeArr))
 {
    gameoverSound.play();
    musicSound.pause();
    inputDir = {x:0, y:0};
    score=0;
    scoreBox.innerHTML = "Your Score : " + score;
    alert("Game Over! Press any key to play again.");
    snakeArr=[{x:13, y:15}];
  // musicSound.play();
 }
//eaten the food so increment score & regenerate food

if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    foodSound.play();
    score += 1;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscorebox.innerHTML = "High Score : " + hiscoreval;
    }
    
    scoreBox.innerHTML = "Your Score : " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})   //unshift inserts new element at start of array
    let a = 2; 
    let b = 16;   //grid starts from 0 to 18, doing 2 & 16 to somehwere keep it in the middle
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}

//Moving the snake

for (let i = snakeArr.length-2; i >= 0; i--)   //starting from 2nd last element
{
    snakeArr[i+1] = {...snakeArr[i]};         // {... } creates new obj to avoid referencing prob 
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;


 //Part 2 - display the snake

 board.innerHTML = "";
 snakeArr.forEach((e,index)=>{
 snakeElement = document.createElement('div');
 snakeElement.style.gridRowStart = e.y;
 snakeElement.style.gridColumnStart = e.x;
 if(index==0)
 snakeElement.classList.add('head');
 else
 snakeElement.classList.add('snakebody');             //made a class : snakebody to give css to it
 board.appendChild(snakeElement);
});

//display food


// Set the SVG code as the innerHTML of the foodElement


foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food');            //made a class : head to give css to it
board.appendChild(foodElement);  
}




// MAIN LOGIC

let hiscore = localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "High Score : " + hiscore;
}
window.requestAnimationFrame(main);               //better than setTimeout or setInterval
window.addEventListener('keydown',e=>{
    if (!userName) {
        userName = prompt("Please enter your name:", "Guest");
        urname.innerHTML = "Legendary, " + userName + "<br> Welcome to <br> COBRA CHASE! <br> Can you break/set a highscore? <br> Dont get Coiled Up!";
    }

    inputDir = {x:0,y:1};                        //game begins
    moveSound.play();
    switch (e.key) {                               //checks which key has been pressed
        case "ArrowUp":
        case "w" :
        case "W" :
            console.log("Arrow Up key");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        
        case "ArrowDown":
        case "s":
        case "S" :
            console.log("Arrow Down key");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
        case "a" :
        case "A" :
            console.log("Arrow Left key");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        
        case "ArrowRight":
        case "d" :
        case "D" :
            console.log("Arrow Right key");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    
        default:
            break;
    }
});
