const form = document.getElementById("salaryForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const salary = Number(form[0].value);
  const extra = Number(form[1].value);

  localStorage.setItem("salary", salary + extra);
  location.href = "dashboard.html";
});
