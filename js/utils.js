const filterByDate = {
    all: "all",
    today: "today",
    yesterday: "yesterday",
    last7Days: "last7Days"
}


const filterByCategory = {
    all: "all",
    income: "income",
    expenses: "expenses",
}

const filterByType = {
    all: "all",
    groceries: "groceries",
    utilities: "utilities",
    entertainment: "entertainment",
}

function filterDataByDate(data, filterByDate){
    return data.filter(item => {
        const itemDate = new Date(item.date);
        const today = new Date();
        
        switch (filterByDate) {
            case "today":
                return itemDate.toDateString() === today.toDateString();
            case "yesterday":
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                return itemDate.toDateString() === yesterday.toDateString();
            case "last7Days":
                const last7Days = new Date();
                last7Days.setDate(today.getDate() - 7);
                return itemDate >= last7Days && itemDate <= today;
            case "all":
            default:
                return true; 
        }
    });
}

function filterDataByCategory(data, filterByCategory){
    return filterByCategory === "all" ? data : data.filter(item => item.category === filterByCategory);
}


function filterDataByType(data, filterByType){
    return filterByType === "all" ? data : data.filter(item => item.type === filterByType);
}

export {filterByDate, filterByCategory, filterByType, filterDataByDate, filterDataByCategory, filterDataByType};

