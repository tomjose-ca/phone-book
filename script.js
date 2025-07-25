const apiUrl = 'https://jsonplaceholder.typicode.com/users';
let contacts = [];
let editIndex = null;

async function fetchContacts() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    contacts = data.map(user => ({
      name: user.name,
      phone: user.phone
    }));
    displayContacts(contacts);
  } catch (err) {
    alert("Error fetching contacts");
    console.log(err);
  }
}

function addOrUpdate() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !phone) {
    alert("Please fill both fields");
    return;
  }

  // 💡 Phone number validation
  const phonePattern = /^[\d\s\-()+]+$/;
  if (!phonePattern.test(phone)) {
    alert("Please enter a valid phone number using digits only");
    return;
  }

  const contact = { name, phone };

  if (editIndex !== null) {
    contacts[editIndex] = contact;
    editIndex = null;
  } else {
    contacts.push(contact);
  }

  displayContacts(contacts);
  clearInputs();
}

function displayContacts(data) {
  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach((c, i) => {
    const li = document.createElement('li');
    li.textContent = `${c.name} - ${c.phone}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => loadContact(i);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteContact(i);

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
}

function loadContact(i) {
  const contact = contacts[i];
  document.getElementById('name').value = contact.name;
  document.getElementById('phone').value = contact.phone;
  editIndex = i;
}

function deleteContact(i) {
  contacts.splice(i, 1);
  displayContacts(contacts);
}

function searchContact() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(query) || c.phone.includes(query)
  );
  displayContacts(filtered);
}

fetchContacts();