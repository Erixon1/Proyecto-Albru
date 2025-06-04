
// ===== MODAL CREATE USER =====
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

// No necesitamos manejar el envío del formulario con JavaScript
// Spring Boot se encarga del formulario automáticamente
// El formulario tiene: th:action="@{/user/admin}" method="POST"

// ===== MODAL DELETE USER =====
function openDeleteModal(dni, nombreCompleto) {
    const modal = document.getElementById("modal-delete-user");
    const userNameSpan = document.getElementById("delete-user-name");
    const deleteForm = document.getElementById("delete-form");

    userNameSpan.textContent = nombreCompleto;
    deleteForm.action = "/user/delete/" + dni;

    modal.style.display = "flex";
}

function closeDeleteModal() {
    const modal = document.getElementById("modal-delete-user");
    modal.style.display = "none";
}


// Spring Boot maneja automáticamente el formulario de eliminación
// No necesitamos JavaScript para esto


function closeEditModal() {
    document.getElementById('modal-edit-user').style.display = 'none';
}

// Manejar envío del formulario de edición
document.getElementById('edit-user-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('edit-user-id').value;
    const name = document.getElementById('edit-user-name').value;
    const email = document.getElementById('edit-user-email').value;
    const role = document.getElementById('edit-user-role').value;

    console.log("Datos editados:", { id, name, email, role });

    closeEditModal();
});

// ===== EVENT LISTENERS PARA CERRAR MODALES =====
window.addEventListener('click', function(event) {
    const deleteModal = document.getElementById('modal-delete-user');
    const editModal = document.getElementById('modal-edit-user');

    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    if (event.target === editModal) {
        closeEditModal();
    }
});