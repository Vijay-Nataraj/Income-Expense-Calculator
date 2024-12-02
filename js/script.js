const addEntryButton = document.getElementById("addEntry");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const entryList = document.getElementById("entryList");
const totalIncomeDisplay = document.getElementById("totalIncome");
const totalExpensesDisplay = document.getElementById("totalExpenses");
const netBalanceDisplay = document.getElementById("netBalance");
const resetFieldsButton = document.getElementById("resetFields");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

const renderEntries = () => {
  entryList.innerHTML = "";
  let totalIncome = 0;
  let totalExpenses = 0;

  const filterValue = document.querySelector(
    'input[name="filter"]:checked'
  ).value;
  const filteredEntries = entries.filter(
    (entry) => filterValue === "all" || entry.type === filterValue
  );

  filteredEntries.forEach((entry, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";
    entryDiv.innerHTML = `
            <span>${entry.description} - ${entry.amount} (${entry.type})</span>
            <div>
                <button class="edit-btn" onclick="editEntry(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            </div>
        `;
    entryList.appendChild(entryDiv);

    if (entry.type === "income") {
      totalIncome += entry.amount;
    } else if (entry.type === "expense") {
      totalExpenses += entry.amount;
    }
  });

  totalIncomeDisplay.textContent = totalIncome.toFixed(2);
  totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
  netBalanceDisplay.textContent = (totalIncome - totalExpenses).toFixed(2);
};

const addEntry = () => {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description && !isNaN(amount)) {
    entries.push({ description, amount, type });
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
    resetFields();
  } else {
    alert("Please enter valid description and amount.");
  }
};

const editEntry = (index) => {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeInput.value = entry.type;

  deleteEntry(index);
};

const deleteEntry = (index) => {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
};

const resetFields = () => {
  descriptionInput.value = "";
  amountInput.value = "";
  typeInput.value = "income";
};

addEntryButton.addEventListener("click", addEntry);
resetFieldsButton.addEventListener("click", resetFields);
document.querySelectorAll('input[name="filter"]').forEach((radio) => {
  radio.addEventListener("change", renderEntries);
});

renderEntries();
