const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const keyCount = 8;
let pitches: string[] = ["C","D","E","F", "G", "A", "H", "C'"];
let colors: string[] = ["#ea4029", "#2020b8", "#f3f646", "#42f4e9", "#53ed41", "#b53af3", "#f0af37", "#f360c0"];

canvas.addEventListener("click", handleClick);
createBoard();

interface XyloKey {
    pitch: string,
    width: number,
    length: number,
    color: string,
    posX: number,
    posY: number,
}



function createBoard() {
    for (let i: number = 0; i < keyCount; i++) {

        let y: number = 100;
        let x: number = 50 + 60*i;
        
        let newKey: XyloKey = {
            pitch: pitches[i],
            width: 50,
            length: 400,
            color: colors[i],
            posX: x,
            posY: y,

        }
    }
    
}

function handleClick(_event: MouseEvent) {

}