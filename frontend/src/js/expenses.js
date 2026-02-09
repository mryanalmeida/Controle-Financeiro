const form = document.getElementById("expenseForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const expense = {
        id: Date.now(),
        date: form[0].value,
        category: form[1].value,
        description: form[2].value,
        value: Number(form[3].value),
        payment: form[4].value
    };

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    location.href = "dashboard.html";
});
