const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.addEventListener("click", onClick);
let path: Path2D = new Path2D;
path.rect(200, 200, 100, 100);
ctx.fill(path);

const audioCtx = new AudioContext();
const audio = new Audio("testSound.wav");
const source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);

function onClick(_event: MouseEvent) {
  audioCtx.resume();
  audio.play();

};

