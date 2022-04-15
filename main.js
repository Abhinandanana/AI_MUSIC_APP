Peter_pan_song= "";
Harry_potter_song= "";

rightWristX= 0;
rightWristY= 0;

leftWristX= 0;
leftWristY= 0;

scoreleftWrist= 0;
song_Peter_pan= "";

scorerightWrist= 0;
song_Harry_potter= "";

function preload(){
    Peter_pan_song= loadSound("music2.mp3");
    Harry_potter_song= loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(600, 400);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Loaded');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;

        scoreleftWrist= results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist= results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);
    }
}

function draw(){
    image(video, 0, 0, 600, 400);

    fill('red');
    stroke('red');

    song_Peter_pan= Peter_pan_song.isPlaying();
    console.log(song_Peter_pan);

    song_Harry_potter= Harry_potter_song.isPlaying();
    console.log(song_Harry_potter);

if(scoreleftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    Harry_potter_song.stop();
    if(song_Peter_pan == false) {
        Peter_pan_song.play();
    }
    else{
        document.getElementById("SONG_NAME1").innerHTML= "Song Name: Peter Pan Song";
    }
}

if(scorerightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    Peter_pan_song.stop();
    if(song_Harry_potter == false) {
        Harry_potter_song.play();
    }
    else{
        document.getElementById("SONG_NAME1").innerHTML= "Song Name: Harry Potter Song";
    }
}
}