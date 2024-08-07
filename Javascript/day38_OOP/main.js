class Student {
  constructor(name, age, email, phone) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.phone = phone;
  }
}

let students = [];

const form = document.getElementById('student-form');
const tableBody = document.getElementById('student-table').querySelector('tbody');

function renderTable() {
  // tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>
        <button class="edit" onclick="editStudent(${index})">Sửa</button>
        <button class="delete" onclick="deleteStudent(${index})">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function addStudent(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value, 10);
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (!name || isNaN(age) || !email || !phone) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  const newStudent = new Student(name, age, email, phone);
  students.push(newStudent);
  renderTable();
  form.reset();
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('email').value = student.email;
  document.getElementById('phone').value = student.phone;
  form.removeEventListener('submit', addStudent);
  form.addEventListener('submit', (e) => updateStudent(e, index));
}

function updateStudent(e, index) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value, 10);
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (!name || isNaN(age) || !email || !phone) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  students[index] = new Student(name, age, email, phone);
  renderTable();
  form.reset();
  form.removeEventListener('submit', updateStudent);
  form.addEventListener('submit', addStudent);
}

function saveData() {
  const blob = new Blob([JSON.stringify(students)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mockdata.json';
  a.click();
  URL.revokeObjectURL(url);
}

function loadData() {
  fetch('mockdata.json')
    .then(response => response.json())
    .then(data => {
      students = data.map(item => new Student(item.name, item.age, item.email, item.phone));
      renderTable();
    })
    .catch(error => console.error('Error loading data:', error));
}

form.addEventListener('submit', addStudent);

// document.getElementById('save-data').addEventListener('click', saveData);
// document.getElementById('load-data').addEventListener('click', loadData);

document.addEventListener('DOMContentLoaded',() => {
  loadData();
})
