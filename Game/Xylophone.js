"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const keyCount = 8;
let pitches = ["C", "D", "E", "F", "G", "A", "H", "C'"];
let colors = ["#ea4029", "#2020b8", "#f3f646", "#42f4e9", "#53ed41", "#b53af3", "#f0af37", "#f360c0"];
let keys = [];
canvas.addEventListener("click", handleClick);
createBoard();
function createBoard() {
    let rods = new Path2D;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    rods.moveTo(120, 200);
    rods.lineTo(canvas.width - 180, 200);
    rods.moveTo(120, canvas.height - 200);
    rods.lineTo(canvas.width - 180, canvas.height - 200);
    ctx.stroke(rods);
    for (let i = 0; i < keyCount; i++) {
        let y = 20 + 20 * i;
        let x = 150 + 110 * i;
        let l = 560 - 40 * i;
        let newKey = {
            pitch: pitches[i],
            width: 75,
            length: l,
            color: colors[i],
            posX: x,
            posY: y,
            path: new Path2D,
        };
        keys.push(newKey);
        drawKey(newKey);
    }
}
function drawKey(_key) {
    let x = _key.posX;
    let y = _key.posY;
    let keyPath = _key.path;
    ctx.fillStyle = _key.color;
    ctx.lineWidth = 1;
    keyPath.moveTo(x, y);
    keyPath.rect(x, y, _key.width, _key.length);
    ctx.fill(keyPath);
    ctx.stroke(keyPath);
}
function handleClick(_event) {
    let x = _event.offsetX;
    let y = _event.offsetY;
    for (let i = 0; i < keys.length; i++) {
        let keyCheck = keys[i];
        if (ctx.isPointInPath(keyCheck.path, x, y)) {
            console.log(keyCheck.pitch);
        }
    }
}
//# sourceMappingURL=Xylophone.js.map