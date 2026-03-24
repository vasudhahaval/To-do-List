let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    let li = document.createElement("li");
    li.classList.add("priority-" + task.priority);

    li.innerHTML = `
      <div class="task-top">
        <div class="task-left">
          <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? "checked" : ""}>
          <span class="${task.completed ? 'completed' : ''}">
            ${task.text}
          </span>
        </div>

        <div>
          <button class="edit-btn" onclick="editTask(${index})">✏</button>
          <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
        </div>
      </div>

      <div class="small-text">
        📅 ${task.date || "No date"} ⏰ ${task.time || ""}
      </div>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  let text = document.getElementById("taskInput").value;
  let date = document.getElementById("dateInput").value;
  let time = document.getElementById("timeInput").value;
  let priority = document.getElementById("priorityInput").value;

  if (text === "") {
    alert("Enter task!");
    return;
  }

  tasks.push({ text, date, time, priority, completed: false });
  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("timeInput").value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function setFilter(type) {
  filter = type;
  renderTasks();
}

renderTasks();