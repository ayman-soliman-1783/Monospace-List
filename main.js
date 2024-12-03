const addTaskBtn = document.querySelector("form button");
const taskInput = document.querySelector("form input");
let tasksComponentsList = document.querySelector("ul");

// retrieve tasks from localStroage
window.onload = () => {
    renderTasks();
}
let taskArray = JSON.parse(window.localStorage.getItem("tasks")) || [];

// add task to localStroage as an object
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let taskContent = taskInput.value.trim();
  if (taskContent === "") {
    alert("Task cannot be empty");
    taskInput.value = "";
    return;
  }

  let taskObject = {
    id: Date.now(),
    title: taskContent
  };

  taskArray.push(taskObject);
  updateLocalStorage(taskArray);
  renderTasks();
  taskInput.value = "";
});
// clear tasksComponentsList
// render tasksComponentsList by retrieving tasks from localStroage
function renderTasks() {
  tasksComponentsList.innerHTML = "";
  let tasksToRender = JSON.parse(localStorage.getItem("tasks"));
  tasksToRender.forEach((taskToRender) => {
    let task = document.createElement("li");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = taskToRender.id;
    task.innerHTML = `<span>${taskToRender.title}</span>`;
    task.appendChild(deleteBtn);

    // when rendering tasksComponentsList, add event listener to each task delete button
    deleteBtn.addEventListener("click", (e) => {
      // deletes task object from taskArray
      deleteTask(e.target.id);
      // update localStroage by resending taskArray
      updateLocalStorage(taskArray);
      renderTasks();
    });

    tasksComponentsList.appendChild(task);
  });
}

function deleteTask(taskId) {
  taskArray = taskArray.filter((task) => task.id != taskId);
}

function updateLocalStorage(taskArray) {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}