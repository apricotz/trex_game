var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var o1,o3,o2,o4,o5,o6,score;
var PLAY=1;
var END = 0;
var gamestate=PLAY;
var obstaclegroup,cloudgroup;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudsimg = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  o1 = loadImage("obstacle1.png");
   o2 = loadImage("obstacle2.png");
 o3 = loadImage("obstacle3.png");
   o4 = loadImage("obstacle4.png");
   o5 = loadImage("obstacle5.png");
   o6 = loadImage("obstacle6.png");


}

function setup() {
  createCanvas(600, 200);  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score = 0;
  obstaclegroup= new Group();
  cloudgroup = new Group();
}

function draw() {
  background(255);
  
  if(gamestate===PLAY){
  score=score+Math.round(getFrameRate()/60)
text("Score " +score,500,50);
  if(keyDown("space")&& trex.y >=160) {
    trex.velocityY = -10;
 
  }

  trex.velocityY = trex.velocityY + 0.8
 // console.log(trex.y);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
    if (obstaclegroup.isTouching(trex)){
     gamestate=END; 
    }
  trex.collide(invisibleGround);
  }
  else if(gamestate===END){
  ground.velocityX= 0;  
    
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(603,120,40,10);
    cloud.y = random(80,140);
    cloud.addImage("cloud",cloudsimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth 
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
}
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,10);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:
    obstacle.addImage(o1);
        break ;
         case 2:
    obstacle.addImage(o2);
        break ;
        
         case 3:
    obstacle.addImage(o3);
        break ;
    
     case 4:
    obstacle.addImage(o4);
        break ;
    
     case 5:
    obstacle.addImage(o5);
        break ;
        
     case 6:
    obstacle.addImage(o6);
        break ;
        default : break;
    
    }
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
   obstaclegroup.add(obstacle); 
  }
}