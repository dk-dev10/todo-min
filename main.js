let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addTodo = document.querySelector('.addTodo');
const addTodoInput = document.querySelector('input');
const addTodoButton = document.querySelector('button');

const tasksProgress = document.querySelector('.tasks__progress');
const tasksSuccess = document.querySelector('.tasks__success');

function setLS(data) {
  localStorage.setItem('tasks', JSON.stringify(data))
}
function newTodo(val) {
  const todo = {
    title: val,
    id: Date.now(),
    done: false,
  }
  tasks.push(todo);
  setLS(tasks);
  template(tasksProgress, todo)
  render()
}

function render() {
  const progress = tasks.filter((todo) => !todo.done);
  const success = tasks.filter((todo) => todo.done);

  if (!!progress.length) {
    tasksProgress.innerHTML = ''
    progress.forEach(todo => template(tasksProgress, todo));
  } else {
    tasksProgress.innerHTML = '<span>Пусто</span>';
  }

  if (!!success.length) {
    tasksSuccess.innerHTML = ''
    success.forEach(todo => template(tasksSuccess, todo));
  } else {
    tasksSuccess.innerHTML = '<span>Пусто</span>';
  }

}

function template(where, todo) {
  where.innerHTML += `
    <div class="task" data-id='${todo.id}' >
      <label for="${todo.id}">
        <input 
          type="checkbox" 
          name="${todo.title}" 
          id="${todo.id}" 
          checked="${todo.done}" 
        >
      </label>
      <p>${todo.title}</p>
      <button>&times;</button>
    </div>
  `;
};

function changeTodo(id) {
  tasks = tasks.map((todo) => todo.id === +id ? { ...todo, done: !todo.done } : todo);
  setLS(tasks)
  render();
}

function removeTodo(id) {
  tasks = tasks.filter((todo) => todo.id !== +id);
  setLS(tasks)
  render();
}

let value;
addTodoInput.addEventListener('input', (e) => value = e.target.value);
addTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!!value) {
    newTodo(value);
    addTodoInput.value = value = '';

  }
});
render();

const tasksProgressTodo = document.querySelector('.tasks');

tasksProgressTodo.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LABEL') {
    changeTodo(e.target.getAttribute('for'));
  }
})

tasksProgressTodo.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    removeTodo(e.target.parentNode.getAttribute('data-id'));
  }
})


tasksProgress.addEventListener('click', (e) => {
  tasksSuccess.className = 'tasks__success close';
  tasksProgress.className = 'tasks__progress open';
})

tasksSuccess.addEventListener('click', (e) => {
  tasksProgress.className = 'tasks__progress close ';
  tasksSuccess.className = 'tasks__success open ';
})

