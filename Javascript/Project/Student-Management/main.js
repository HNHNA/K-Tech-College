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
const tableBody = document.getElementById("student-table").querySelector("tbody");

function renderTableStudent() {
  tableBody.innerHTML = "";
  studentList.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.code}</td>
      <td>${student.firstname}</td>
      <td>${student.lastname}</td>
      <td>${student.email}</td>
      <td>${student.address}</td>
      <td>${student.date}</td>
      <img src= "${student.image}"></img>
      <td>
        <button class="edit" onclick="editStudent(${index}, ${student.id})">Sửa</button>
        <button class="delete" onclick="deleteStudent(${index}, ${student.id})">Xóa</button>
      </td>
      `;
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

function checklength() {}
function checkRequired() {}
function validate() {}
function addStudent() {
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
  saveStudentToAPI(newStudent);
  studentList.push(newStudent);
  renderTableStudent();
}

async function saveStudentToAPI(student) {
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

async function deleteStudentFromAPI(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

function deleteStudent(index, id) {
  studentList.splice(index, 1);
  deleteStudentFromAPI(id);
  renderTableStudent();
}

document.addEventListener("DOMContentLoaded", () => {
  loadStudentFromAPI();
});


// formSubmit.addEventListener("submit", (e) => {
//   e.preventDefault();
//   addStudent();
//   formSubmit.reset();
// });


function editStudent(index, id) {
  const student = studentList[index];
  console.log(student);
  document.getElementById("code").value = student.code;
  document.getElementById("firstname").value = student.firstname;
  document.getElementById("lastname").value = student.lastname;
  document.getElementById("email").value = student.email;
  document.getElementById("address").value = student.address;
  document.getElementById("image").value = student.image;
  document.getElementById("date").value = student.date;
  
  formSubmit.removeEventListener("submit", (e) => {
    e.preventDefault();
    // addStudent();

    updateStudent(index, id);
    formSubmit.reset();
  });
  // formSubmit.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   updateStudent(index, id);
  //   formSubmit.reset();
  // });
};

async function updateStudent(index, id) {
  const student = studentList[index];
  student.code = document.getElementById('code').value;
  student.firstname = document.getElementById('firstname').value;
  student.lastname = document.getElementById('lastname').value;
  student.email = document.getElementById('email').value;
  student.address = document.getElementById('address').value;
  student.image = document.getElementById('image').value;
  student.date = document.getElementById('date').value;
  
  try {
    await updateStudentAPI(id, student);
    studentList[index] = student;
    renderTableStudent();
  } catch (error) {
    console.error("Error updating student:", error);
  } finally {
    // formSubmit.reset();
    // formSubmit.addEventListener('submit', handleAddStudent);
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
    console.error("Error updating todo:", error);
  }
}