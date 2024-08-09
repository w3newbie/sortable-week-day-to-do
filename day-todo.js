//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions
function addTodo(event) {
   //Prevent form from submitting
   event.preventDefault();
   //Todo div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
   //Create li
   const newTodo = document.createElement("div");
   newTodo.innerText = todoInput.value;
   newTodo.classList.add("todo-item");
   todoDiv.appendChild(newTodo);
   //ADD TODO TO LOCALSTORAGE
   savelocalTodos(todoInput.value);

   //Trash button
   const trashButton = document.createElement("button");
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);
   //Append to list
   todoList.appendChild(todoDiv);
   //Clear todo Input value
   todoInput.value = "";
}
function deleteCheck(e) {
   const item = e.target;
   //Delete todo
   if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      //Animation
      todo.classList.add("fall");
      removeLocalTodos(todo); //ADDED WITH LOCALSTORAGE
      todo.addEventListener("transitionend", function () {
         todo.remove();
      });
   }
}

function savelocalTodos(todo) {
   //Check - Do I have stuff stored already?
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }

   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
   //Check - Do I have stuff stored already?
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach(function (todo) {
      //Todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create li
      const newTodo = document.createElement("div");
      newTodo.innerText = todo; //changed from above paste
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //Trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //Append to list
      todoList.appendChild(todoDiv);
   })
}

function removeLocalTodos(todo) {
   //Check - Do I have stuff stored already?
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}

