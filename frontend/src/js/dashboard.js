const list = document.getElementById("expenseList");
const categoryList = document.getElementById("categoryList");
const totalSpentEl = document.getElementById("totalSpent");
const balanceEl = document.getElementById("balance");
const salaryEl = document.getElementById("salary");

let categoryChart;
let weeklyChart;

function loadDashboard() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const salary = Number(localStorage.getItem("salary")) || 0;

    salaryEl.innerText = format(salary);

    let total = 0;
    list.innerHTML = "";
    const categories = {};
    const weeks = [0, 0, 0, 0, 0];

    expenses.forEach(e => {
        total += e.value;

        const day = new Date(e.date).getDate();
        const week = Math.min(Math.floor((day - 1) / 7), 4);
        weeks[week] += e.value;

        categories[e.category] = (categories[e.category] || 0) + e.value;

        const li = document.createElement("li");
        li.innerHTML = `
      <strong>${e.description}</strong><br>
      ${e.category} • ${format(e.value)}
      <button class="delete" onclick="remove(${e.id})">Excluir</button>
    `;
        list.appendChild(li);
    });

    totalSpentEl.innerText = format(total);
    balanceEl.innerText = format(salary - total);

    renderCategory(categories);
    renderWeekly(weeks);
}

function remove(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadDashboard();
}

function renderCategory(data) {
    categoryList.innerHTML = "";

    Object.keys(data).forEach(c => {
        const li = document.createElement("li");
        li.className = "category-item";
        li.innerHTML = `<span>${c}</span><strong>${format(data[c])}</strong>`;
        categoryList.appendChild(li);
    });

    if (categoryChart) categoryChart.destroy();
    categoryChart = new Chart(document.getElementById("categoryChart"), {
        type: "pie",
        data: {
            labels: Object.keys(data),
            datasets: [{ data: Object.values(data) }]
        }
    });
}

function renderWeekly(data) {
    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(document.getElementById("weeklyChart"), {
        type: "bar",
        data: {
            labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
            datasets: [{ data }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

function format(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

loadDashboard();
