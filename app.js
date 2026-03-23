const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const summary = document.querySelector("#summary");

const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const removeButton = document.createElement("button");

    label.textContent = task;
    removeButton.textContent = "Delete";

    removeButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    item.appendChild(label);
    item.appendChild(removeButton);
    taskList.appendChild(item);
  });

  summary.textContent = `Total tasks: ${tasks.length}`;
}

addButton.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (!value) {
    alert("Please enter a task.");
    return;
  }

  tasks.push(value);
  taskInput.value = "";
  renderTasks();
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addButton.click();
  }
});

taskInput.focus();