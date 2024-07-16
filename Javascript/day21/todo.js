const inputEle = document.querySelector("input");
const formElement = document.querySelector("#formTodo");
const todoContainer = document.querySelector(".todo-container");
const todoListContainer = document.querySelector("#todo-list");
const btnClearContainer = document.querySelector(".btn-clear-container");

const clearAllBtn = document.querySelector(".btn-clear");
const completeAllBtn = document.querySelector(".btn-completeAll");

const completeCheckedBtn = document.querySelector(".btn-completeAny");
const deleteCheckedBtn = document.querySelector(".btn-deleteAny");

// const checkboxBtn = document.querySelector(".btn-checkBox");

function addTodo(todoText) {
  const todoItem = document.createElement("div");
  const itemValue = document.createElement("div");
  todoItem.classList.add("todo-item");
  itemValue.classList.add("item");
  itemValue.textContent = todoText;
  todoItem.appendChild(itemValue);
  addRemoveButton(todoItem);
  addCompleteButton(todoItem);
  addCheckBox(todoItem);
  todoContainer.appendChild(todoItem);

  // Lưu danh sách todos vào localStorage
  saveTodosToLocalStorage();
}

// function updateClearButtonVisibility() {
//   const todoItems = document.querySelectorAll(".todo-item");
//   const clearBtn = document.querySelector(".btn-container");
//   if (todoItems.length > 0) {
//     clearBtn.style.display = "block";
//     console.log(1223);
//   } else {
//     clearBtn.style.display = "none";
//     console.log(123);
//   }
// }

function addCompleteButton(element) {
  const completeBtn = document.createElement("span");
  completeBtn.textContent = "check_small";
  completeBtn.classList.add("complete", "material-symbols-outlined");
  element.appendChild(completeBtn);
}

function addRemoveButton(element) {
  const removeBtn = document.createElement("span");
  removeBtn.textContent = "remove";
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
  // Lấy danh sách các mục công việc từ DOM và lưu vào localStorage
  const todos = [];
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    const todoText = item.querySelector(".item").textContent;
    todos.push(todoText);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todoText) => {
      addTodo(todoText);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTodosFromLocalStorage();
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault(); // no load page when submit

  if (!inputEle.value) {
    // no add null value
    return;
  }

  // debugger;
  addTodo(inputEle.value);

  formElement.reset(); // reset form then submit
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
    default:
      break;
  }
  // if (
  //   e.target.tagName === "BUTTON" &&
  //   e.target.classList.contains("remove")
  // ) {
  //   e.target.parentElement.remove();
  // } else if (
  //   e.target.tagName === "BUTTON" &&
  //   e.target.classList.contains("complete")
  // ) {
  //   e.target.parentElement.classList.toggle("complete");
  // }
});

todoListContainer.addEventListener("mouseover", () => {
  btnClearContainer.style.visibility = "visible";
});

todoListContainer.addEventListener("mouseout", () => {
  btnClearContainer.style.visibility = "hidden";
});

clearAllBtn.addEventListener("click", () => {
  todoContainer.innerHTML = "";
  saveTodosToLocalStorage();
});

completeAllBtn.addEventListener("click", () => {
  let todoItems = document.querySelectorAll(".todo-item");
  // for (let i = 0; i < todoItems.length; i++) {
  //   todoItems[i].classList.toggle("completed");
  // }
  todoItems.forEach((item) => {
    if (!item.classList.contains("completed")) {
      item.classList.toggle("completed");
    }
  });
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
  checkBoxItems.forEach((checkbox) => {
    checkbox.parentElement.classList.add("completed");
  });
  saveTodosToLocalStorage();
});

// checkboxBtn.addEventListener("click", () => {
//   // let todoItems = document.querySelectorAll(".todo-item");
//   let checkBox = document.querySelectorAll(".input-checkbox");
//   // todoItems.forEach((item) => {
//   // console.log(checkBox);
//   checkBox.forEach((a) => {
//     // if(a) {
//     //   a.style.visibility = "hidden" ? "visible" : "hidden";
//     // } else {
//     //   a.style.visibility = "hidden"
//     // }
//     if (a.style.visibility != "hidden") {
//       a.style.visibility = 'visible'
//       console.log('hidden')
//       return;
//     }
//     if (a.style.visibility = "hidden") {
//       a.style.visibility = 'visible'
//       console.log('visible')
//       return;
//     }
//   })
//   // });
//   });
