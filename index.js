import { populateExpenses } from "./updateData.js"

let type = ["Expense", "Income", "Investment"]

let catergory = JSON.parse(localStorage.getItem("categories")) || ["Food", "Transport", "Utilities"] 

let expenses = JSON.parse(localStorage.getItem("expenses")) || [
    { name: "Groceries", amount: 50, category: "Food", type: type[0], date: new Date().toLocaleDateString() }, // Today
    { name: "Bus Ticket", amount: 2.5, category: "Transport", type: type[0], date: new Date().toLocaleDateString() }, // Today
    { name: "Electricity Bill", amount: 100, category: "Utilities", type: type[0], date: new Date().toLocaleDateString() }, // Today
    { name: "Dinner", amount: 30, category: "Food", type: type[0], date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() }, // Yesterday
    { name: "Dinner", amount: 30, category: "Food", type: type[0], date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() }, // Yesterday
    { name: "Coffee", amount: 5, category: "Food", type: type[0], date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString() }, // 6 days ago
    { name: "Books", amount: 20, category: "Education", type: type[0], date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString() }, // 5 days ago
    { name: "Lunch", amount: 15, category: "Food", type: type[0], date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() }, // Yesterday
]


document.getElementById("type").innerHTML = type.map(type => `<option value="${type}">${type}</option>`).join('')
document.getElementById("category").innerHTML = catergory.map(category => `<option value="${category}">${category}</option>`).join('')

document.getElementById("add-category-form").addEventListener("submit", function(e) {
    e.preventDefault()
    let category = document.querySelector("input[name=categoryName]").value
    catergory.push(category)
    document.querySelector("input[name=categoryName]").value = ""

    let li = document.createElement("li")
    li.textContent = category
    document.querySelector("#categories").appendChild(li)   

    let option = document.createElement("option")
    option.textContent = category
    option.value = category
    document.querySelector("#category").appendChild(option)
    console.log(catergory)
    localStorage.setItem("categories", JSON.stringify(catergory))
})

document.getElementById("add-expense-form").addEventListener("submit", function(e) {
    e.preventDefault()
    let expense = document.querySelector("input[name=expenseName]").value
    let amount = document.querySelector("input[name=expenseAmount]").value
    let category = document.querySelector("#category").value
    let type = document.querySelector("#type").value

    expenses.push({
        name: expense,
        amount: amount,
        category: category,
        type: type,
        date: new Date().toLocaleDateString()
    })
    console.log(expense)
    let li = document.createElement("li")
    for(let i = 0; i < expenses.length; i++){
        li.textContent = `${expenses[i].name} - ${expenses[i].amount} - ${expenses[i].category} - ${expenses[i].date}`
    }
    document.querySelector("#expenses").appendChild(li)
    console.log(expenses[expenses.length - 1])
    populateExpenses(expenses)

    localStorage.setItem("expenses", JSON.stringify(expenses))
})


window.openTab = function(tabId) {
      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
      });
      document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
      event.target.classList.add('active');
}




window.onload = function () {
    const sessionData = JSON.parse(localStorage.getItem('sessionToken'));

    if (!sessionData || new Date().getTime() > sessionData.expires) {
        localStorage.removeItem('sessionToken'); 
        window.location.href = 'login.html'; 
    } else {
        console.log('i logun hala osht'); 
    }
};


populateExpenses(expenses)