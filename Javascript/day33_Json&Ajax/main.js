const apiUrl = 'https://66a9b432613eced4eba5f3dd.mockapi.io/ktc-fe/hocvien';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderData(data) {
    const tbody = document.querySelector('#data-table tbody');
    
    tbody.replaceChildren();

    data.forEach(item => {

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name || 'NULL'; 
        row.appendChild(nameCell);

        const idCell = document.createElement('td');
        idCell.textContent = item.id || 'NULL';
        row.appendChild(idCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = item.username || 'NULL';
        row.appendChild(usernameCell);

        const passwordCell = document.createElement('td');
        passwordCell.textContent = item.password || 'NULL';
        
        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteData(item.id));
        actionsCell.appendChild(deleteButton);

        row.appendChild(passwordCell);

        tbody.appendChild(row);
    });
}

async function addData(name, id, username, password) {
  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, id, username, password }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchData();
  } catch (error) {
      console.error('Error posting data:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData();

  const btnAdd = document.getElementById('btn-add');
  const formContainer = document.getElementById('form-container');
  const addForm = document.getElementById('add-form');

  btnAdd.addEventListener('click', () => {
      formContainer.style.display = 'block'; 
  });

  addForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const id = document.getElementById('id').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      addData(name, id, username, password);
      addForm.reset();
      formContainer.style.display = 'none'; 
  });
});