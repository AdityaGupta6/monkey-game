
var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survival=0;

function preload(){
  
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyCollided=loadAnimation("sprite_0.png");
  
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
    createCanvas(600,200);
    ground=createSprite(400,190,800,20);
    ground.x = ground.width /2;
   
    monkeySprite=createSprite(100,160,50,50);
    monkeySprite.addAnimation("monkeyImg",monkey_running);
    monkeySprite.addAnimation("monkey1",monkeyCollided);
  
    monkeySprite.scale=0.1;

    foodGroup=new Group();
    obstacleGroup=new Group();

}


function draw() {
      background(180)

      // monkeySprite.debug=true;
      monkeySprite.setCollider("circle",0,0,250)

      monkeySprite.collide(ground);
  
 
    if(gameState===PLAY){
    
   
         survival=survival+Math.round(frameRate()/60)
         ground.velocityX=-(6+(score/7));

      
         if (ground.x < 200){
              ground.x = ground.width/2;
         }

         if(frameCount%80===0){
              bananas();
         }
    
    
 
          if (frameCount%150===0){
                obstacles();


          }
         if(keyDown("space")&&monkeySprite.y>=120){
               monkeySprite.velocityY=-12;

         }
          monkeySprite.velocityY=monkeySprite.velocityY+1;
 
//     console.log(frameCount);



        if(foodGroup.isTouching(monkeySprite)){
            foodGroup.destroyEach();
            score++;

        }
        if(obstacleGroup.isTouching(monkeySprite)){
            gameState=END;

        }
    
    }
  
else if(gameState===END){
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
  monkeySprite.changeAnimation("monkey1",monkeyCollided);

        textSize(30);
        fill("red")
        text("Game Over",200,100);
        text("Press r to Restart",200,130);
  
        ground.velocityX=0;
  
        score=0;
        survival=0;
       monkeySprite.velocityY=0;

       if(keyDown("r")){
           gameState=PLAY;
                  obstacleGroup.destroyEach();
          foodGroup.destroyEach();
    monkeySprite.changeAnimation("monkeyImg",monkey_running);
         

      }
  
  
}
 

  
  
  
  
 
    drawSprites();
    
      stroke("white");
      fill("white");
      textSize(20);
      text("Score:"+score,400,30);

      fill("black");
      stroke("black");
      textSize(20);
      text("Survival time="+survival,200,30);
}

function bananas(){
  bananaSprite=createSprite(600,Math.round(random(60,80)),10,10)
      bananaSprite.addImage(bananaImage);
      bananaSprite.velocityX=-(6+(score/7));
      bananaSprite.scale=0.1;
      bananaSprite.lifetime=100;
      foodGroup.add(bananaSprite);

}

function obstacles(){
  
    obstacleSprite=createSprite(600,170,10,10)
    obstacleSprite.addImage(obstacleImage);
    obstacleSprite.velocityX=-(6+(score/7));
    obstacleSprite.scale=0.1;
    obstacleSprite.lifetime=100;
    obstacleGroup.add(obstacleSprite);
  
}