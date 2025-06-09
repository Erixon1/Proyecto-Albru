
//MODAL CREATE USER
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const customModal = document.getElementById('customModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', () => {
    customModal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    customModal.style.display = 'none';
});

modalOverlay.addEventListener('click', () => {
    customModal.style.display = 'none';
});

// --- MANEJAR ENVÍO DEL FORMULARIO ---
const createUserForm = document.getElementById('create-user-form');

createUserForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recargar la página

    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('correo').value.trim();
    const userType = document.getElementById('user-type').value;

    console.log("Datos del nuevo usuario:");
    console.log({ name, lastName, email, userType });

    // Aquí irá el fetch() al backend más adelante

    customModal.style.display = 'none'; // Cierra modal
    createUserForm.reset(); // Limpia formulario
});

//MODAL DELETE
function openDeleteModal(userName, userId) {
    const modal = document.getElementById("modal-delete-user");
    const userNameSpan = document.getElementById("delete-user-name");
    const userIdInput = document.getElementById("delete-user-id");

    userNameSpan.textContent = userName;
    userIdInput.value = userId;
    modal.style.display = "flex";
}

function closeDeleteModal() {
    document.getElementById("modal-delete-user").style.display = "none";
}

// Cerrar si se hace clic fuera del contenido
window.addEventListener("click", function (e) {
    const modal = document.getElementById("modal-delete-user");
    if (e.target === modal) {
        closeDeleteModal();
    }
});

// Manejar envío del formulario
const deleteUserForm = document.getElementById("delete-user-form");

deleteUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = document.getElementById("delete-user-id").value;

    console.log("Usuario a eliminar:", userId);

    // Aquí irá tu fetch() o lógica para eliminar desde el backend

    closeDeleteModal(); // Cierra la ventana
});


//MODAL EDIT
function openEditModal(userId, userName, userEmail, userRole) {
    document.getElementById("edit-user-id").value = userId;
    document.getElementById("edit-user-name").value = userName;
    document.getElementById("edit-user-email").value = userEmail;
    document.getElementById("edit-user-role").value = userRole;

    document.getElementById("modal-edit-user").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("modal-edit-user").style.display = "none";
}

// Cierra el modal al hacer clic fuera del contenido
window.addEventListener("click", function (e) {
    const modal = document.getElementById("modal-edit-user");
    if (e.target === modal) {
    closeEditModal();
    }
});

// Envío del formulario (aquí luego iría el fetch o submit al backend)
document.getElementById("edit-user-form").addEventListener("submit", function (e) {
e.preventDefault();

    const id = document.getElementById("edit-user-id").value;
    const name = document.getElementById("edit-user-name").value;
    const email = document.getElementById("edit-user-email").value;
    const role = document.getElementById("edit-user-role").value;

    console.log("Enviar datos editados:", { id, name, email, role });

// Aquí irá tu lógica de actualización real (fetch o form)
    closeEditModal();
});