const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const display = document.querySelector(".display");

keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNumber = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    const createResultString = () => {
      // Variables required are:
      // 1. keyContent
      // 2. displayedNum
      // 3. previousKeyType
      // 4. action
      if (!action) {
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

    if (action === "decimal") {
      if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      } else if (!displayedNumber.includes(".")) {
        display.textContent = displayedNumber + ".";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNumber;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calculatedValue = calculate(firstValue, operator, secondValue);
        display.textContent = calculatedValue;
        calculator.dataset.firstValue = calculatedValue;
      } else {
        calculator.dataset.firstValue = displayedNumber;
      }

      key.classList.add("is-depressed");

      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
      Array.from(key.parentNode.children).forEach((key) =>
        key.classList.remove("is-depressed")
      );
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.modValue = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "AC";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNumber;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNumber;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
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
