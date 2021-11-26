const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos"
let toDos = [];
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    console.log(toDos);
    li.remove();
    toDos = toDos.filter(todo => {return todo.id !== parseInt(li.id)});
    
    saveToDos();
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value
    toDoInput.value = "";
    const newToDoObj = {
        text : newToDo,
        id : Date.now()
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
    
}

function paintToDo(newToDoObj) {
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    li.appendChild(span);
    const btn = document.createElement("button");
    btn.innerText = "✖";
    btn.addEventListener("click", deleteToDo)
    li.appendChild(btn);
    span.innerText = newToDoObj.text
    toDoList.appendChild(li)
}


toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY)
if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(item => {
        paintToDo(item)
    });
}