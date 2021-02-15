function addTask() {
    data.push({"name" : document.getElementById("taskName").value});
    document.getElementById("taskName").value = "";
    localStorage.setItem("tasks", JSON.stringify(data));
    loadTasks();
}
function loadTasks() {
    data = JSON.parse(localStorage.getItem("tasks"));
    let tasks = document.getElementById("tasks");
    tasks.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let task = document.createElement("div");
        task.classList.add("task")
        let taskName = document.createElement("a");
        taskName.innerHTML = element.name;
        taskName.onclick = function () {editTaskSetup(i)};
        let taskRemover = document.createElement("a");
        taskRemover.innerHTML = "Remove";
        taskRemover.onclick = function () {removeTask(i)};
        taskRemover.classList.add("removeTask")
        task.append(taskName, taskRemover);
        tasks.append(task);
    }
}
function removeTask(id) {
    data.splice(id);
    localStorage.setItem("tasks", JSON.stringify(data));
    loadTasks();
}
function editTaskSetup(id) {
    document.getElementById("addTask").innerHTML = "Edit Task";
    document.getElementById("taskName").placeholder = data[id].name;
    let cancel = document.createElement("button");
    cancel.onclick = function () {cancelEdit()};
    cancel.id = "cancel"
    cancel.innerHTML = "Cancel";
    document.getElementById("form").append(cancel);
    document.getElementById("addTask").onclick = function() {editTask(id)};
}
function cancelEdit() {
    document.getElementById("form").removeChild(document.getElementById("cancel"));
    document.getElementById("addTask").innerHTML = "Add Task";
    document.getElementById("taskName").placeholder = "Task";
    document.getElementById("taskName").value = "";
    document.getElementById("addTask").onclick = function() {addTask()};
}
function editTask(id) {
    data[id] = {"name" : document.getElementById("taskName").value};
    document.getElementById("form").removeChild(document.getElementById("cancel"));
    document.getElementById("taskName").value = "";
    document.getElementById("taskName").placeholder = "Task";
    localStorage.setItem("tasks", JSON.stringify(data));
    document.getElementById("addTask").innerHTML = "Add Task";
    document.getElementById("addTask").onclick = function() {addTask()};
    loadTasks();

}
let data = null;

window.onload = function () {
    if (localStorage.getItem("tasks") !== null) {
        loadTasks();
    } else {
        data = [];
        localStorage.setItem("tasks", JSON.stringify(data));
    }
    
}