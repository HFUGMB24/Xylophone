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
    const gameModeSelect = document.getElementById("game-mode") as HTMLSelectElement; //gets gamemode
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

        //Explanation paragraph
        const explanation = document.createElement("p");
        explanation.textContent = "Press the button to play the next sound. Replay every sound you heard in order.";
        explanation.style.marginTop = "10px";
        explanation.style.fontWeight = "bold";
        explanation.style.maxWidth = "300px";
        explanation.style.textAlign = "center";
        document.body.appendChild(explanation);

        //Strike counter
        let counter: HTMLElement = document.createElement("span");
        counter.textContent = "Strikes: 0";
        document.body.appendChild(counter);
        counter.style.textAlign = "center";
        

        

    // Initialize the xylophone game
    initXylophoneGame();
}
}

function initXylophoneGame() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    const keyCount = 8;
    let pitches: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let sounds: string[] = ["Sounds/xylophone-c3.wav", "Sounds/xylophone-d3.wav", "Sounds/xylophone-e3.wav", "Sounds/xylophone-f3.wav",
        "Sounds/xylophone-g3.wav", "Sounds/xylophone-a.wav", "Sounds/xylophone-b-h.wav", "Sounds/xylophone-c2_kleines_C.wav"];
    let colors: string[] = ["#ea4029", "#2020b8", "#f3f646", "#42f4e9", "#53ed41", "#b53af3", "#f0af37", "#f360c0"];


    canvas.addEventListener("click", handleClick);
    createBoard();

    function createBoard() { //builds the xylophone
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
            drawKey(newKey, ctx);
        }
    }


    let tempSong: string = "";
    function handleClick(_event: MouseEvent) {
        let x: number = _event.offsetX;
        let y: number = _event.offsetY;

        if (currentGameMode === "Standard") { //StandardMode: Simon Says
            if (playerTurn == true) {
                if (keysPlayed < songProgress) {
                    for (let i: number = 0; i < keys.length; i++) {
                        let keyCheck: XyloKey = keys[i];
                        let sound = new Audio(keyCheck.sound);

                        if (ctx.isPointInPath(keyCheck.path, x, y)) {
                            
                            tempSong = playerSong + keyCheck.pitch;
                            playKey(keyCheck);

                            keysPlayed += 1;
                            
                            if (checkPlayerSong(song, tempSong) == false) { 
                                console.log("You made a mistake");
                                wrongKey();
                                keysPlayed = keysPlayed - 1;
                            }
                            else {playerSong = tempSong;}
                            
                            if (keysPlayed >= songProgress) {
                                playerTurn = false;
                            }

                            console.log("Keys played: " + keysPlayed);
                            if (playerSong.length == song.length) {
                                victory();
                            }
                            
                        }
                    }
                }
            }
        }
        else if (currentGameMode === "Freemode") { //FreeMode: Player can play freely
            for (let i: number = 0; i < keys.length; i++) {
                let keyCheck: XyloKey = keys[i];

                if (ctx.isPointInPath(keyCheck.path, x, y)) {
                    playKey(keyCheck);
                };
            }
        }
    }
}

function drawKey(_key: XyloKey, _ctx: CanvasRenderingContext2D) {
    let x: number = _key.posX;
    let y: number = _key.posY;
    let keyPath: Path2D = _key.path;

    _ctx.fillStyle = _key.color;
    _ctx.lineWidth = 1;

    keyPath.moveTo(x, y);
    keyPath.rect(x, y, _key.width, _key.length);
    _ctx.fill(keyPath);
    _ctx.stroke(keyPath);
}


function playKey(_key: XyloKey): void {
    let sound = new Audio(_key.sound);
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.stroke(_key.path);
    audioCtx.resume().then(() => {
        sound.play();
    });
    //
    drawKey(_key, ctx);
}

let songProgress: number = 0;


//SimonSaysMode, Computer plays current note and waits for the player to play all previous notes plus the current one
function simonSays(_song: string) {
    if (currentGameMode !== "Standard") return;

    if (playerTurn == false) {
        let note: string = _song[songProgress];
        for (let b: number = 0; b < keys.length; b++) {
            if (note == keys[b].pitch) {
                console.log(note);
                playKey(keys[b]);
                songProgress += 1;
                playerTurn = true;
                playerSong = "";
                keysPlayed = 0;

                console.log(songProgress);
            }
        }
    }
}

//checks if the notes player by player are correct
function checkPlayerSong(_song: string, _player: string): boolean {
    let playerCorrect: boolean = true;
    let songPart: string = _song.substring(0, keysPlayed);
    if (songPart !== _player) {
        playerCorrect = false;
    }

    return playerCorrect
}

let strikeCount: number = 0;
function wrongKey(): void {
    strikeCount += 1;
    let strikes: HTMLElement = document.getElementsByTagName("span")[0];
    strikes.textContent = "Strikes: " + String(strikeCount);
    if (strikeCount >= 3){
        gameOver();
    }
}

function gameOver():void {
    document.body.innerHTML = "";

    let gameOver: HTMLElement = document.createElement("h1")!;
    gameOver.textContent = "Game Over";
    document.body.appendChild(gameOver);

    let p: HTMLElement = document.createElement("p");
    p.textContent = "You played too many wrong notes. Skill Issue.";
    document.body.appendChild(p);

    let retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.addEventListener("click", restart);
    document.body.appendChild(retryButton);
}

function victory(): void {
    document.body.innerHTML = "";

    let victory: HTMLElement = document.createElement("h1")!;
    victory.textContent = "You`re Winner!";
    document.body.appendChild(victory);

    let p: HTMLElement = document.createElement("p");
    p.textContent = "You played the correct notes. Congratulations!";
    document.body.appendChild(p);

    let restartButton = document.createElement("button");
    restartButton.textContent = "Back to home screen";
    restartButton.addEventListener("click", restart);
    document.body.appendChild(restartButton);
}


function restart(_event: MouseEvent):void {
    location.reload();
}

