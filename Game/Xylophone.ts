const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.addEventListener("click", handleClick);

interface XyloKey {
    pitch: string,
    size: number,
    color: string,
    posX: number,
    posY: number,
}

function createBoard() {

}

function handleClick(_event: MouseEvent) {

}