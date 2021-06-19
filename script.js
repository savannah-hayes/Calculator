const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const display = document.querySelector(".display");

keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      }
    }
  }
});
