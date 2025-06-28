// Variables para manejar los modales
const modal = document.getElementById('customModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const submitButton = document.getElementById('submitButton');
const form = document.getElementById('create-empresa-form');
const editModeInput = document.getElementById('editMode');

// Abrir modal para crear nueva empresa
openModalBtn.addEventListener('click', function() {
    resetForm();
    modalTitle.textContent = 'Crear nueva empresa';
    submitButton.textContent = 'Registrar nueva empresa';
    form.action = '/user/empresas';
    editModeInput.value = 'false';
    modal.style.display = 'block';
});

// Cerrar modal
closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

modalOverlay.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Función para abrir modal de edición
function openEditModal(button) {
    const empresaId = button.getAttribute('data-empresa-id');
    const empresaNombre = button.getAttribute('data-empresa-nombre');

    // Llenar el formulario con los datos de la empresa
    document.getElementById('empresaId').value = empresaId;
    document.getElementById('nombreEmpresa1').value = empresaNombre;

    // Configurar modal para edición
    modalTitle.textContent = 'Editar empresa';
    submitButton.textContent = 'Actualizar empresa';
    form.action = '/user/empresas/update';
    editModeInput.value = 'true';

    modal.style.display = 'block';
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('empresaId').value = '';
    document.getElementById('nombreEmpresa1').value = '';
}

// Modal de eliminación
function openDeleteModal(empresaId, empresaNombre) {
    document.getElementById('delete-empresa-name').textContent = empresaNombre;
    const deleteForm = document.getElementById('delete-form');
    deleteForm.action = '/user/empresas/delete/' + empresaId;
    document.getElementById('modal-delete-empresa').style.display = 'block';
}

function closeDeleteModal() {
    document.getElementById('modal-delete-empresa').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    const deleteModal = document.getElementById('modal-delete-empresa');
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Manejar mensajes de éxito/error
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        alert('Operación realizada con éxito');
    }
    if (urlParams.has('deleted')) {
        alert('Empresa eliminada correctamente');
    }
    if (urlParams.has('error')) {
        alert('Error al realizar la operación');
    }
});
