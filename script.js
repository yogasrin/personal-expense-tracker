const form = document.getElementById("expenseForm");
const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    document.getElementById("income").textContent = `₹${totalIncome}`;
    document.getElementById("expense").textContent = `₹${totalExpense}`;
    document.getElementById("balance").textContent =
        `₹${totalIncome - totalExpense}`;
}

function displayTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
    <td>${transaction.type}</td>
    <td>₹${transaction.amount}</td>
    <td>${transaction.category}</td>
    <td>${transaction.date}</td>
    <td>${transaction.description}</td>
    <td>
        <button onclick="editTransaction(${transactions.indexOf(transaction)})">
            Edit
        </button>

        <button onclick="deleteTransaction(${transactions.indexOf(transaction)})">
            Delete
        </button>
    </td>
`;

        transactionList.appendChild(row);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const transaction = {
        type: document.getElementById("type").value,
        amount: Number(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    form.reset();

    displayTransactions();
    updateSummary();
});

displayTransactions();
updateSummary();
function deleteTransaction(index) {
    transactions.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateSummary();
}
function editTransaction(index) {
    const transaction = transactions[index];

    document.getElementById("type").value = transaction.type;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("category").value = transaction.category;
    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value = transaction.description;

    transactions.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateSummary();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}