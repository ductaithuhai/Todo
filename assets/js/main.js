let listCounter = 2;

function createTodoContainer(listId, containerId) {
  const container = document.createElement('div');
  container.className = 'todo-container';
  container.id = containerId;

  const header = document.createElement('div');
  header.className = 'todo-header';

  const listNameSpan = document.createElement('span');
  listNameSpan.contentEditable = 'true';
  listNameSpan.textContent = 'Todo List ' + listId.split('-')[1];

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-list-button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteTodoList(containerId);
  });

  header.appendChild(listNameSpan);
  header.appendChild(deleteButton);

  const list = document.createElement('ul');
  list.className = 'todo-list';
  list.id = listId;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'todo-input';
  input.placeholder = 'Add a new task';

  const addButton = document.createElement('button');
  addButton.className = 'add-button';
  addButton.textContent = 'Add Task';
  addButton.addEventListener('click', function (event) {
    event.stopPropagation();
    addTask(listId, containerId);
  });

  container.appendChild(header);
  container.appendChild(list);
  container.appendChild(input);
  container.appendChild(addButton);

  return container;
}

let fullContent = document.getElementById('fullContent')
console.log(fullContent);
let firstChild = document.getElementById('todo-container1')
console.log(fullContent);
function moveUnfinishedTasks() {
  for (let i = 1; i < listCounter; i++) {
    const sourceListId = 'todo-list' + i;
    const destinationListId = 'todo-list' + (i + 1);

    const sourceList = document.getElementById(sourceListId);
    const destinationList = document.getElementById(destinationListId);

    // Check if both sourceList and destinationList exist
    if (sourceList && destinationList) {
      while (sourceList.firstChild) {
        const task = sourceList.firstChild;
        if (!task.classList.contains('completed')) {
          const clonedTask = task.cloneNode(true);
          destinationList.appendChild(clonedTask);
        }
        task.remove();
      }
    }
  }
}
function createNewTodoList() {
  // Find the highest existing list number
  let highestListNumber = 0;
  for (let i = 1; i <= listCounter; i++) {
    const listId = 'todo-list' + i;
    if (document.getElementById(listId)) {
      highestListNumber = i;
    }
  }
  console.log(highestListNumber);
  const containerId = 'todo-container' + (highestListNumber + 1);
  const listId = 'todo-list' + (highestListNumber + 1);

  const newTodoContainer = createTodoContainer(listId, containerId);

  fullContent.insertBefore(newTodoContainer, document.querySelector('.new-list-button'));
  listCounter++;
  moveUnfinishedTasks();
}


function addTask(listId, containerId) {
  const todoList = document.getElementById(listId);
  const todoInput = document.querySelector(`#${containerId} .todo-input`);

  const taskText = todoInput.value.trim();
  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const task = document.createElement('span');
    task.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', function () {
      listItem.remove();
    });

    checkbox.addEventListener('change', function () {
      listItem.classList.toggle('completed', checkbox.checked);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(task);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
    todoInput.value = '';
  }
}

// Event delegation for dynamically added tasks
document.addEventListener('change', function (event) {
  const target = event.target;
  if (target.type === 'checkbox' && target.closest('.todo-item')) {
    const listItem = target.closest('.todo-item');
    listItem.classList.toggle('completed', target.checked);
  }
});

document.addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('delete-button')) {
    const listItem = target.closest('.todo-item');
    listItem.remove();
  }
});

function deleteTodoList(containerId) {
  const container = document.getElementById(containerId);
  container.remove();
}