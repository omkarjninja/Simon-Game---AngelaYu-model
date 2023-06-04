
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedpattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
   if (!started)
   {
      $("#level-title").text(" level "+ level);
      nextsequence();
      started = true;
   }
});

$(".btn").click(function()
{
   var userChosenColour=  $(this).attr("id");
   userClickedpattern.push(userChosenColour);
   
   playSound(userChosenColour);

   animatePress(userChosenColour);
   checkAnswer(userClickedpattern.length-1);
 });

 function checkAnswer(currentLevel)
 {
   if (gamePattern[currentLevel] === userClickedpattern[currentLevel]) {

      console.log("success");

      if (userClickedpattern.length === gamePattern.length){
        setTimeout(function () {
          nextsequence();
        }, 1000);
      }

   } else {
      console.log("wrong")
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      } ,200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startover();
   }
}
function startover(){
    level=0;
    userClickedpattern = [];
    gamePattern = [];
    started = false;
}
  
function nextsequence(){
   userClickedpattern = [];
  level++;
  $("#level-title").text("Level " + level);
   var a=Math.random();
   a=a*4;
   var RandomNumber=Math.floor(a);
   randomChosenColour=buttonColors[RandomNumber];
   gamePattern.push(randomChosenColour);
   // $("#" + randomChosenColour).click(function(){
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   //    var music=new Audio("sounds/"+ randomChosenColour + ".mp3");
   //    music.play();
   // })
   playSound(randomChosenColour);
}
function playSound(name){
   var musik=new Audio("sounds/"+name+".mp3")
   musik.play();
}
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
   $("#" + currentColor).removeClass("pressed");
 }, 100);
}

