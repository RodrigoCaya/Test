function startTrafficSignal (durationGreen, durationOrange, durationRed, start) {
    // Los parámetros son las duraciones de los semáforos y Start es el semáforo inicial
    console.log(durationGreen, durationOrange, durationRed);
    var green = document.getElementById("green");
    var red = document.getElementById("red");
    var orange = document.getElementById("orange");
    var startColor = document.getElementById(start);
     
    startColor.style.opacity=1;
    setTimeout(function () {
        green.style.opacity=0.5;
        red.style.opacity=0.5;
        orange.style.opacity=1.0;
    },durationGreen);
 
    setTimeout(function () {
        green.style.opacity=0.5;
        red.style.opacity=1.0;
        orange.style.opacity=0.5;
    },durationGreen+durationOrange);
 
    setTimeout(function () {
        green.style.opacity=1.0;
        red.style.opacity=0.5;
        orange.style.opacity=0.5;
    },durationGreen+durationOrange+durationRed);
}

// Obtener el JSON de los semáforos
function getJSONP(url, success) {
    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;
    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };
    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var data = JSON.parse(Get('https://xompasssuiteadminstg.z20.web.core.windows.net/semaphore.json'));
console.log(data);
var durationGreen = 0;
var durationOrange = 0;
var durationRed = 0;
// Obtener el semafóro inicial
const start = data.currentLightColor;
// Obtener las duraciones de los semáforos
for (let i = 0; i < data.lights.length; i++) {
    if (data.lights[i].color == "green") {
        durationGreen = data.lights[i].duration * 1000;
    } else if (data.lights[i].color == "orange") {
        durationOrange = data.lights[i].duration * 1000;
    } else if (data.lights[i].color == "red") {
        durationRed = data.lights[i].duration* 1000;
    }
}
console.log(durationGreen);
console.log(durationOrange);
console.log(durationRed);
var timer=setInterval(function () {
    startTrafficSignal(durationGreen, durationOrange, durationRed, start);
},durationGreen + durationOrange + durationRed);
startTrafficSignal(durationGreen, durationOrange, durationRed, start);