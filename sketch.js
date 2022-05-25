'use strict';

var start;
var begin;
var nextlvl2;
var nextlvl3;
var restart;

let state ='title';
let cnv;
let points = 0;
let lives = 2;
let w = 600;
let h = 600;
let player = 1;
let coins = [];
let enemies = [];
let playerImg;
let coinImg;
let enemyImg;
let darkImg;
let bckgImg;
let dayImg;
let titleImg;


function preload(){

  playerImg = loadImage('assets/butterfly.png');
  coinImg = loadImage('assets/light1.png');
  enemyImg = loadImage('assets/rain1.png');

}

function setup(){
 darkImg = loadImage('assets/dark_bkgd.png')
 bckgImg = loadImage('assets/level_bckg.png');
 dayImg = loadImage('assets/daylight_bkgd.png');
 titleImg = loadImage('assets/background.png');

 cnv = createCanvas(w, h);
  //frameRate(200);

  imageMode(CENTER);
  // rectMode(CENTER);
  textFont('monospace');

  player = new Player();

  //coins[0] = new Coin();
  coins.push(new Coin());
  enemies.push(new Enemy());

  // clickable "start" button - ONLY TEXT from title to tutorial
  start = new Clickable();
    start.locate(w/2.130, h/1.5);
    start.color = '#dddddd00';
    start.text = "";
    start.strokeWeight = 0;
    start.image = playerImg;
    start.fitImage = true;
    start.width = 37;
    start.height = 30;
    start.onHover = function() {
      start.imageScale = 2.7;
      start.image = playerImg;
    }
    start.onPress = function() {
      state = 'guide';
    }
    start.onOutside = function() {
      start.imageScale = 2.5;
      start.image = playerImg;
}
begin = new Clickable();
  begin.locate(w/2.130, h/1.2);
  begin.color = '#dddddd00';
  begin.text = "";
  begin.strokeWeight = 0;
  begin.image = playerImg;
  begin.fitImage = true;
  begin.width = 37;
  begin.height = 30;
  begin.onHover = function() {
    begin.imageScale = 2.7;
    begin.image = playerImg;
  }
  begin.onPress = function() {
    state = 'level 1';
  }
  begin.onOutside = function() {
    begin.imageScale = 2.5;
    begin.image = playerImg;
  }
  nextlvl2 = new Clickable();
    nextlvl2.locate(w/2.130, h/1.5);
    nextlvl2.color = '#dddddd00';
    nextlvl2.text = "";
    nextlvl2.strokeWeight = 0;
    nextlvl2.image = playerImg;
    nextlvl2.fitImage = true;
    nextlvl2.width = 37;
    nextlvl2.height = 30;
    nextlvl2.onHover = function() {
      nextlvl2.imageScale = 2.7;
      nextlvl2.image = playerImg;
    }
    nextlvl2.onPress = function() {
      state = 'level 2';
    }
    nextlvl2.onOutside = function() {
      nextlvl2.imageScale = 2.5;
      nextlvl2.image = playerImg;
  }
  nextlvl3 = new Clickable();
    nextlvl3.locate(w/2.130, h/1.5);
    nextlvl3.color = '#dddddd00';
    nextlvl3.text = "";
    nextlvl3.strokeWeight = 0;
    nextlvl3.image = playerImg;
    nextlvl3.fitImage = true;
    nextlvl3.width = 37;
    nextlvl3.height = 30;
    nextlvl3.onHover = function() {
      nextlvl3.imageScale = 2.7;
      nextlvl3.image = playerImg;
    }
    nextlvl3.onPress = function() {
      state = 'level 3';
    }
    nextlvl3.onOutside = function() {
      nextlvl3.imageScale = 2.5;
      nextlvl3.image = playerImg;
}
  restart = new Clickable();
    restart.locate(w/2.130, h/1.5);
    restart.color = '#dddddd00';
    restart.text = "";
    restart.strokeWeight = 0;
    restart.image = playerImg;
    restart.fitImage = true;
    restart.width = 37;
    restart.height = 30;
    restart.onHover = function() {
      restart.imageScale = 2.7;
      restart.image = playerImg;
    }
    restart.onPress = function() {
      state = 'title';
    }
    restart.onOutside = function() {
      restart.imageScale = 2.5;
      restart.image = playerImg;
    }
}

function draw() {

  switch (state){
    case 'title':
      title();
      // cnv.mouseClicked(titleMouseClicked);
      break;
    case 'guide':
      tutorialStage();
      break;
    case 'level 1':
      level1();
      break;
    case 'level 2':
      level2();
      break;
    case 'level 3':
      level3();
      break;
    case 'you win':
      youWin();
      break;
    case 'you win 2':
      youWin2();
      break;
    case 'you win 3':
      youWin3();
      cnv.mouseClicked(youWin3MouseClicked);
      break;
    case 'game over':
      gameOver();
    cnv.mouseClicked(gameOverMouseClicked);
      break;
    default:
      break;
  }
}

function keyPressed() {

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
  imageMode(CENTER);
  image(titleImg, w/2, h/2, 600, 600);
  // textAlign(LEFT);
  start.draw();

  // image(playerImg, w/2, h/1.8)
  image(coinImg, w/2, h/3.2, 200, 200);

  strokeWeight(3);
  stroke(255);
  textSize(80);
  fill(0);
  textAlign(CENTER);
  text('CHANCE', w/2, h/2.5);

  noStroke();
  textSize(30);
  fill(255);
  text("Start", width / 2, height / 1.25);

}

function titleMouseClicked(){
  // console.log('canvas is clicked on title page');
  // state = 'guide'
}

function tutorialStage(){
  background(0);
  image(titleImg, w/2, h/2, 600, 600);

  fill(255);
  push();
  rectMode(CENTER);
  rect(width * .5, height * .345, 345, 135, 10);
  pop();

image(coinImg, 250, 165);
image(enemyImg, 250, 206);

strokeWeight(0);
stroke(0);
fill(0);
textSize(15);
textAlign(CENTER);
text("=   Light", width / 1.85, height / 3.5);
text("=   Rain", width / 1.87, height  / 2.8);
text(" Press ← → ↑ ↓ to move the butterfly", width/2, height * 0.42);

fill(255);
textSize(20);
textAlign(CENTER);
text("Help! Safely guide the butterfly through the storm. Its a cold and rainy day so try to avoid as much RAIN and collect the LIGHT to keep the butterfly warm. Safe travels!", width / 7.5, height / 1.8, 450);
fill(255);
text("Start", width / 2, height / 1.05);


strokeWeight(3);
stroke(255);
fill(0);
textSize(40);
textAlign(CENTER);
text("Tutorial", width/2, height * 0.12);

begin.draw();
}

function tutorialMouseClicked(){
  // console.log('canvas is clicked on title page');
  state = 'level 1'
}

function level1(){
  background(0);

  push();
  imageMode(CENTER);
  imageMode(CENTER);
  image(darkImg, w/2, h/2, 600, 600);
  pop();

  if (random(1) <= 0.01){
    coins.push(new Coin());
  }

  if (random(1) <= 0.03){
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
    if (dist(player.x, player.y, enemies[i].x , enemies[i].y) <= (player.r + enemies[i].r) / 2.4){
      points -= 100;
      console.log(points);
      enemies.splice(i, 1);
    } else if (enemies[i].y > h){
      enemies.splice(i, 1);
      console.log('enemy is out of town');
    }
  }
  strokeWeight(3)
  stroke(255);
  fill(0);
  textSize(30);
  text(`score: ${points} / 1000`, w/4, h - 30);
  text('Level 1', w/2, h/8.5);

// check point values to win or lose the game
  if (points >= 1000){
    state = 'you win';
  } else if (points <= -1){
    state = 'game over';
  }
}

function level1MouseClicked(){
  points++;
  console.log('points = + points');

  if (points >= 10){
    state = 'level 2';
  }
}

function level2(){
  background(0);
  imageMode(CENTER);
  image(bckgImg, w/2, h/2, 600, 600);

  if (random(1) <= 0.01){
    coins.push(new Coin());
  }

  if (random(1) <= 0.03){
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
    if (dist(player.x, player.y, enemies[i].x , enemies[i].y) <= (player.r + enemies[i].r) / 2.4){
      points -= 100;
      console.log(points);
      enemies.splice(i, 1);
    } else if (enemies[i].y > h){
      enemies.splice(i, 1);
      console.log('enemy is out of town');
    }
  }
  strokeWeight(3)
  stroke(255);
  fill(0);
  text(`score: ${points} / 2000`, w/4, h - 30);
  text('Level 2', w/2, h/8.5);


// check point values to win or lose the game
  if (points >= 2000){
    state = 'you win 2';
  } else if (points <= -1){
    state = 'game over';
  }
}

function level2MouseClicked(){
//   points++;
//   console.log('points = + points');

  if (points >= 10){
    state = 'level 3';
  }
}

function level3(){
  background(0);
  imageMode(CENTER);
  image(dayImg, w/2, h/2, 600, 600);

    if (random(1) <= 0.01){
      coins.push(new Coin());
    }

    if (random(1) <= 0.03){
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
        // console.log(points);
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
      if (dist(player.x, player.y, enemies[i].x , enemies[i].y) <= (player.r + enemies[i].r) / 2.4){
        points -= 100;
        console.log(points);
        enemies.splice(i, 1);
      } else if (enemies[i].y > h){
        enemies.splice(i, 1);
        console.log('enemy is out of town');
      }
    }
    strokeWeight(3)
    stroke(255);
    fill(0);
    text(`score: ${points} / 3000`, w/4, h - 30);
    text('Level 3', w/2, h/8.5);


  // check point values to win or lose the game
    if (points >= 3000){
      state = 'you win 3';
    } else if (points <= -1){
      state = 'game over';
    }

}

function level3MouseClicked(){
//   points++;
//   console.log('points = + points');

//   if (points >= 10){
//     state = 'you win';
//   }
}

function youWin(){
  background(0);
  imageMode(CENTER);
  image(titleImg, w/2, h/2, 600, 600);

  strokeWeight(3);
  stroke(255);
  fill(0);
  textSize(80);
  text('YOU WIN', w/2, h/2);

  noStroke();
  textSize(30);
  fill(255);
  text('Next Level', w/2, h / 1.6);

  image(coinImg, w/2, h/2.8, 45, 50);
  nextlvl2.draw();

}

function youWinMouseClicked(){
  console.log('canvas is clicked on you win page');

  state = 'level 2';
  points = 0;
}
function youWin2(){
  background(0);
  imageMode(CENTER);
  image(titleImg, w/2, h/2, 600, 600);

  strokeWeight(3);
  stroke(255);
  fill(0);
  textSize(80);
  text('YOU WIN', w/2, h/2);

  noStroke();
  textSize(30);
  fill(255);
  text('Next Level', w/2, h / 1.6);

  image(coinImg, w/2, h/2.8, 45, 50);

  nextlvl3.draw();
}

function youWin2MouseClicked(){

  state = 'level 3';
   points = 0;
}
function youWin3(){
  background(0);
  imageMode(CENTER);
  image(titleImg, w/2, h/2, 600, 600);

  strokeWeight(3);
  stroke(255);
  fill(0);
  textSize(80);
  text('YOU WIN', w/2, h/2);

  noStroke();
  textSize(30);
  fill(255);
  text('Title Screen', w/2, h / 1.6);

  image(coinImg, w/2, h/2.8, 45, 50);

  restart.draw();
}

function youWin3MouseClicked(){
  // console.log('canvas is clicked on you win 3 page');

  if (state = 'guide') {
  } else {
  state = 'level 1';
}
   points = 0;
}

function gameOver(){
  background(0);
  imageMode(CENTER);
  image(titleImg, w/2, h/2, 600, 600);


  image(enemyImg, w/2, h/3.7, 45, 50);
  textSize(80);


  // check # of lives
  if (lives >= 0){

    //display number lives to the screen
    strokeWeight(3);
    stroke(255);
    fill(0);
    text(`Lives left: ${lives}`, w/2, h/2);

    noStroke();
    textSize(30);
    fill(255);
    text('click anywhere to play again', w/2, h / 1.5);


  } else {
    // game over
    strokeWeight(3);
    stroke(255);
    fill(0);
    text('Game Over', w/2, h/2);

    noStroke();
    fill(255);
    textSize(30);
    text('click anywhere to restart', w/2, h / 1.5);

    restart.draw();
  }
}

function gameOverMouseClicked(){
  console.log('canvas is clicked on game over page');
  // state = 'title'

    if (lives >= 0) { // this means they have 0 lives going into it b/c life already taken away in gameOver() function
      lives--; // if you have a life, you lose one!
      state = 'level 1';
    } else {
      state = 'level 2';
    }

  points = 0;

}
