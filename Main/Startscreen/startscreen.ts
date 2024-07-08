document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-game") as HTMLButtonElement;

    startButton.addEventListener("click", () => {
        window.location.href = "Main/Game/Xylophone.html"
    })
})