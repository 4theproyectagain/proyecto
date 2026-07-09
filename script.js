const boton = document.getElementById("startButton");
const video = document.getElementById("video");
const emotionText = document.getElementById("emotion");

boton.addEventListener("click", async () => {
    try {

        await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
        await faceapi.nets.faceExpressionNet.loadFromUri("./models");

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;

        emotionText.innerHTML = "🧠 IA activada, analizando...";

        video.addEventListener("play", () => {

            setInterval(async () => {

                const detections = await faceapi
                    .detectSingleFace(
                        video,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceExpressions();

                if (detections) {

                    const expressions = detections.expressions;

                    const emotion = Object.keys(expressions)
                        .reduce((a, b) =>
                            expressions[a] > expressions[b] ? a : b
                        );

                    emotionText.innerHTML =
                        "😊 " + emotion;

                }

            }, 1000);

        });

    } catch (error) {
    alert(error.message);
    console.error(error);
}
    }
});