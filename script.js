const addBtn = document.querySelector(".add-btn");
const taskItemContainer = document.querySelector(".task-tracker-items");
const taskInput = document.querySelector(".task-input");
const newDate = document.querySelector(".date-section");

newDate.innerHTML = new Date().toLocaleDateString();

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTask = () => {
  taskItemContainer.innerHTML = "";

  tasks.forEach((text, index) => {
    const div = document.createElement("div");
    div.classList.add("task-item");
    div.innerHTML = `<div class="task-items">
              <div class="task-value">
                <textarea name="value" id="value">${text}</textarea>
              </div>
              <div class="icons">
                <div class="tick-icon">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div class="delete-icon">
                  <i class="fa-regular fa-trash-can"></i>
                </div>
              </div>
            </div>`;

    taskItemContainer.append(div);

    const tickIcon = div.querySelector(".tick-icon");
    const textAreaValue = div.querySelector("textarea");
    const deleteIcon = div.querySelector(".delete-icon");

    tickIcon.addEventListener("click", () => {
      textAreaValue.style.textDecoration = "line-through";
      div.style.opacity = "0.6";
    });

    deleteIcon.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      div.remove("");
      renderTask();
    });
  });
};

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    taskItemContainer.style.display = "none";
    return;
  } else {
    taskItemContainer.style.display = "block";
  }
  tasks.push(taskInput.value.trim());
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask();

  taskInput.value = "";
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (taskInput.value.trim() === "") {
      taskItemContainer.style.display = "none";
      return;
    } else {
      taskItemContainer.style.display = "block";
    }
    tasks.push(taskInput.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask();

    taskInput.value = "";
  }
});

renderTask();
