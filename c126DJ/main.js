var song;
var pontPulsoDireito = 0;
var pontPulsoEsquerdo = 0;

var pulsoEsquerdoX = 0;
var pulsoDireitoX = 0;

var pulsoDireitoY = 0;
var pulsoEsquerdoY = 0;

function preload(){
    song = loadSound("music.mp3")
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('poseNet is Initialized');
}
function gotPoses(results){
    if(results.lenth > 0){
        console.log(results);
        pontPulsoDireito = results[0].pose.keypoints[10].score;
        pontPulsoEsquerdo = results[0].pose.keypoints[9].score;

        pulsoDireitoX = results[0].pose.rightWrist.x;
        pulsoDireitoY = results[0].pose.rightWrist.y;

        pulsoEsquerdoX = results[0].pose.leftWrist.x;
        pulsoEsquerdoY = results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video, 0,0,600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(pontPulsoDireito > 0.2){
       circle(pulsoDireitoX, pulsoDireitoY, 20);

       if(pulsoDireitoY > 0 && pulsoDireitoY <=100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
       }
       if(pulsoDireitoY > 0 && pulsoDireitoY <=200){
        song.rate(1)
        document.getElementById("speed").innerHTML = "Velocidade = 1x";
       }
       if(pulsoDireitoY > 0 && pulsoDireitoY <=300){
        song.rate(1.5)
        document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
       }
       if(pulsoDireitoY > 0 && pulsoDireitoY <=400){
        song.rate(2)
        document.getElementById("speed").innerHTML = "Velocidade = 2x";
       }
    }
        if(pontPulsoEsquerdo > 0.2){
            circle(pulsoEsquerdoX, pulsoEsquerdoY, 20);

        inNumberLeftWristY= Number(pulsoEsquerdoY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals/500;

        document.getElementById("volume").innerHTML = "Volume=" + volume;
        song.setVolume(volume);
        }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}