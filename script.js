document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");

    displayContacts();

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        if (name && phone) {
            const contact = { name, phone, id: Date.now() };
            saveContact(contact);
            displayContacts();
            contactForm.reset();
        }
    });

    function saveContact(contact) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function displayContacts() {
        contactList.innerHTML = "";
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.forEach(function(contact) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `
                <strong>${contact.name}</strong>: ${contact.phone}
                <button type="button" class="btn btn-danger btn-sm float-right delete-btn" data-id="${contact.id}">Видалити</button>`;
            contactList.appendChild(li);
        });
    }

    contactList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            deleteContact(id);
            displayContacts();
        }
    });

    function deleteContact(id) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts = contacts.filter(contact => contact.id !== id);
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }
});