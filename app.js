const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const summary = document.querySelector("#summary");

const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.textContent = task;
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