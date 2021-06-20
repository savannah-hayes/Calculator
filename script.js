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
    const { action } = key.dataset;
    const { firstValue, modValue, operator, previousKeyType } = state;

    if (keyType === "number") {
      return displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
        ? keyContent
        : displayedNum + keyContent;
    }
  };

  const updateCalculatorState = (key, calculator) => {
    const keyType = getKeyType(key);
    calculator.dataset.previousKeyType = keyType;

    if (keyType === "number") {
    }

    if (keyType === "decimal") {
    }

    if (keyType === "operator") {
      key.classList.add("is-depressed");
      calculator.dataset.operator = key.dataset.action;
      calculator.dataset.firstValue =
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
          ? calculatedValue
          : displayedNumber;
    }

    if (keyType === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.modValue = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
    }

    if (keyType !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "AC";
    }

    if (keyType === "calculate") {
      calculator.dataset.modValue =
        firstValue && previousKeyType === "calculate"
          ? modValue
          : displayedNumber;
    }

    Array.from(key.parentNode.children).forEach((key) =>
      key.classList.remove("is-depressed")
    );
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

  display.textContent = calculatedValue;
  calculator.dataset.firstValue = calculatedValue;
});

const calculate = (n1, operator, n2) => {
  const firstNumber = parseFloat(n1);
  const secondNumber = parseFloat(n2);
  if (operator === "add") return firstNumber + secondNumber;
  if (operator === "subtract") return firstNumber - secondNumber;
  if (operator === "multiply") return firstNumber * secondNumber;
  if (operator === "divide") return firstNumber / secondNumber;
};
