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

const motivationalQuotes = [
  `Believe you can and you're halfway there.
  Tin tưởng em có thể làm được và như vậy em đã thành công một nửa.`,
  `The only way to do great work is to love what you do.
  Cách duy nhất để làm tốt công việc chính là  hãy yêu quý công việc mình đang làm.`,
  `Your time is limited, don't waste it living someone else's life.
  Thời gian của em là hữu hạn, đừng sống cuộc đời người khác.`,
  `Success is not final, failure is not fatal: It is the courage to continue that counts.
  Thành công không phải là tận cùng, thất bại không phải là tận thế: Quan trọng là dũng khí để tiến lên.`,
  `The future belongs to those who believe in the beauty of their dreams.
  Tương lai thuộc về những người nhìn thấy vẻ đẹp trong ước mơ của họ.`,
  `Your life does not get better by chance, it gets better by change.
  Cuộc sống của em không tốt đẹp lên nhờ cơ hội, nó sẽ tốt đẹp hơn nhờ thay đổi.`,
  `The only person you are destined to become is the person you decide to be.
  Con người mà em sẽ trở thành, chính là con người mà em muốn trở thành.`,
  `Don't watch the clock; do what it does. Keep going.
  Đừng nhìn theo đồng hồ, hãy làm theo đồng hồ. Tiến về phía trước`,
  `Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.
  Hãy luôn tin vào bản thân và những thứ mà em đang có. Hãy luôn nhớ rằng bên trong em sẽ có những thứ lớn lao hơn bất cứ trở ngại nào`,
  `Success is stumbling from failure to failure with no loss of enthusiasm.
  Thành công chính là vượt qua từ thất bại này đén thất bại khác nhưng vẫn không đánh mất sự nhiệt huyết`,
  `It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.
  Không quan trọng là em đánh mạnh ra sao. Quan trọng là em có thể chịu đựng những đòn mạnh và vẫn tiếp tục bước đi về phía trước`,
  `You are never too old to set another goal or to dream a new dream.
  Không bao giờ là quá già để đặt một mục tiêu mới hoặc mơ một giấc mơ mới`,
  `Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.
  Đừng để nỗi sợ thúc đẩy em lang thang, hãy để ước mơ dẫn đường em tiến tới`,
  `Success is not in what you have, but who you are.
  Thành công không phải là những thứ em đạt được mà chính là con người em sẽ trở thành`,
  `I find that the harder I work, the more luck I seem to have.
  Anh nhận ra bản thân anh càng cố gắng, thì anh càng gặp nhiều may mắn`,
  `You miss 100% of the shots you don't take.
  Em sẽ thất bại 100% với những việc em không làm`,
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

function updateMotivationalQuote(containerId) {
  const quoteElement = document.getElementById(containerId);
  if (quoteElement) {
    quoteElement.innerHTML = getRandomQuote().replace(/\n/g, '<br>');
  }
}

// Update the quote initially
updateMotivationalQuote('motivateQuote');

// Update the quote every 15 minutes (900,000 milliseconds)
setInterval(() => updateMotivationalQuote('motivateQuote'), 900000);