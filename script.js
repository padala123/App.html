document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        timestamp: new Date().toLocaleString()
    };

    saveTask(task);
    taskInput.value = "";
    loadTasks();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.text} (Added: ${task.timestamp})`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        if (task.completed) {
            const undoButton = document.createElement('button');
            undoButton.textContent = "Undo";
            undoButton.onclick = () => toggleTaskCompletion(index);
            listItem.appendChild(undoButton);
            completedTasksList.appendChild(listItem);
        } else {
            const completeButton = document.createElement('button');
            completeButton.textContent = "Complete";
            completeButton.onclick = () => toggleTaskCompletion(index);
            listItem.appendChild(completeButton);
            pendingTasksList.appendChild(listItem);
        }
    });
}

function toggleTaskCompletion(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        tasks[index].timestamp = new Date().toLocaleString();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}
