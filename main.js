let tasks = [
  {
    title: 'Купить',
    id: 12314,
    done: false,
  }, {
    title: 'Оплатить',
    id: 23455,
    done: false,
  }, {
    title: 'Получить',
    id: 76762,
    done: false,
  }, {
    title: 'Бежать',
    id: 76722,
    done: true,
  }
];

const addTodo = document.querySelector('.addTodo');
const addTodoInput = document.querySelector('input');
const addTodoButton = document.querySelector('button');

const tasksProgress = document.querySelector('.tasks__progress');
const tasksSuccess = document.querySelector('.tasks__success');

function newTodo(val) {
  const todo = {
    title: val,
    id: Date.now(),
    done: false,
  }
  tasks.push(todo);
  template(tasksProgress, todo)
}

function render() {
  const progress = tasks.filter((todo) => !todo.done);
  const success = tasks.filter((todo) => todo.done);

  tasksProgress.innerHTML = ''
  tasksSuccess.innerHTML = ''
  progress.forEach(todo => template(tasksProgress, todo));
  success.forEach(todo => template(tasksSuccess, todo));
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
  render();
}

function removeTodo(id) {
  tasks = tasks.filter((todo) => todo.id !== +id);
  render();
}

let value;
addTodoInput.addEventListener('input', (e) => value = e.target.value);
addTodoButton.addEventListener('click', () => {
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



