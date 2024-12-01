import {
  filterDataByDate,
  filterDataByCategory,
  filterDataByType,
  filterByDate,
  filterByCategory,
  filterByType,
} from "./utils.js";

let activeFilterCategory = filterByCategory.all;
let activeFilterType = filterByType.all;
let activeFilterDate = filterByDate.all;

const dataContainer = document.getElementById("data-container");
const paginationContainer = document.getElementById("pagination-container");
const expensesData = JSON.parse(localStorage.getItem("expenses"));
let expenses = expensesData;
const itemsPerPage = 10;
let currentPage = 1;

const populateExpenses = (expenses, currentPage) => {
  dataContainer.innerHTML = "";

  const transactionsCount = document.getElementById("transactions-count");
  transactionsCount.innerText = `You had ${expenses.length} transactions this month`;

  expenses.length === 0 && dataContainer.appendChild(noExpenses());

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedExpenses = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(startIndex, endIndex);

  paginatedExpenses.forEach((expense) => {
    const expenseElement = createExpenseElement(
      expense,
      expenses.indexOf(expense) + 1 + startIndex
    );
    dataContainer.appendChild(expenseElement);
  });

  updatePagination(expenses.length === 0 ? 1 : expenses.length, currentPage);
};

const noExpenses = () => {
  const expenseElement = document.createElement("div");
  expenseElement.className = `flex justify-center items-center `;
  expenseElement.style.height = "100%";
  expenseElement.style.width = "100%";
  expenseElement.style.alignItems = "center";

  expenseElement.innerHTML = `
    <p class="text-gray-500 text-start text-sm ">No data found 💔</p>
    `;

  return expenseElement;
};

const updatePagination = (totalItems, currentPage) => {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.className = "pagination-button";

    pageButton.disabled = i === currentPage && totalItems > 0;
    if (totalItems === 0 && i === 1) {
      pageButton.disabled = false;
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      populateExpenses(expenses, currentPage);
    });

    paginationContainer.appendChild(pageButton);
  }
};

function createExpenseElement(expense, id) {
  const typeColors = {
    Expense: "red-500",
    Income: "green-500",
    Investment: "purple-500",
    Saving: "yellow-500",
  };

  const typeClass = typeColors[expense.type] || "";

  const expenseElement = document.createElement("div");
  expenseElement.className = `flex flex-row justify-between items-center `;
  expenseElement.style.padding = "10px";
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.3)`;
  expenseElement.style.borderLeft = `5px solid ${randomColor}`;

  expenseElement.innerHTML = `
    <p class="text-gray-500 w-1/12 text-start text-sm flex flex-col"><span class="font-medium">#${id}</span><span class="text-gray-500"> ${
    expense.date
  }</span></p>
    <p class="font-medium w-1/6 text-start">${expense.name}</p>
    <div class="w-1/6 text-start flex">
        <p style="border: 1px solid #ccc;padding: 3px 15px;border-radius: 9999px;" class="font-medium text-sm">${
          expense.category
        }</p>
    </div>
    <p class="font-medium w-1/6 text-start text-${typeClass}">${
    expense.type
  }</p>
    <p class="font-medium w-1/6 text-end">${
      expense.type === "Expense" ? "-" : "+"
    } ${expense.amount}€</p>
   
`;

  return expenseElement;
}

populateExpenses(expenses, currentPage);

window.filterData = function (filterByDate) {
  expenses = filterDataByCategory(expensesData, activeFilterCategory);
  expenses = filterDataByType(expenses, activeFilterType);
  const filteredData = filterDataByDate(expenses, filterByDate);
  activeFilterDate = filterByDate;
  expenses = filteredData;

  const button = document.getElementById(filterByDate);

  document.querySelectorAll(".filter-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  populateExpenses(expenses, currentPage);
};

const populateFilterOptions = () => {
  const categories = expensesData
    .map((expense) => expense.category)
    .filter((value, index, self) => self.indexOf(value) === index);
  const types = expensesData
    .map((expense) => expense.type)
    .filter((value, index, self) => self.indexOf(value) === index);

  const categorySelect = document.getElementById("filter-category");
  const typeSelect = document.getElementById("filter-type");

  categorySelect.innerHTML = "";
  typeSelect.innerHTML = "";

  const allCategoryOption = document.createElement("option");
  allCategoryOption.value = "all";
  allCategoryOption.textContent = "All";
  categorySelect.appendChild(allCategoryOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  const allTypeOption = document.createElement("option");
  allTypeOption.value = "all";
  allTypeOption.textContent = "All";
  typeSelect.appendChild(allTypeOption);

  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });
};

populateFilterOptions();
document
  .getElementById("filter-category")
  .addEventListener("change", function () {
    const err = document.getElementById("filter-category").value;
    expenses = filterDataByDate(expensesData, activeFilterDate);
    expenses = filterDataByType(expenses, activeFilterType);
    console.log(expenses, activeFilterDate, err);
    const filteredData = filterDataByCategory(expenses, err);
    activeFilterCategory = err;
    expenses = filteredData;
    populateExpenses(expenses, currentPage);
  });

document.getElementById("filter-type").addEventListener("change", function () {
  const err = document.getElementById("filter-type").value;
  expenses = filterDataByCategory(expensesData, activeFilterCategory);
  expenses = filterDataByDate(expenses, activeFilterDate);
  expenses = filterDataByType(expenses, err);
  activeFilterType = err;
  populateExpenses(expenses, currentPage);
});

document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
