const applicationTitle = document.getElementsByTagName("h1");

const olX = document.querySelector("#list-x");
const olY = document.querySelector("#list-y");

const predictionsSection = document.querySelector(".prediction-section");

const inputX = document.querySelector("#value-x");
const inputY = document.querySelector("#value-y");

const numberToCalculateRegression =
  document.querySelector("#regression-result");

const results = document.querySelector("#results");

const trainningAxyX = [];
const trainningAxyY = [];

const predictionAxyX = [];
const predictionAxyY = [];

const addTrainningItemsBtn = document.querySelector("#add-trainning-items");
const startPredictionModeBtn = document.querySelector("#start-prediction-mode");
const addPredictionItemsBtn = document.querySelector("#add-prediction-items");

let axyX;
let axyY;

function trainning(config) {
  if (config.x) axyX = config.x;
  else axyX = [0];
  if (config.y) axyY = config.y;
  else axyY = [0];
}

function result(x, y) {
  const result = [];

  for (let i = 0; i < x.length; i++) {
    result.push(parseFloat(x[i] * y[i]));
  }

  return result;
}

function square(x) {
  const temp = [];

  for (let i = 0; i < x.length; i++) {
    temp.push(parseFloat(x[i] * x[i]));
  }

  return temp;
}

function sum(x) {
  let number = 0;

  for (let i = 0; i < x.length; i++) {
    number += parseFloat(x[i]);
  }

  return number;
}

function average(x) {
  return sum(x) / x.length;
}

function outcome(x, y, entry) {
  const firstResult = (sum(x) * sum(y)) / x.length;
  const secondResult = (sum(x) * sum(x)) / x.length;
  const thirdResult = sum(result(x, y)) - firstResult;
  const fourthResult = thirdResult / (sum(square(x)) - secondResult);
  const fifthResult = average(y) - fourthResult * average(x);

  return (fourthResult * entry + fifthResult).toFixed(0);
}

function predict(entries) {
  const regressions = [];

  for (let i = 0; i < entries.length; i++) {
    regressions.push(Number(outcome(axyX, axyY, entries[i])));
  }

  return regressions;
}

addTrainningItemsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  trainningAxyX.push(parseFloat(inputX.value.replace(/\D/g, "")));
  trainningAxyY.push(parseFloat(inputY.value.replace(/\D/g, "")));

  const xList = document.querySelectorAll("#list-x li");
  const yList = document.querySelectorAll("#list-y li");

  for (let numberX = 0; numberX < trainningAxyX.length; numberX++) {
    if (xList.length == 0 || numberX >= xList.length) {
      const li = document.createElement("li");
      li.textContent = trainningAxyX[numberX];
      olX.appendChild(li);
    }
  }

  for (let numberY = 0; numberY < trainningAxyY.length; numberY++) {
    if (yList.length == 0 || numberY >= yList.length) {
      const li = document.createElement("li");
      li.textContent = trainningAxyY[numberY];
      olY.appendChild(li);
    }
  }

  if (trainningAxyX.length > 1) {
    startPredictionModeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      predictionsSection.style.display = "block";
      addTrainningItemsBtn.style.display = "none";
      startPredictionModeBtn.style.display = "none";

      trainning({
        x: trainningAxyX,
        y: trainningAxyY,
      });

      inputX.classList.add("hide");
      inputY.classList.add("hide");
      numberToCalculateRegression.classList.remove("hide");
      addPredictionItemsBtn.classList.remove("hide");

      applicationTitle[0].textContent = "Predição de Números";
    });

    if (trainningAxyX.length > 1)
      startPredictionModeBtn.classList.remove("disabled");
  }

  inputX.value = "";
  inputY.value = "";
});

addPredictionItemsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const regressionsPredictionResults = predict([
    parseFloat(numberToCalculateRegression.value),
  ]);

  numberToCalculateRegression.value = "";

  const li = document.createElement("li");
  if (regressionsPredictionResults[0])
    li.textContent = regressionsPredictionResults[0];
  else
    li.textContent =
      "O algoritmo não achou uma predição deste numero. Tenta novamente com mais epocas de treinamento";
  results.appendChild(li);
});
