
var dog,HappyDog,database,foodS,foodStock;  
var dogImg,dogHappyImg;
function preload()
{

  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10)
  dog.addImage(dogImg);
  dog.scale = 0.15;

  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  
 
}


function draw() {  
background("red")

 
  textSize(17);
  fill("black");
  text("Hello! I am your dog Pluto and I am hungry ",100,150);
  fill("blue");
  text("Press up arrow key to feed your pet Dog Pluto",50,50);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);

  if(foodS !== 0){
     if(keyWentDown(UP_ARROW))
     {
      writeStock(foodS);
      dog.addImage(dogHappyImg);
   
      
    }
  
    if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImg);
    
    }
  }
  
  if(foodS == 0){
    
    dog.addImage(dogImg);
    foodS = 50;
  
  }

  drawSprites();
}



function readStock(data)
{
  foodS = data.val();
}



function writeStock(x){

  if(x<=0){
    x = 0;

  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}



