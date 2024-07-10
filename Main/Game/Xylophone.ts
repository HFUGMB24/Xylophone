let currentGameMode: string = "Standard";

document.getElementById("start-game")!.addEventListener("click", startGame);
const audioCtx = new AudioContext();

let keys: XyloKey[] = [];
let playerSong: string = "";
let playerTurn: boolean = false;
let keysPlayed: number = 0;
let song: string = "12345678"; 

interface XyloKey {
    sound: string,
    pitch: string,
    width: number,
    length: number,
    color: string,
    posX: number,
    posY: number,
    path: Path2D,
}

function startGame() {
    // Get the selected game mode
    const gameModeSelect = document.getElementById("game-mode") as HTMLSelectElement;
    currentGameMode = gameModeSelect.value;

    // Clear the body
    document.body.innerHTML = "";

    // Create and append the canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = 1200;
    canvas.height = 600;
    canvas.style.border = "1px solid black";
    document.body.appendChild(canvas);

    if (currentGameMode === "Standard") {
        const button = document.createElement('button');
        button.id = "Simon";
        button.textContent = 'Play next note';
        button.style.background = "blue";
        button.style.color = "white";
        document.body.appendChild(button);
        button.addEventListener('click', () => {
            simonSays(song);
            console.log('Button clicked');
        });
    }

    // Initialize the xylophone game
    initXylophoneGame();
}

function initXylophoneGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    const keyCount = 8;
    let pitches: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let sounds: string[] = ["Sounds/xylophone-c3.wav", "Sounds/xylophone-d3.wav", "Sounds/xylophone-e3.wav", "Sounds/xylophone-f3.wav",
        "Sounds/xylophone-g3.wav", "Sounds/xylophone-a.wav", "Sounds/xylophone-b-h.wav", "Sounds/xylophone-c2_kleines_C.wav"];
    let colors: string[] = ["#ea4029", "#2020b8", "#f3f646", "#42f4e9", "#53ed41", "#b53af3", "#f0af37", "#f360c0"];

    const audioCtx = new AudioContext();

    canvas.addEventListener("click", handleClick);
    createBoard();

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
            let l: number = 560 - 40 * i;

            let newKey: XyloKey = {
                sound: sounds[i],
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
        
        if (currentGameMode === "Standard") {
            if (playerTurn == true) {
                if (keysPlayed < songProgress) {
                    for (let i: number = 0; i < keys.length; i++) {
                        let keyCheck: XyloKey = keys[i];
                        let sound = new Audio(keyCheck.sound);

                        if (ctx.isPointInPath(keyCheck.path, x, y)) {
                            playerSong = playerSong + keyCheck.pitch;
                            console.log(keyCheck.pitch);
                            audioCtx.resume().then(() => {
                                sound.play();
                            });
                            keysPlayed += 1;
                            console.log("Keys played: " + keysPlayed);
                            if (checkPlayerSong(song, playerSong) == false) {
                                console.log("You made a mistake");
                            }
                            if(keysPlayed >= songProgress) {
                                playerTurn = false;
                            }
                        }
                    }               
                }
            }
        } else if (currentGameMode === "Freemode") {
            for (let i: number = 0; i < keys.length; i++) {
                let keyCheck: XyloKey = keys[i];
                let sound = new Audio(keyCheck.sound);

                if (ctx.isPointInPath(keyCheck.path, x, y)) {
                    console.log(keyCheck.pitch);
                    audioCtx.resume().then(() => {
                        sound.play();
                    });
                }
            }
        }
    }
}

let songProgress: number = 0;
let strikeCount: number = 0;

function simonSays(_song: string) {
    if (currentGameMode !== "Standard") return;

    if (playerTurn == false) {
        let note: string = _song[songProgress];
        for (let b: number = 0; b < keys.length; b++) {
            if (note == keys[b].pitch) {
                console.log(note);
                let sound = new Audio(keys[b].sound);

                audioCtx.resume();
                sound.play();
                songProgress += 1;
                playerTurn = true;
                playerSong = "";
                keysPlayed = 0;

                console.log(songProgress);
            }
        }
    }
}

function checkPlayerSong(_song: string, _player: string): boolean {
    let playerCorrect: boolean = true;
    let songPart:string = _song.substring(0,keysPlayed);
    if (songPart !== _player) {
        playerCorrect = false;
    }
    return playerCorrect
}