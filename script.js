const boton = document.getElementById("startButton");
const video = document.getElementById("video");

boton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;

    } catch (error) {
        alert("No se pudo acceder a la cámara.");
        console.error(error);
    }
})