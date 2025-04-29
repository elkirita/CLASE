const URL = "https://teachablemachine.withgoogle.com/models/WW9lnaOvw/";
let model, webcam, labelContainer, maxPredictions;

async function init() {
    console.log("Loading model...");
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    x=[]
    window.requestAnimationFrame(loop)
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}
var indices= [];
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let emociones_proba = [
        parseFloat(prediction[0].probability.toFixed(1)),
        parseFloat(prediction[1].probability.toFixed(1)),
        parseFloat(prediction[2].probability.toFixed(1))
    ];
    const valorMaximo = Math.max(...emociones_proba); // Usar el operador spread (...) para pasar los elementos como argumentos individuales a Math.max
    const indice = emociones_proba.indexOf(valorMaximo);
    indices.push(indice);
    setTimeout(() => {
        CambiarColor();
    }, 3000);
}
function findMode(arr) {
    const frequencyMap = {};
    let maxFrequency = 0;
    let modes = [];
    for (const element of arr) {
        frequencyMap[element] = (frequencyMap[element] || 0) + 1;
        if (frequencyMap[element] > maxFrequency) {
            maxFrequency = frequencyMap[element];
            modes = [element];
        } else if (frequencyMap[element] === maxFrequency) {
            modes.push(element);
        }
    }
    return modes;
}
function CambiarColor() {
    indice = findMode(indices);
    if (indice == 0) {
        window.location.href = "pages/home.php?tema=0";
        window.alert("Página feliz");
    } else if (indice == 1) {
        window.location.href = "pages/home.php?tema=1";
        window.alert("Página triste");
    } else if (indice == 2) {
        window.location.href = "pages/home.php?tema=2";
        window.alert("Página enojado");
    }
}