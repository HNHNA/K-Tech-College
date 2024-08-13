const API_URL = "https://66ac3e2af009b9d5c73169e8.mockapi.io/student/student";

class Student {
  constructor(id, code, firstname, lastname, email, address, image, date) {
    this.id = id;
    this.code = code;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.image = image;
    this.date = date;
  }
}

let studentList = [];
const formSubmit = document.getElementById("user-form");
const tableBody = document
  .getElementById("student-table")
  .querySelector("tbody");

function renderTableStudent() {
  tableBody.replaceChildren();

  studentList.forEach((student, index) => {
    const row = document.createElement("tr");

    const code = document.createElement("td");
    code.textContent = student.code;
    row.appendChild(code);

    const firstname = document.createElement("td");
    firstname.textContent = student.firstname;
    row.appendChild(firstname);

    const lastname = document.createElement("td");
    lastname.textContent = student.lastname;
    row.appendChild(lastname);

    const email = document.createElement("td");
    email.textContent = student.email;
    row.appendChild(email);

    const address = document.createElement("td");
    address.textContent = student.address;
    row.appendChild(address);

    const date = document.createElement("td");
    date.textContent = student.date;
    row.appendChild(date);

    const imagetd = document.createElement("td");
    const image = document.createElement("img");
    image.src = student.image;
    image.alt = "Student Image";
    imagetd.appendChild(image);
    row.appendChild(imagetd);

    const actions = document.createElement("td");
    actions.className = "container-btn"

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    editButton.onclick = () => editStudent(index, student.id);
    actions.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => deleteStudent(index, student.id);
    actions.appendChild(deleteButton);

    row.appendChild(actions);

    tableBody.appendChild(row);
  });
}

async function loadStudentFromAPI() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    data.map((item) => {
      let student = new Student(
        item.id,
        item.code,
        item.firstname,
        item.lastname,
        item.email,
        item.address,
        item.image,
        item.date
      );
      studentList.push(student);
    });
    renderTableStudent();
  } catch (error) {
    console.error("Error loading StudentList:", error);
  }
}

function checkRequired(fields) {
  return fields.every((field) => field.trim() !== "");
}
function checkLength(fields) {
  return fields.code.length >= 3 && fields.code.length <= 10;
}
function checkEmail(email) {
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return checkEmail.test(email);
}
function validateDataInput() {
  const code = document.getElementById("code").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const image = document.getElementById("image").value;
  const date = document.getElementById("date").value;
  const fields = { code, firstname, lastname, address, image, date };

  if (!checkRequired(Object.values(fields))) {
    alert("Please fill out all required fields.");
    return false;
  }
  if (!checkLength(fields)) {
    alert("The code must be between 3 and 10 characters long.");
    return false;
  }
  if (!checkEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}
function addStudent() {
  if (!validateDataInput()) {
    return;
  }
  const code = document.getElementById("code").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const image = document.getElementById("image").value;
  const date = document.getElementById("date").value;
  const newStudent = new Student(
    null,
    code,
    firstname,
    lastname,
    email,
    address,
    image,
    date
  );
  saveStudentAPI(newStudent);
  studentList.push(newStudent);
  renderTableStudent();
}

async function saveStudentAPI(student) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
  } catch (error) {
    console.error("Error saving todo:", error);
  }
}

// Delete
async function deleteStudentAPI(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

function deleteStudent(index, id) {
  studentList.splice(index, 1);
  deleteStudentAPI(id);
  renderTableStudent();
}

//Load
document.addEventListener("DOMContentLoaded", () => {
  loadStudentFromAPI();
});

// Add
formSubmit.addEventListener("submit", handleAddStudent);

function handleAddStudent(e) {
  e.preventDefault();
  if (formSubmit.dataset.editIndex !== undefined) {
    handleUpdateStudent(e);
  } else {
    addStudent();
    formSubmit.reset();
  }
}

// Edit
function editStudent(index, id) {
  const student = studentList[index];

  document.getElementById("code").value = student.code;
  document.getElementById("firstname").value = student.firstname;
  document.getElementById("lastname").value = student.lastname;
  document.getElementById("email").value = student.email;
  document.getElementById("address").value = student.address;
  document.getElementById("image").value = student.image;
  document.getElementById("date").value = student.date;

  formSubmit.dataset.editIndex = index;
  formSubmit.dataset.editId = id;

  formSubmit.querySelector('button[type="submit"]').textContent = "Update";

  formSubmit.removeEventListener("submit", handleAddStudent);

  formSubmit.addEventListener("submit", handleUpdateStudent);
}

function handleUpdateStudent(e) {
  e.preventDefault();

  const index = formSubmit.dataset.editIndex;
  const id = formSubmit.dataset.editId;

  updateStudent(index, id);

  formSubmit.querySelector('button[type="submit"]').textContent = "Add Student";

  formSubmit.removeEventListener("submit", handleUpdateStudent);
  formSubmit.addEventListener("submit", handleAddStudent);
}

async function updateStudent(index, id) {
  if (!validateDataInput()) {
    return;
  }

  const student = studentList[index];
  student.code = document.getElementById("code").value;
  student.firstname = document.getElementById("firstname").value;
  student.lastname = document.getElementById("lastname").value;
  student.email = document.getElementById("email").value;
  student.address = document.getElementById("address").value;
  student.image = document.getElementById("image").value;
  student.date = document.getElementById("date").value;
  formSubmit.reset();

  try {
    await updateStudentAPI(id, student);
    renderTableStudent();
  } catch (error) {
    console.error("Error updating student:", error);
  }
}

async function updateStudentAPI(id, updates) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
  } catch (error) {
    console.error("Error updating student:", error);
  }
}

// Search
document.getElementById("search-submit").addEventListener("click", () => {
  const searchId = document.getElementById("search-id").value.trim();
  const searchName = document.getElementById("search-name").value.trim();

  if (searchId) {
    searchStudentById(searchId);
  } else if (searchName) {
    searchStudentByName(searchName);
  } else {
    alert("Please enter an ID or a Name to search.");
  }
});

function searchStudentById(id) {
  // Tìm chỉ số của học sinh có id tương ứng
  const numericId = Number(id);
  const index = studentList.findIndex((stu) => stu.code === numericId);

  if (index !== -1) {
    // Di chuyển học sinh tìm thấy lên đầu danh sách
    const [student] = studentList.splice(index, 1);
    studentList.unshift(student); // Thêm học sinh tìm thấy vào đầu danh sách

    renderTableStudent();
  } else {
    alert("Student not found.");
  }
}

function searchStudentByName(name) {
  // Tìm tất cả học sinh có tên trùng khớp
  const foundStudents = studentList.filter(
    (student) =>
      student.firstname.toLowerCase().includes(name.toLowerCase()) ||
      student.lastname.toLowerCase().includes(name.toLowerCase())
  );

  if (foundStudents.length > 0) {
    // Di chuyển các học sinh tìm thấy lên đầu danh sách
    const foundStudentsIds = new Set(foundStudents.map(student => student.id));
    studentList = [...foundStudents, ...studentList.filter(student => !foundStudentsIds.has(student.id))];

    renderTableStudent();
  } else {
    alert("No students found with that name.");
  }
}
