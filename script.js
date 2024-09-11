const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');
const reset = document.getElementById('reset');

// Load the saved todos from localStorage when the page loads
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
if (savedTodos.length > 0) {
    savedTodos.forEach(todo => addTodoToDOM(todo));
}

// Event listener for submitting a new to-do
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoText = input.value.trim();

    if (todoText.length > 1) {
        const todoEl = document.createElement('li');
        todoEl.innerText = todoText;

        // Mark to-do as complete on click
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            saveTodos(); // Save list when a to-do is completed
        });

        // Delete to-do on double-click
        todoEl.addEventListener('dblclick', () => {
            e.preventDefault();
            todoEl.remove();
            saveTodos(); // Save list when a to-do is deleted
        });

        // Append the new to-do to the list
        todos.appendChild(todoEl);

        input.value = ""; // Clear the input field
        saveTodos(); // Save list when a new to-do is added
    } else {
        alert('Please enter a to-do');
    }
});

// Function to save the current list to localStorage
function saveTodos() {
    const todosList = [];
    document.querySelectorAll('#todos li').forEach(todoEl => {
        todosList.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todosList));
}

// Event listener for the reset button to delete all to-dos
reset.addEventListener('click', () => {
    todos.innerHTML = ''; // Clear the list from the DOM
    localStorage.removeItem('todos'); // Clear from localStorage
});

// Function to add a to-do to the DOM
function addTodoToDOM(todo) {
    const todoEl = document.createElement('li');
    todoEl.innerText = todo.text;

    if (todo.completed) {
        todoEl.classList.add('completed');
    }

    // Mark to-do as complete on click
    todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed');
        saveTodos(); // Save list when a to-do is completed
    });

    // Delete to-do on double-click
    todoEl.addEventListener('dblclick', () => {
        todoEl.remove();
        saveTodos(); // Save list when a to-do is deleted
    });

    todos.appendChild(todoEl);
}
