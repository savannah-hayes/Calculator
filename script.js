const calculate = function (n1, operator, n2) {
  const firstNumber = parseFloat(n1);
  const secondNumber = parseFloat(n2);
  switch (operator) {
    case "add":
      return firstNumber + secondNumber;
    case "subtract":
      return firstNumber - secondNumber;
    case "multiply":
      return firstNumber * secondNumber;
    case "divide":
      return firstNumber / secondNumber;
  }
};

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return "number";
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";
  return action;
};

const createResultString = (key, displayedNumber, state) => {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } = state;

  if (keyType === "number") {
    return displayedNumber === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
      ? keyContent
      : displayedNumber + keyContent;
  }

  if (keyType === "decimal") {
    if (previousKeyType === "operator" || previousKeyType === "calculate")
      return "0.";
    if (!displayedNumber.includes(".")) return displayedNumber + ".";
    return displayedNumber;
  }

  if (keyType === "operator") {
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNumber)
      : displayedNumber;
  }

  if (keyType === "clear") return 0;

  if (keyType === "calculate") {
    return firstValue
      ? previousKeyType === "calculate"
        ? calculate(displayedNumber, operator, modValue)
        : calculate(firstValue, operator, displayedNumber)
      : displayedNumber;
  }
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNumber
) => {
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } =
    calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNumber;
  }

  if (keyType === "calculate") {
    calculator.dataset.modValue =
      firstValue && previousKeyType === "calculate"
        ? modValue
        : displayedNumber;
  }

  if (keyType === "clear" && key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.modValue = "";
    calculator.dataset.previousKeyType = "";
  }
};

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach((key) =>
    key.classList.remove("is-depressed")
  );

  if (keyType === "clear" && key.textContent !== "AC") key.textContent = "AC";

  if (keyType !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "AC";
  }
};

const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const display = document.querySelector(".display");

keys.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  const key = event.target;
  const displayedNumber = display.textContent;
  const resultString = createResultString(
    key,
    displayedNumber,
    calculator.dataset
  );

  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNumber);
  updateVisualState(key, calculator);
});
