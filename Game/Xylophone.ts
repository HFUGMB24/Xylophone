const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const keyCount = 8;
let pitches: string[] = ["C","D","E","F", "G", "A", "H", "C'"];
let colors: string[] = []

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
        
        let newKey: XyloKey = {
            pitch: pitches[i];
            width: 100,
            length: 500,
            color:

        }
    }
    
}

function handleClick(_event: MouseEvent) {

}