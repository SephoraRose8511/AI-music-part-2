leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1 = "" ;
song2 = "" ;

function preload()
{
    song1 = loadSound("Taylor_Swift_-_Blank_Space_(Jesusful.com).mp3");
    song2 = loadSound("dhruv_-_double_take_legitmuzic.com.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initilazied');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play()
{
    song1.play();
}

function gotPoses(results)
{
    if(results.longth > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}




