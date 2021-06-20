const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const display = document.querySelector(".display");

keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) return;
  const displayedNumber = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;
  const resultString = createResultString(
    event.target,
    displayedNumber,
    calculator.dataset
  );

  const createResultString = (key, displayedNumber, state) => {
    const keyContent = key.textContent;
    const keyType = getKeyType(key);
    const { firstValue, modValue, operator, previousKeyType } = state;

    if (keyType === "number") {
      return displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
        ? keyContent
        : displayedNum + keyContent;
    }
  };

  calculator.dataset.previousKeyType = "number";

  if (previousKeyType === "calculate") {
    calculator.dataset.operator = "";
    calculator.dataset.modValue = "0";
  }

  if (keyType === "decimal") {
    if (!displayedNumber.includes(".")) return displayedNumber + ".";
    if (previousKeyType === "operator" || previousKeyType === "calculate")
      return "0.";
    return displayedNumber;
  }
  calculator.dataset.previousKeyType = "decimal";

  if (keyType === "operator") {
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNumber)
      : displayedNumber;
  }

  display.textContent = calculatedValue;
  calculator.dataset.firstValue = calculatedValue;

  key.classList.add("is-depressed");
  calculator.dataset.previousKeyType = "operator";
  calculator.dataset.operator = action;

  Array.from(key.parentNode.children).forEach((key) =>
    key.classList.remove("is-depressed")
  );

  {
    if (keyType === "clear") return 0;
    {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.modValue = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      calculator.dataset.previousKeyType = "clear";
    }

    if (keyType !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "AC";
    }

    if (keyType === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNumber;

      return firstValue
        ? previousKeyType === "calculate"
          ? calculate(displayedNumber, operator, modValue)
          : calculate(firstValue, operator, displayedNumber)
        : displayedNumber;

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

const calculate = (n1, operator, n2) => {
  const firstNumber = parseFloat(n1);
  const secondNumber = parseFloat(n2);
  if (operator === "add") return firstNumber + secondNumber;
  if (operator === "subtract") return firstNumber - secondNumber;
  if (operator === "multiply") return firstNumber * secondNumber;
  if (operator === "divide") return firstNumber / secondNumber;
};
