"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", onClick);
let path = new Path2D;
path.rect(200, 200, 100, 100);
ctx.fill(path);
const audioCtx = new AudioContext();
const audio = new Audio("testSound.wav");
const source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);
function onClick(_event) {
    audioCtx.resume();
    audio.play();
}
;
//# sourceMappingURL=audioTesting.js.map