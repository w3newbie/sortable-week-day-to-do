//Selectors
const todoInputWeek = document.querySelector(".todo-input-week");
const todoButtonWeek = document.querySelector(".todo-button-week");
const todoListWeek = document.querySelector(".todo-list-week");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodosWeek);
todoButtonWeek.addEventListener("click", addTodoWeek);
todoListWeek.addEventListener("click", deleteCheckWeek);

//Functions
function addTodoWeek(eventWeek) {
   //Prevent form from submitting
   eventWeek.preventDefault();
   //Todo div
   const todoDivWeek = document.createElement("div");
   todoDivWeek.classList.add("todo-week");
   //Create li
   const newTodoWeek = document.createElement("div");
   newTodoWeek.innerText = todoInputWeek.value;
   newTodoWeek.classList.add("todo-item-week");
   todoDivWeek.appendChild(newTodoWeek);
   //ADD TODO TO LOCALSTORAGE
   savelocalTodos(todoInputWeek.value);

   //Trash button
   const trashButtonWeek = document.createElement("button");
   trashButtonWeek.innerHTML = '<i class="fas fa-trash"></i>';
   trashButtonWeek.classList.add("trash-btn-week");
   todoDivWeek.appendChild(trashButtonWeek);
   //Append to list
   todoListWeek.appendChild(todoDivWeek);
   //Clear todo Input value
   todoInputWeek.value = "";
}
function deleteCheckWeek(eWeek) {
   const item = eWeek.target;
   //Delete todo
   if (item.classList[0] === "trash-btn-week") {
      const todoWeek = item.parentElement;
      //Animation
      todoWeek.classList.add("fall");
      removeLocalTodosWeek(todoWeek); //ADDED WITH LOCALSTORAGE
      todoWeek.addEventListener("transitionend", function () {
         todoWeek.remove();
      });
   }
}

function savelocalTodosWeek(todoWeek) {
   //Check - Do I have stuff stored already?
   let todosWeek;
   if (localStorage.getItem('todos-week') === null) {
      todosWeek = [];
   } else {
      todosWeek = JSON.parse(localStorage.getItem('todos-week'));
   }

   todosWeek.push(todoWeek);
   localStorage.setItem('todos-week', JSON.stringify(todosWeek));
}

function getTodosWeek() {
   //Check - Do I have stuff stored already?
   let todosWeek;
   if (localStorage.getItem('todos-week') === null) {
      todosWeek = [];
   } else {
      todosWeek = JSON.parse(localStorage.getItem('todos-week'));
   }
   todosWeek.forEach(function (todoWeek) {
      //Todo div
      const todoDivWeek = document.createElement("div");
      todoDivWeek.classList.add("todo-week");
      //Create li
      const newTodoWeek = document.createElement("div");
      newTodoWeek.innerText = todoWeek; //changed from above paste
      newTodoWeek.classList.add("todo-item-week");
      todoDivWeek.appendChild(newTodoWeek);
      //Trash button
      const trashButtonWeek = document.createElement("button");
      trashButtonWeek.innerHTML = '<i class="fas fa-trash"></i>';
      trashButtonWeek.classList.add("trash-btn-week");
      todoDivWeek.appendChild(trashButtonWeek);
      //Append to list
      todoListWeek.appendChild(todoDivWeek);
   })
}

function removeLocalTodosWeek(todoWeek) {
   //Check - Do I have stuff stored already?
   let todosWeek;
   if (localStorage.getItem('todos-week') === null) {
      todosWeek = [];
   } else {
      todosWeek = JSON.parse(localStorage.getItem('todos-week'));
   }
   const todoIndexWeek = todoWeek.children[0].innerText;
   todosWeek.splice(todosWeek.indexOf(todoIndexWeek), 1);
   localStorage.setItem("todos-week", JSON.stringify(todosWeek));
}

