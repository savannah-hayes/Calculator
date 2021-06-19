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

    if (!action) {
      if (displayedNumber === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNumber + keyContent;
      }
    }

    if (action === "decimal") {
      display.textContent = displayedNumber + ".";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
    }

    Array.from(key.parentNode.children).forEach((key) =>
      key.classList.remove("is-depressed")
    );
  }
});

const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = n1 + n2;
  } else if (operator === "subtract") {
    result = n1 - n2;
  } else if (operator === "multiply") {
    result = n1 * n2;
  } else if (operator === "divide") {
    result = n1 / n2;
  }

  return result;
};
