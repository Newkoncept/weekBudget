// Classes
class HTMLUI {
  displayBudget(userInput) {
    totalBudgetDisplay.textContent = userInput;
    budgetLeftDisplay.textContent = userInput;
  }

  displayRemainingBudget(amount) {
    budgetLeftDisplay.textContent = amount;
  }

  printMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("text-center", "alert", className);

    messageDiv.innerHTML = `${message}`;

    expenseForm.insertBefore(messageDiv, document.querySelector(".form-group"));

    setTimeout(function () {
      document.querySelector(".alert").remove();
      expenseForm.reset();
    }, 3000);
  }

  budgetLeftColorChanger(classToBeAdded, classToBeRemoved) {
    budgetLeftDisplay.parentElement.parentElement.classList.remove("alert-success");
    budgetLeftDisplay.parentElement.parentElement.classList.add(classToBeAdded);
    budgetLeftDisplay.parentElement.parentElement.classList.remove(classToBeRemoved);
  }

  displayUserExpense(expense, amount) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "mb-2");

    li.innerHTML = `
    ${expense} 
    <span class="badge badge-primary badge-pill">${amount}</span>`;

    listGroup.appendChild(li);
  }
}

class Budget {
  constructor(amount) {
    this.budget = amount;
    this.budgetLeft = amount;
  }

  calculateExpense(amount) {
    return (this.budgetLeft -= amount);
  }

  budgetLeftPercentage() {
    if (this.budget / 4 > this.budgetLeft) {
      html.budgetLeftColorChanger("alert-danger", "alert-warning");
    } else if (this.budget / 2 > this.budgetLeft) {
      html.budgetLeftColorChanger("alert-warning", "alert-danger");
    }
  }
}

// Variables
const totalBudgetDisplay = document.querySelector("span#total");
const budgetLeftDisplay = document.querySelector("span#left");
const expenseForm = document.querySelector("#add-expense");
const listGroup = document.querySelector("ul.list-group");

let budget, budgetLeft;

const html = new HTMLUI();

// Event Listeners
document.addEventListener("DOMContentLoaded", getBudget);
expenseForm.addEventListener("submit", processExpense);

// Functions
function getBudget() {
  let userInput = prompt("What is your budget for the week");

  if (userInput === null || userInput === "" || userInput === "0") {
    window.location.reload();
  } else {
    html.displayBudget(userInput);

    budget = new Budget(Number(userInput));
  }
}

function processExpense(e) {
  e.preventDefault();

  let expense = document.querySelector("#expense").value;
  let amount = document.querySelector("#amount").value;

  if (expense === "" || amount === "") {
    html.printMessage("There was an error, all fields are mandatory", "alert-danger");
  } else {
    //   Convert the amount to a number
    amount = Number(amount);

    // Calculating the remaining budget
    budgetLeft = budget.calculateExpense(amount);

    // Budget Left value checker
    budget.budgetLeftPercentage();

    // Outputing the activity to the screen
    html.printMessage("Added....", "alert-success");
    html.displayRemainingBudget(budgetLeft);
    html.displayUserExpense(expense, amount);

    // Reset Form
    expenseForm.reset();
  }
}
