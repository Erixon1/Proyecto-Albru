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

// Spring Boot maneja el envío del formulario de creación automáticamente


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


// ===== MODAL EDIT USER =====
function openEditModal(button) {
    document.getElementById('editMode').value = 'true';
    document.getElementById('modalTitle').textContent = 'Editar usuario';
    document.getElementById('dni').value = button.getAttribute('data-user-dni');
    document.getElementById('dni').readOnly = true; // Evitar modificar DNI
    document.getElementById('name').value = button.getAttribute('data-user-nombres');
    document.getElementById('last-name').value = button.getAttribute('data-user-apellidos');
    document.getElementById('gender').value = button.getAttribute('data-user-genero');
    document.getElementById('user-type').value = button.getAttribute('data-user-role-id');
    document.getElementById('password').closest('.form-group').style.display = 'none';
    document.getElementById('submitButton').textContent = 'Guardar cambios';
    document.getElementById('create-user-form').setAttribute('action', '/user/update');
    document.getElementById('customModal').style.display = 'block';
}


function closeEditModal() {
    document.getElementById("modal-edit-user").style.display = "none";
}

// Spring Boot maneja el envío del formulario de edición automáticamente


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

// ===== CERRAR CON ESCAPE (opcional) =====
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDeleteModal();
        closeEditModal();
        customModal.style.display = 'none';
    }
});
