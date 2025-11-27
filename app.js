// --- LOGIN ---
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user.trim() === "" || pass.trim() === "") {
        alert("Preencha usuário e senha");
        return;
    }

    // Salvando no navegador
    localStorage.setItem("loggedUser", user);

    loadTasks();
    showApp();
}

function logout() {
    localStorage.removeItem("loggedUser");
    hideApp();
}

// --- MOSTRAR / ESCONDER ---
function showApp() {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");
}

function hideApp() {
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
}

// --- TAREFAS ---
function addTask() {
    let text = document.getElementById("task-text").value;
    if (text.trim() === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task-text").value = "";
    loadTasks();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach((t, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${t} <button onclick="deleteTask(${i})">X</button>`;
        list.appendChild(li);
    });
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// --- AUTO LOGIN ---
window.onload = () => {
    if (localStorage.getItem("loggedUser")) {
        showApp();
        loadTasks();
    }
};
