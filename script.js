const formEl = document.getElementById("form");
const todoInputEl = document.getElementById("todoInput");
const todoListContainer = document.querySelector(".todo_list");

// function ユーザーがtodoを追加した時
function displayTodoDOM(todo) {
    const liEl = document.createElement("li");
    liEl.classList.add("bounceIn");
    liEl.innerHTML = `
    <span class="text">${todo}</span>
    <div class="options">
        <span id="check"><i class="fa fa-check"></i></span>
        <span id="edit"><i class="fa fa-edit"></i></span>
        <span id="trash"><i class="fa fa-trash"></i></span>
    </div>
    `;
    todoListContainer.appendChild(liEl);
}

// function local storage
function storeToLocalStorage(todo) {
    let todoArr;
    if(localStorage.getItem("todos") === null){
        todoArr = [];
    } else {
        todoArr = JSON.parse(localStorage.getItem("todos"));
    }
    todoArr.push(todo);
    localStorage.setItem("todos", JSON.stringify(todoArr));
}

function displayDataFromLocalStorage () {
    const todoArr = JSON.parse(localStorage.getItem("todos"));
    for (const todo of todoArr) {
        displayTodoDOM(todo)      
    }
}

// event

// local storageのDOMツリーの構築が完了した時に発火
document.addEventListener("DOMContentLoaded", displayDataFromLocalStorage);




formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTodo = todoInputEl.value;
    if (!inputTodo) {
        alert("タスクを記入して下さい")
    } else {
        displayTodoDOM(inputTodo);
        storeToLocalStorage(inputTodo);
    }
});