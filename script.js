const formEl = document.getElementById("form");
const todoInputEl = document.getElementById("todoInput");
const todoListContainer = document.querySelector(".todo_list");

// function ユーザーがtodoタスクを追加
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

// function ユーザーがタスクを消去
function itemToDelete(item) {
    if (item.classList.contains("fa-trash") || item.id === "trash") {
        const todoLiEl = item.closest("li");
        todoLiEl.classList.remove("bounceIn");
        todoLiEl.classList.add("bounceOut");
        // liタグ消去
        setTimeout(() => {
            todoLiEl.remove();
        }, 1000);
        // local storageから消去
        deleteDataFromLocalStorage(item)
    }
}

// function ユーザーがタスクを編集
function itemToEdit(item) {
    if (item.classList.contains("fa-edit") || item.id === "edit") {
        const todoLiEl = item.closest("li");
        todoInputEl.value = todoLiEl.textContent.trim();
        todoLiEl.remove();
        editItemFromLocalStorage(item);
    }
}

// function local storageにタスクを保存
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

// function local storageからタスクを取得
function displayDataFromLocalStorage () {
    const todoArr = JSON.parse(localStorage.getItem("todos"));
    for (const todo of todoArr) {
        displayTodoDOM(todo)      
    }
}

// function local storageからタスクを消去
function deleteDataFromLocalStorage(item) {
    const todoArr = JSON.parse(localStorage.getItem("todos"));
    const todoLiEl = item.closest("li");

    // 残りのtodoタスクを取得
    const todoItemLeft = todoArr.filter(todo => todoLiEl.textContent.trim() !== todo);
    // 残りのtodoタスクをJSONで追加
    localStorage.setItem("todos", JSON.stringify(todoItemLeft));
}

// function local storageからタスクを編集
function editItemFromLocalStorage(item) {
    deleteDataFromLocalStorage(item);
}

// event　ーーーーーーーーーーーーーーーーーーー

// local storageのDOMツリーの構築が完了した時に発火
document.addEventListener("DOMContentLoaded", displayDataFromLocalStorage);

// ユーザーが各ボタンをclickした時
todoListContainer.addEventListener("click", (e) => {
    itemToDelete(e.target);
    itemToEdit(e.target);
});

// ユーザーがタスクを追加した時
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTodo = todoInputEl.value;
    if (!inputTodo) {
        alert("タスクを記入して下さい")
    } else {
        displayTodoDOM(inputTodo);
        storeToLocalStorage(inputTodo);
    }
    // 入力したタスクをreset
    formEl.reset();
});