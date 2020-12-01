
var monkey , monkey_running
var ground,invisibleGround
var bananaImage, obstacleImage
var foodGroup, obstacleGroup
var score=0
var collect=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(500,200)
  
  monkey=createSprite(90,170,10,10)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.08
  
  ground=createSprite(200,180,500,10)
  ground.x=ground.width/2
  
  invisibleGround=createSprite(250,180,500,10)
  

foodGroup=createGroup();
  obstacleGroup=createGroup();

}


function draw() {

  background("white")
  
  text("survival time = "+  score,230,20)
  text("bananas collected= "+collect,10,20)
  
  ground.velocityX=-10
  
  if(ground.x<0){
 ground.x=ground.width/2
  }
  
  if(invisibleGround.x<100){
    invisibleGround.x=invisibleGround.width/2
  }
  
if(keyDown("space")&& monkey.y>150){
  monkey.velocityY=-12
}
  monkey.velocityY=monkey.velocityY+1
  
  spawn_Obstacles();
  spawn_banana();
  
  score=Math.ceil(frameCount/frameRate())
    
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach()
    collect=collect+1
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.visible=false
    
    ground.velocityX=0
    
    score="you lose"
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);   
    
   if(keyDown("space")&& monkey.y>150){
  monkey.velocityY=0
}
    
    text("GAME OVER",230,100)
    textSize(50)
  }
  monkey.collide(invisibleGround)
  drawSprites();
}

function spawn_Obstacles(){
  if(frameCount%70===0){
  var obstacle=createSprite(600,165,10,10)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.07
  obstacle.velocityX=-10
    obstacleGroup.add(obstacle)
}
  
}

function spawn_banana(){
  
  if(frameCount%50===0){
    
    var banana=createSprite(600,80,10,10)
    banana.addImage(bananaImage)
    banana.scale=0.05
 banana.velocityX=-10
    foodGroup.add(banana);
    
  }

}

