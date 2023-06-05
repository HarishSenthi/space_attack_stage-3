var space,spaceImg;
var spaceship,spaceshipImg;
var asteroid,asteroidImg,asteroidGroup;
var enemy,enemyImg,enemyGroup;
var laser,laserImg,laserGroup
var ebullet,ebulletImg,ebulletGroup
var bot,botImg
var score=0   




function preload(){
spaceImg=loadImage("space.jpg")
spaceshipImg=loadImage("spaceship.png")
asteroidImg=loadImage("asteroid.png")
enemyImg=loadImage("enemy.png")
laserImg=loadImage("laser.png")
ebulletImg=loadImage("enemybullet.png")
botImg=loadImage("mini autobot.png")
}


function setup() {
  createCanvas(900,650);
spaceship=createSprite(300,600)
spaceship.addImage(spaceshipImg)
spaceship.scale=0.6
spaceship.debug = false
spaceship.setCollider("rectangle",0,0,300,200)


asteroidGroup=new Group()
enemyGroup=new Group()
laserGroup=new Group()
ebulletGroup=new Group()
botGroup=new Group()
}


function draw() {
  background(0);
  image(spaceImg,0,0,900,650);


  spaceship.x=World.mouseX
  if(spaceship.x<60){
    spaceship.x=60
  }

  if(spaceship.x > 895){
    spaceship.x=650
  }

  if(keyWentDown("space")){
    laser = createSprite(spaceship.x+10,600)
    laser.addImage(ebulletImg)
    laser.scale=0.21
    laserGroup.add(laser)
    laser.velocityY =-20
spaceship.depth+=2

  }

  else if(keyWentUp("space")){
    ebullet=createSprite(enemy.x+10,enemy.y+10)
    ebullet.addImage(laserImg)
    ebullet.velocityY=15
    ebulletGroup.add(ebullet)
    ebullet.scale=0.21
  }
  
 
 

if(ebulletGroup.isTouching(spaceship)){
  for(var i=0;i<ebulletGroup.length;i++){     
      
   if(ebulletGroup[i].isTouching(spaceship)){
        ebulletGroup[i].destroy();
         
   }
  }
}

if(enemyGroup.isTouching(spaceship)){
 

  for(var i=0;i<enemyGroup.length;i++){     
       
   if(enemyGroup[i].isTouching(spaceship)){
        enemyGroup[i].destroy()
        
        } 
  }
 }

 if(asteroidGroup.isTouching(spaceship)){
 
  for(var i=0;i<asteroidGroup.length;i++){     
       
   if(asteroidGroup[i].isTouching(spaceship)){
        asteroidGroup[i].destroy()
      
        } 
  }
 }



 if(botGroup.isTouching(laserGroup)){
  for(var i=0;i<botGroup.length;i++){     
      
   if(botGroup[i].isTouching(laserGroup)){
       
        botGroup[i].destroy()
        laserGroup.destroyEach()
   }
  }
}

Score()
 SpawnEnemy()
SpawnAsteroid()
Spawnbot()
  drawSprites();

}
function SpawnAsteroid(){
  if(frameCount%60===0){

    
    asteroid = createSprite(random(100,800),random(60,100),40,40)
    asteroid.addImage(asteroidImg)
    asteroid.scale=0.21
    asteroid.velocityY = +3
    asteroid.debug= false
    asteroid.setCollider("rectangle",0,0,400,400)
   
    
   asteroidGroup.add(asteroid)
  }
}

function SpawnEnemy(){
  if(frameCount%60===0){

    enemy = createSprite(random(100,800),random(10,50),40,40)
    enemy.addImage(enemyImg)
    enemy.scale=0.5
    enemy.velocityY = +3
    enemy.debug= false
    enemy.setCollider("rectangle",0,0,400,400)
   
    enemy.lifetime = 400
    enemyGroup.add(enemy)
  }
}

function Spawnbot(){
  if(frameCount%50===0){
    bot = createSprite(random(200,600),random(200,400),20,20)
    bot.addImage(botImg)
    bot.scale=0.3
    bot.velocityY = +3
    bot.debug= false
    bot.setCollider("rectangle",0,0,300,300)
    bot.lifetime = 400
    botGroup.add(bot)
  }
}

function Score(){
  if(asteroidGroup.isTouching(laserGroup)){
    for(var i=0;i<asteroidGroup.length;i++){     
        
     if(asteroidGroup[i].isTouching(laserGroup)){
          asteroidGroup[i].destroy()
          laserGroup.destroyEach()
          score=score+5
         
     }
    }
  }
  
  if(enemyGroup.isTouching(laserGroup)){
    for(var i=0;i<enemyGroup.length;i++){     
        
     if(enemyGroup[i].isTouching(laserGroup)){
         
          enemyGroup[i].destroy()
          laserGroup.destroyEach()
          score=score+10
     }
    }
  }
        textFont("algerian");
        textSize(30);
        fill("yellow");
        text("Score: "+ score,20,50);
}







