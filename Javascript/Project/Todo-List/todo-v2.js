const API_URL = "https://66ac3e2af009b9d5c73169e8.mockapi.io/todolist/todo";

const formElement = document.querySelector("#formTodo");
const inputEle = document.querySelector("input");
const todoListContainer = document.querySelector("#todo-list");
const todoContainer = document.querySelector(".todo-container");
const btnContainer = document.querySelector(".btn-container");

const clearAllBtn = document.querySelector(".btn-clear");
const completeAllBtn = document.querySelector(".btn-completeAll");
const completeCheckedBtn = document.querySelector(".btn-completeChecked");
const deleteCheckedBtn = document.querySelector(".btn-deleteChecked");

// Add a new todo item
function addTodo(todoText, isCompleted = false, id = Date.now()) {
  const todoItem = document.createElement("div");
  const itemValue = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.dataset.id = id;

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
}

// Add a complete button
function addCompleteButton(element) {
  const completeBtn = document.createElement("span");
  completeBtn.textContent = "check_small";
  completeBtn.classList.add("complete", "material-symbols-outlined");
  element.appendChild(completeBtn);
}

// Add an edit button
function addEditButton(element) {
  const editBtn = document.createElement("span");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit", "material-symbols-outlined");
  element.appendChild(editBtn);
}

// Add a remove button
function addRemoveButton(element) {
  const removeBtn = document.createElement("span");
  removeBtn.textContent = "close";
  removeBtn.classList.add("delete", "material-symbols-outlined");
  element.appendChild(removeBtn);
}

// Add a checkbox 
function addCheckBox(element) {
  let checkBoxBtn = document.createElement("input");
  checkBoxBtn.type = "checkbox";
  checkBoxBtn.classList.add("input-checkbox");
  element.appendChild(checkBoxBtn);
}

// Load todos from API
// async function loadTodosFromAPI() {
//   try {
//     const response = await fetch(API_URL);
//     const todos = await response.json();
//     console.log(todos);
//     todos.forEach((todo) => addTodo(todo.text, todo.completed, todo.id));
//   } catch (error) {
//     console.error("Error loading todos:", error);
//   }
// }
// USE XMLHttpRequest() => GET
function loadTodosFromAPI(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      const todos = JSON.parse(xhr.responseText);
      console.log(todos);
      todos.forEach((todo) => addTodo(todo.text, todo.completed, todo.id));
      if (callback) callback(todos);
    } else {
      console.error("Error loading todos:", xhr.statusText);
    }
  };

  xhr.onerror = function() {
    console.error("Error loading todos:", xhr.statusText);
  };

  xhr.send();
}

// Save todo to API 
// async function saveTodoToAPI(todo) {
//   try {
//     await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(todo),
//     });
//   } catch (error) {
//     console.error("Error saving todo:", error);
//   }
// }
// USE XMLHttpRequest() => POST
function saveTodoToAPI(todo, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (callback) callback();
    } else {
      console.error("Error saving todo:", xhr.statusText);
    }
  };

  xhr.onerror = function() {
    console.error("Error saving todo:", xhr.statusText);
  };

  xhr.send(JSON.stringify(todo));
}

// Delete todo from API
// async function deleteTodoFromAPI(id) {
//   try {
//     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//   } catch (error) {
//     console.error("Error deleting todo:", error);
//   }
// }
// USE XMLHttpRequest() => DELETE
function deleteTodoFromAPI(id, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${API_URL}/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (callback) callback();
    } else {
      console.error("Error deleting todo:", xhr.statusText);
    }
  };

  xhr.onerror = function() {
    console.error("Error deleting todo:", xhr.statusText);
  };

  xhr.send();
}

// Update todo in API
async function updateTodoInAPI(id, updates) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}
// USE XMLHttpRequest() => PUT
// function updateTodoInAPI(id, updates, callback) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("PUT", `${API_URL}/${id}`, true);
//   xhr.setRequestHeader("Content-Type", "application/json");

//   xhr.onload = function() {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       if (callback) callback();
//     } else {
//       console.error("Error updating todo:", xhr.statusText);
//     }
//   };

//   xhr.onerror = function() {
//     console.error("Error updating todo:", xhr.statusText);
//   };

//   xhr.send(JSON.stringify(updates));
// }

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!inputEle.value || inputEle.value.trim() === "") {
    alert("No Value Item");
    formElement.reset();
    return;
  }

  const newTodo = { text: inputEle.value, completed: false };
  addTodo(newTodo.text);
  await saveTodoToAPI(newTodo);
  formElement.reset();
});

// todoContainer.addEventListener("click", async (e) => {
//   const todoItem = e.target.parentElement;

//   if (e.target.classList.contains("delete")) {
//     const id = todoItem.dataset.id;
//     todoItem.remove();
//     await deleteTodoFromAPI(id);
//   } else if (e.target.classList.contains("complete")) {
//     const id = todoItem.dataset.id;
//     todoItem.classList.toggle("completed");
//     const completed = todoItem.classList.contains("completed");
//     await updateTodoInAPI(id, { completed });
//   } else if (e.target.classList.contains("edit")) {
//     const itemValue = e.target.parentElement.querySelector(".item");
//     itemValue.setAttribute("contenteditable", "true");
//     itemValue.focus();
//     console.log(itemValue);

//     const saveAndBlur = async () => {
//       itemValue.removeAttribute("contenteditable");
//       const id = todoItem.dataset.id;
//       const newText = itemValue.textContent;
//       await updateTodoInAPI(id, { text: newText });
//     };

//     itemValue.addEventListener("blur", saveAndBlur);
//     itemValue.addEventListener("keydown", (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         itemValue.blur();
//       }
//     });
//   }else if (e.target.classList.contains("input-checkbox")){
//     let checkBoxItems = todoListContainer.querySelectorAll(".input-checkbox:checked");
//     console.log('check:',checkBoxItems.length);
//     if (checkBoxItems.length <=0 ) {
//       completeCheckedBtn.disabled = true;
//       deleteCheckedBtn.disabled = true;
//     } else {
//       completeCheckedBtn.disabled = false;
//       deleteCheckedBtn.disabled = false;
//     }
//   }
// });
todoContainer.addEventListener("click", async (e) => {
  const todoItem = e.target.parentElement;
  const action = e.target.classList[0]; // Assuming that the action can be found in the first class

  switch (true) {
    case e.target.classList.contains("delete"):
      const idDelete = todoItem.dataset.id;
      todoItem.remove();
      await deleteTodoFromAPI(idDelete);
      break;

    case e.target.classList.contains("complete"):
      const idComplete = todoItem.dataset.id;
      todoItem.classList.toggle("completed");
      const completed = todoItem.classList.contains("completed");
      await updateTodoInAPI(idComplete, { completed });
      break;

    case e.target.classList.contains("edit"):
      const itemValue = e.target.parentElement.querySelector(".item");
      itemValue.setAttribute("contenteditable", "true");
      itemValue.focus();
      console.log(itemValue);

      const saveAndBlur = async () => {
        itemValue.removeAttribute("contenteditable");
        const idEdit = todoItem.dataset.id;
        const newText = itemValue.textContent;
        await updateTodoInAPI(idEdit, { text: newText });
      };

      itemValue.addEventListener("blur", saveAndBlur);
      itemValue.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          itemValue.blur();
        }
      });
      break;

    case e.target.classList.contains("input-checkbox"):
      let checkBoxItems = todoListContainer.querySelectorAll(
        ".input-checkbox:checked"
      );
      // console.log("check:", checkBoxItems.length);
      if (checkBoxItems.length <= 0) {
        completeCheckedBtn.disabled = true;
        deleteCheckedBtn.disabled = true;
      } else {
        completeCheckedBtn.disabled = false;
        deleteCheckedBtn.disabled = false;
      }
      break;

    default:
      break;
  }
});

todoListContainer.addEventListener("mouseover", () => {
  let todoItems = todoListContainer.querySelectorAll(".todo-item");
  btnContainer.style.visibility = todoItems.length > 0 ? "visible" : "hidden";
});

todoListContainer.addEventListener("mouseout", () => {
  btnContainer.style.visibility = "hidden";
});

clearAllBtn.addEventListener("click", () => {
  const todoItems = document.querySelectorAll(".todo-item");
  for (const item of todoItems) {
    const id = item.dataset.id;
    deleteTodoFromAPI(id);
    item.remove();
  }
});

completeAllBtn.addEventListener("click", async () => {
  const todoItems = document.querySelectorAll(".todo-item");
  const allCompleted = Array.from(todoItems).every((item) =>
    item.classList.contains("completed")
  );
  for (const item of todoItems) {
    console.log('test');
    const id = item.dataset.id;
    const newCompletedState = !allCompleted;
    item.classList.toggle("completed", newCompletedState);
    await updateTodoInAPI(id, { completed: newCompletedState });
  }
});

deleteCheckedBtn.addEventListener("click", async () => {
  const checkBoxItems = document.querySelectorAll(".input-checkbox:checked");
  for (const checkbox of checkBoxItems) {
    const id = checkbox.parentElement.dataset.id;
    await deleteTodoFromAPI(id);
    checkbox.parentElement.remove();
  }
});

completeCheckedBtn.addEventListener("click", async () => {
  const checkBoxItems = document.querySelectorAll(".input-checkbox:checked");
  const allCheckedCompleted = Array.from(checkBoxItems).every((checkbox) =>
    checkbox.parentElement.classList.contains("completed")
  );
  for (const checkbox of checkBoxItems) {
    const id = checkbox.parentElement.dataset.id;
    const newCompletedState = !allCheckedCompleted;
    checkbox.parentElement.classList.toggle("completed", newCompletedState);
    await updateTodoInAPI(id, { completed: newCompletedState });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadTodosFromAPI();
});
