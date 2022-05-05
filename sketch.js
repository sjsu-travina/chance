'use strict';

let state ='title';
let cnv;
let points = 0;
let lives = 3;
let w = 600;
let h = 600;
let player = 1; 
let coins = [];
let enemies = [];
let playerImg;
let coinImg;
let enemyImg;


function preload(){
  
  playerImg = loadImage('assets/logo.png');
  coinImg = loadImage('assets/title.png');
  enemyImg = loadImage('assets/colorbckg.png');
  
}

function setup(){
 cnv = createCanvas(w, h);
  //frameRate(200);
  
  imageMode(CENTER);
  rectMode(CENTER);
  textFont('monospace');
  
  player = new Player();
  
  //coins[0] = new Coin();
  coins.push(new Coin());
  enemies.push(new Enemy());
}

function draw() {

  switch (state){
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;    
    case 'game over':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
      break;
    default:
      break;
  } 
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  }  else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  }  else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key = ' '){
    player.direction = 'still';
  }
}

function keyReleased(){
  
  let numberKeysPressed = 0;
  
  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed++;
  }
  
  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed++;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    numberKeysPressed++;
  }
  
  if (keyIsDown(UP_ARROW)){
    numberKeysPressed++;
  }
  
  console.log(numberKeysPressed);
  
  if (numberKeysPressed == 0){
    player.direction = 'still';
  }
}

function title(){
  background(0);
  textSize(80);
  fill(255);
  textAlign(CENTER);
  text('SECOND CHANCEs', w/2, h/5);
  
  textSize(30);
  text('click anywhere to start', w/2, h/2);
}

function titleMouseClicked(){
  console.log('canvas is clicked on title page');
  state = 'level 1'
}

function level1(){
  background(50, 150, 200);

  if (random(1) <= 0.01){
    coins.push(new Coin());
  } 
  
  if (random(1) <= 0.06){
    enemies.push(new Enemy());
  }
  
  player.display();
  player.move();

  //iterating through coins array to display and move them
  // using for loop
  for (let i = 0; i < coins.length; i++){
    coins[i].display();
    coins[i].move();
    }
  
  //iterating through enemies array to display and move them
  // using for loop
  for (let i = 0; i < enemies.length; i++){
    enemies[i].display();
    enemies[i].move();
    }
  
  
  // check for collision with coins, if there is a colliion increase points by 1 AND splice that coin out of array
  // need to iterate backyards through array
  for (let i = coins.length - 1; i >= 0; i--){
    // check for collision with player
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2){
      points += 100;
      console.log(points);
      coins.splice(i, 1);
    } else if (coins[i].y > h){
      coins.splice(i, 1);
      console.log('coin is out of town');
    }
  }  
  
  // check for collision with enemies, if there is a colliion increase points by 1 AND splice that enemy out of array
  // need to iterate backyards through array
  for (let i = enemies.length - 1; i >= 0; i--){
    // check for collision with player
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r) / 2){
      points -= 100;
      console.log(points);
      enemies.splice(i, 1);
    } else if (enemies[i].y > h){
      enemies.splice(i, 1);
      console.log('enemy is out of town');
    }
  }
  
  text(`points: ${points}`, w/4, h - 30);
  
// check point values to win or lose the game 
  if (points >= 1000){
    state = 'you win';
  } else if (points <= -1000){
    state = 'game over';
  }

}

function level1MouseClicked(){
//   points++;
//   console.log('points = + points');
  
//   if (points >= 10){
//     state = 'you win';
//   }
}

function youWin(){
  background(100);
  textSize(80);
  text('YOU WIN', w/2, h/2);
  
  textSize(30);
  text('click anywhere to restart', w/2, h * 3/4);
}

function youWinMouseClicked(){
  state = 'title';
  points = 1;
}

function gameOver(){
  background(100);
  textSize(80);
  
  
  // check # of lives
  if (lives >= 0){
 
    //display number lives to the screen
    text(`Lives left: ${lives}`, w/2, h/2);
  
    textSize(30);
    text('click anywhere to play again', w/2, h * 3/4);
    
  } else {
    // game over
    text('Game Over', w/2, h/2);
  
    textSize(30);
    text('click anywhere to restart', w/2, h * 3/4);
  }
}

function gameOverMouseClicked(){
    if (lives >= 0) { // this means they have 0 lives going into it b/c life already taken away in gameOver() function 
      lives--; // if you have a life, you lose one!
      state = 'level 1';
    } else {
      state = 'title';
    }
  
  points = 1;
}