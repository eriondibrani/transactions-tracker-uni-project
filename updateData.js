const todayContainer = document.getElementById('today-expenses');
const yesterdayContainer = document.getElementById('yesterday-expenses');
const last7DaysContainer = document.getElementById('last-7-days');

export const populateExpenses = (expenses) => {
    const today = new Date();
    const todayString = today.toLocaleDateString();
    const yesterdayString = new Date(today.setDate(today.getDate() - 1)).toLocaleDateString();


    const todayExpenses = expenses.filter(expense => expense.date === todayString);

    todayExpenses.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        todayContainer.appendChild(expenseElement);
    });

   
    const yesterdayExpenses = expenses.filter(expense => expense.date === yesterdayString);

    yesterdayExpenses.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        yesterdayContainer.appendChild(expenseElement);
    });

    const last7DaysExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 2));
        return expenseDate < yesterday && (new Date() - expenseDate) / (1000 * 60 * 60 * 24) <= 7; 
    });

    last7DaysExpenses.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        last7DaysContainer.appendChild(expenseElement);
    });
}

function createExpenseElement(expense) {
    const expenseElement = document.createElement('div');
    expenseElement.className = 'flex flex-row justify-between items-center';
    expenseElement.style.padding = '10px';
    expenseElement.innerHTML = `
        <p class="font-medium w-1/4 text-start">${expense.name}</p>
        <div class="w-1/4 text-start flex">
            <p style="border: 1px solid #ccc;padding: 3px 15px;border-radius: 9999px;" class="font-medium text-sm">${expense.category}</p>
        </div>
        <p class="text-gray-500 w-1/4 text-start">${expense.type}</p>
        <p class="font-medium w-1/4 text-end ${expense.type === "Expense" ? "text-red-500" : "text-green-500"}">${expense.type === "Expense" ? "-" : "+"} ${expense.amount}€</p>
    `;

    return expenseElement;
}
