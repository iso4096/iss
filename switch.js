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