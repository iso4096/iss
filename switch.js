var streams = ['https://ustream.tv/embed/17074538?autoplay=true', 'https://ustream.tv/embed/9408562?autoplay=true']
var texts = ['View of Earth from ISS [Click to switch to stream of ISS]', 'View of ISS [Click to switch to stream of Earth from ISS]']
var tips = ["If you can't see anything, it's probably night.", "If the screen is blue, the camera on the ISS has lost contact with Earth."]

function click_handle() {
    var e = document.getElementById('interactive');
    var vid = document.getElementById('stream');
    var tip = document.getElementById('tip');
    var next = Math.abs(texts.indexOf(e.innerHTML) - 1);
    e.innerHTML = texts[next];
    vid.src = streams[next];
    tip.innerHTML = tips[next];
};

// https://stackoverflow.com/questions/247483/http-get-request-in-javascript

function get(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

docReady(function(){
    var data_output = document.getElementById('data');
    var lat, long = NaN, country = '[loading]';

    setInterval(function(){
        get("https://api.wheretheiss.at/v1/satellites/25544", function(data){
            data = JSON.parse(data);
            lat = data.latitude, long = data.longitude;
            data_output.innerHTML = `Location: ${Math.round(data.latitude * 1000)/1000}°N ${Math.round(data.longitude * 1000)/1000}°E, Country: ${country}`
        });
    }, 1200);
});