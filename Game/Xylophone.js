"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const keyCount = 8;
let pitches = ["C", "D", "E", "F", "G", "A", "H", "C'"];
let colors = ["#ea4029", "#2020b8", "#f3f646", "#42f4e9", "#53ed41", "#b53af3", "#f0af37", "#f360c0"];
canvas.addEventListener("click", handleClick);
createBoard();
function createBoard() {
    for (let i = 0; i < keyCount; i++) {
        let y = 100;
        let x = 50 + 60 * i;
        let newKey = {
            pitch: pitches[i],
            width: 50,
            length: 400,
            color: colors[i],
            posX: x,
            posY: y,
        };
    }
}
function handleClick(_event) {
}
//# sourceMappingURL=Xylophone.js.map