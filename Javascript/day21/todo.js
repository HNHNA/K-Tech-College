const formElement = document.querySelector("#formTodo");
const inputEle = document.querySelector("input");

const todoContainer = document.querySelector(".todo-container");
const todoListContainer = document.querySelector("#todo-list");
const btnContainer = document.querySelector(".btn-container");

const clearAllBtn = document.querySelector(".btn-clear");
const completeAllBtn = document.querySelector(".btn-completeAll");

const completeCheckedBtn = document.querySelector(".btn-completeChecked");
const deleteCheckedBtn = document.querySelector(".btn-deleteChecked");

function addTodo(todoText, isCompleted = false) {
  const todoItem = document.createElement("div");
  const itemValue = document.createElement("div");
  todoItem.classList = "todo-item";
  if (isCompleted) {
    todoItem.classList.add("completed");
  }
  itemValue.classList.add("item");
  itemValue.textContent = todoText;
  todoItem.appendChild(itemValue);
  addRemoveButton(todoItem);
  addCompleteButton(todoItem);
  addEditButton(todoItem);
  addCheckBox(todoItem);
  todoContainer.appendChild(todoItem);

  // Lưu danh sách todos vào localStorage
  saveTodosToLocalStorage();
}

function addCompleteButton(element) {
  const completeBtn = document.createElement("span");
  completeBtn.textContent = "check_small";
  completeBtn.classList.add("complete", "material-symbols-outlined");
  element.appendChild(completeBtn);
}

function addEditButton(element) {
  const editBtn = document.createElement("span");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit", "material-symbols-outlined");
  element.appendChild(editBtn);
}

function addRemoveButton(element) {
  const removeBtn = document.createElement("span");
  removeBtn.textContent = "close";
  removeBtn.classList.add("delete", "material-symbols-outlined");
  element.appendChild(removeBtn);
}

function addCheckBox(element) {
  let checkBoxBtns = document.createElement("input");
  checkBoxBtns.type = "checkbox";
  checkBoxBtns.classList.add("input-checkbox");
  element.appendChild(checkBoxBtns);
}

function saveTodosToLocalStorage() {
  // Save todo-item to LocalStorage
  const todos = Array.from(document.querySelectorAll(".todo-item")).map(
    (item) => ({
      text: item.querySelector(".item").textContent,
      completed: item.classList.contains("completed"),
    })
  );
  localStorage.setItem("todos", JSON.stringify(todos));
  // todoItems.forEach((item) => {
  //   let todoText = item.querySelector(".item").textContent;
  //   let isCompleted = item.classList.contains("completed");
  //   todos.push({
  //     text: todoText,
  //     completed: isCompleted
  //   });
  // });
  // // console.log(todos)
  // localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    addTodo(todo.text, todo.completed);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTodosFromLocalStorage();
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault(); // no load page when submit

  if (!inputEle.value) {
    // no add null value
    alert("No Value")
    return;
  }

  // debugger;
  addTodo(inputEle.value);

  formElement.reset(); // reset form then submit
  saveTodosToLocalStorage();
});

todoContainer.addEventListener("click", (e) => {
  switch (true) {
    case e.target.classList.contains("delete"):
      e.target.parentElement.remove();
      saveTodosToLocalStorage();
      break;
    case e.target.classList.contains("complete"):
      e.target.parentElement.classList.toggle("completed");
      saveTodosToLocalStorage();
      break;
    case e.target.classList.contains("edit"):
      const itemValue = e.target.parentElement.querySelector(".item");
      itemValue.setAttribute("contenteditable", "true");
      itemValue.focus();

      const saveAndBlur = () => {
        itemValue.removeAttribute("contenteditable");
        saveTodosToLocalStorage();
      };
      // Save when blur
      itemValue.addEventListener("blur", saveAndBlur);
      // Save when press Enter
      itemValue.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          itemValue.blur();
        }
      });
      break;
    default:
      break;
  }
});

todoListContainer.addEventListener("mouseover", () => {
  btnContainer.style.visibility = "visible";
});

todoListContainer.addEventListener("mouseout", () => {
  btnContainer.style.visibility = "hidden";
});

clearAllBtn.addEventListener("click", () => {
  todoContainer.innerHTML = "";
  saveTodosToLocalStorage();
});

completeAllBtn.addEventListener("click", () => {
  let todoItems = document.querySelectorAll(".todo-item");
  const allCompleted = Array.from(todoItems).every(item => item.classList.contains("completed"));
  todoItems.forEach((item) => {
    if (allCompleted) {
      item.classList.remove("completed");
    } else {
      item.classList.add("completed");
    }
  })
  saveTodosToLocalStorage();
});

deleteCheckedBtn.addEventListener("click", () => {
  let checkBoxItems = document.querySelectorAll(".input-checkbox:checked");
  checkBoxItems.forEach((checkbox) => {
    checkbox.parentElement.remove();
  });
  saveTodosToLocalStorage();
});

completeCheckedBtn.addEventListener("click", () => {
  let checkBoxItems = document.querySelectorAll(".input-checkbox:checked");
  const allcheckBoxItems = Array.from(checkBoxItems).every(item => item.parentElement.classList.contains("completed"));
  checkBoxItems.forEach((checkbox) => {
    if (allcheckBoxItems) {
      checkbox.parentElement.classList.remove("completed");
    } else {
      checkbox.parentElement.classList.add("completed");
    }
  });
  saveTodosToLocalStorage();
});
