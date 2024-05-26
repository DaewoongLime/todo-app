document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);

        newTaskInput.value = '';
    }

    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(taskSpan, editButton));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function editTask(taskSpan, editButton) {
        const currentText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        taskSpan.replaceWith(input);
        editButton.textContent = 'Save';

        const saveTask = () => {
            const newText = input.value.trim();
            if (newText !== '') {
                taskSpan.textContent = newText;
                input.replaceWith(taskSpan);
                editButton.textContent = 'Edit';
                editButton.removeEventListener('click', saveTask);
                editButton.addEventListener('click', () => editTask(taskSpan, editButton));
            }
        };

        editButton.removeEventListener('click', () => editTask(taskSpan, editButton));
        editButton.addEventListener('click', saveTask);
    }
});