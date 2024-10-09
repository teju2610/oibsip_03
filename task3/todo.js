function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}
function addTask() {
    const titleInput = document.getElementById('task-title');
    const descInput = document.getElementById('task-desc');
    const taskTitle = titleInput.value.trim();
    const taskDesc = descInput.value.trim();

    if (taskTitle === '' || taskDesc === '') {
        alert('Please fill out both fields.');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${taskTitle}</td>
        <td>${taskDesc}</td>
        <td>${getCurrentDateTime()}</td>
        <td><button class="complete-btn" onclick="completeTask(this)">Complete</button></td>
        <td><button class="delete-btn" onclick="deleteTask(this)">X</button></td>
    `;

    document.getElementById('pending-task-list').appendChild(newRow);
    titleInput.value = '';
    descInput.value = '';
}
function completeTask(button) {
    const row = button.parentElement.parentElement;
    const taskTitle = row.children[0].textContent;
    const taskDesc = row.children[1].textContent;

    const completedRow = document.createElement('tr');
    completedRow.innerHTML = `
        <td>${taskTitle}</td>
        <td>${taskDesc}</td>
        <td>${getCurrentDateTime()}</td>
        <td><button class="delete-btn" onclick="deleteTask(this)">X</button></td>
    `;

    document.getElementById('completed-task-list').appendChild(completedRow);
    row.remove();
}
function deleteTask(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
function saveTasks() {
    const pendingTasks = [];
    const completedTasks = [];

    document.querySelectorAll('#pending-task-list tr').forEach(row => {
        const taskTitle = row.children[0].textContent;
        const taskDesc = row.children[1].textContent;
        const dateAdded = row.children[2].textContent;
        pendingTasks.push({ title: taskTitle, desc: taskDesc, dateAdded: dateAdded });
    });

    document.querySelectorAll('#completed-task-list tr').forEach(row => {
        const taskTitle = row.children[0].textContent;
        const taskDesc = row.children[1].textContent;
        const dateCompleted = row.children[2].textContent;
        completedTasks.push({ title: taskTitle, desc: taskDesc, dateCompleted: dateCompleted });
    });

    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

    alert('Tasks saved successfully!');
}
window.onload = function() {
    loadTasks();
};

function loadTasks() {
    const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    pendingTasks.forEach(task => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${task.title}</td>
            <td>${task.desc}</td>
            <td>${task.dateAdded}</td>
            <td><button class="complete-btn" onclick="completeTask(this)">Complete</button></td>
            <td><button class="delete-btn" onclick="deleteTask(this)">X</button></td>
        `;
        document.getElementById('pending-task-list').appendChild(newRow);
    });

    completedTasks.forEach(task => {
        const completedRow = document.createElement('tr');
        completedRow.innerHTML = `
            <td>${task.title}</td>
            <td>${task.desc}</td>
            <td>${task.dateCompleted}</td>
            <td><button class="delete-btn" onclick="deleteTask(this)">X</button></td>
        `;
        document.getElementById('completed-task-list').appendChild(completedRow);
    });
}
