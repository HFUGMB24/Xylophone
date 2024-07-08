const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const keyCount = 8;

canvas.addEventListener("click", handleClick);
createBoard();

interface XyloKey {
    pitch: string,
    size: number,
    color: string,
    posX: number,
    posY: number,
}



function createBoard() {
    for (let i: number = 0; i < keyCount; i++) {
        
    }
    
}

function handleClick(_event: MouseEvent) {

}