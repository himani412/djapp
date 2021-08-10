song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}
function modelLoaded(){
    console.log('ModelLoaded');
}
function draw(){
    image(video,0,0,600,500);
    fill("#0000FF");
    stroke("#0000FF");
if (scorerightwrist > 0.2 ){


circle(rightwristx,rightwristy,20);

if (rightwristy > 0 && rightwristy <= 100 ){
    document.getElementById("speed").innerHTML= "Speed = 0.5x ";
    song.rate(0.5);

}
else if (rightwristy > 100 && rightwristy <= 200 ){
    document.getElementById("speed").innerHTML= "Speed = 1x " ;
    song.rate(1);
}
else if (rightwristy > 200 && rightwristy <= 300 ){
    document.getElementById("speed").innerHTML= "Speed = 1.5x " ;
    song.rate(1.5);
}
else if (rightwristy > 300 && rightwristy <= 400 ){
    document.getElementById("speed").innerHTML= "Speed = 2x " ;
    song.rate(2);
}
else if (rightwristy > 400 && rightwristy <= 500 ){
    document.getElementById("speed").innerHTML= "Speed = 2.5x" ;
    song.rate(2.5);
}
}

    if(scoreleftwrist > 0.2){
    circle(leftwristx,rightwristx,20);

    numberleftwristy=Number(leftwristy);
    removedecimal=floor(numberleftwristy);
    volume=removedecimal/500;
    document.getElementById("volume").innerHTML="Volume = " +volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;

        console.log("scorerightwrist = "+ scorerightwrist);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        


        console.log("scoreleftwrist = "+ scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftwristx + " LeftWristY = " + leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightwristx + " RightWristY = " + rightwristy);
    }
}