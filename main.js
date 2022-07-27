song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log('Left wristx:' + leftWristx + ' Left wrist y:' + leftWristy);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log('Right wristx:' + rightWristx + ' right wrist y:' + rightWristy);
    }
}

function modelLoaded(){
    console.log("Pose net is initi");
}


function draw() {
	image(video, 0, 0, 600, 500);
	fill("red");
    stroke("red");
    circle(leftWristx,leftWristy,20);
    numberleftwrist = Number(leftWristy);
    remove_decimals = floor(numberleftwrist);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+ volume;
    song.setVolume(volume);
}

function play(){
    song.play();
    song.setVolumn(1);
    song.rate(1);
}


