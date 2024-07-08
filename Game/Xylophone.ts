const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const keyCount = 8;
let pitches: string[] = ["C", "D", "E", "F", "G", "A", "H", "C'"];
let colors: string[] = ["#ea4029", "#2020b8", "#f3f646", "#42f4e9", "#53ed41", "#b53af3", "#f0af37", "#f360c0"];
let keys: XyloKey[] = [];

canvas.addEventListener("click", handleClick);
createBoard();

interface XyloKey {
    pitch: string,
    width: number,
    length: number,
    color: string,
    posX: number,
    posY: number,
    path: Path2D,
}



function createBoard() {

    let rods: Path2D = new Path2D;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    rods.moveTo(120, 200);
    rods.lineTo(canvas.width - 150, 200);
    rods.moveTo(120, canvas.height - 200);
    rods.lineTo(canvas.width - 150, canvas.height - 200);

    ctx.stroke(rods);

    for (let i: number = 0; i < keyCount; i++) {

        let y: number = 20 + 20 * i;
        let x: number = 150 + 110 * i;
        let l: number = 560 - 40* i;

        let newKey: XyloKey = {
            pitch: pitches[i],
            width: 100,
            length: l,
            color: colors[i],
            posX: x,
            posY: y,
            path: new Path2D,
        }

        keys.push(newKey);
        drawKey(newKey);
    }

}

function drawKey(_key: XyloKey) {
    let x: number = _key.posX;
    let y: number = _key.posY;
    let keyPath: Path2D = _key.path;

    ctx.fillStyle = _key.color;
    ctx.lineWidth = 1;

    keyPath.moveTo(x, y);
    keyPath.rect(x, y, _key.width, _key.length);
    ctx.fill(keyPath);
    ctx.stroke(keyPath);
}

function handleClick(_event: MouseEvent) {
    let x: number = _event.offsetX;
    let y: number = _event.offsetY;

    for(let i: number = 0; i < keys.length; i++) {

        let keyCheck: XyloKey = keys[i];

        if (ctx.isPointInPath(keyCheck.path, x, y)) {
            console.log(keyCheck.pitch);
        }
    }


}
