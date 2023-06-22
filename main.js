status = "";
objects = [];

var synth = window.speechSynthesis;

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    object_name = document.getElementById("input").value;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name)
            {
                document.getElementById("object_status").innerHTML = object_name +  " found";
                speak_data = object_name + "found";
                var utter_this = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utter_this);
            }
            else
            {
                document.getElementById("object_status").innerHTML = object_name +  " not found";
            }
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}