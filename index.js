let catergory = []
let expenses = []

document.getElementById("add-category-form").addEventListener("submit", function(e) {
    e.preventDefault()
    let category = document.querySelector("input").value
    catergory.push(category)
    document.querySelector("input").value = ""

    let li = document.createElement("li")
    li.textContent = category
    document.querySelector("#categories").appendChild(li)   

    let option = document.createElement("option")
    option.textContent = category
    option.value = category
    document.querySelector("#category").appendChild(option)
})

document.getElementById("add-expense-form").addEventListener("submit", function(e) {
    e.preventDefault()
    let expense = document.querySelector("input[name=expenseName]").value
    let amount = document.querySelector("input[name=expenseAmount]").value
    let category = document.querySelector("#category").value

    expenses.push({
        name: expense,
        amount: amount,
        category: category
    })
    console.log(expense)
    let li = document.createElement("li")
    li.textContent = `${expense} - ${amount} - ${category}`
    document.querySelector("#expenses").appendChild(li)
})