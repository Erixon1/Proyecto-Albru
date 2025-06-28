// Variables para manejar los modales de empresa
const modal = document.getElementById('customModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const submitButton = document.getElementById('submitButton');
const form = document.getElementById('create-empresa-form');
const editModeInput = document.getElementById('editMode');

// Variables para manejar los modales de planes
const planModal = document.getElementById('planModal');
const openPlanModalBtn = document.getElementById('openPlanModalBtn');
const closePlanModalBtn = document.getElementById('closePlanModalBtn');
const planModalOverlay = document.getElementById('planModalOverlay');
const planModalTitle = document.getElementById('planModalTitle');
const planSubmitButton = document.getElementById('planSubmitButton');
const planForm = document.getElementById('create-plan-form');
const planEditModeInput = document.getElementById('planEditMode');

// Abrir modal para crear nueva empresa
openModalBtn.addEventListener('click', function() {
    resetForm();
    modalTitle.textContent = 'Crear nueva empresa';
    submitButton.textContent = 'Registrar nueva empresa';
    form.action = '/user/empresas';
    editModeInput.value = 'false';
    modal.style.display = 'block';
});

// Cerrar modal de empresa
closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

modalOverlay.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Abrir modal para crear nuevo plan
openPlanModalBtn.addEventListener('click', function() {
    resetPlanForm();
    planModalTitle.textContent = 'Crear nuevo plan';
    planSubmitButton.textContent = 'Registrar nuevo plan';
    planForm.action = '/user/planes';
    planEditModeInput.value = 'false';
    planModal.style.display = 'block';
});

// Cerrar modal de planes
closePlanModalBtn.addEventListener('click', function() {
    planModal.style.display = 'none';
});

planModalOverlay.addEventListener('click', function() {
    planModal.style.display = 'none';
});

// Función para abrir modal de edición de empresa
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

// Función para abrir modal de edición de plan
function openEditPlanModal(button) {
    const planId = button.getAttribute('data-plan-id');
    const planTipo = button.getAttribute('data-plan-tipo');
    const planPrecio = button.getAttribute('data-plan-precio');
    const planDescripcion = button.getAttribute('data-plan-descripcion');
    const planEmpresa = button.getAttribute('data-plan-empresa');

    // Llenar el formulario con los datos del plan
    document.getElementById('planId').value = planId;
    document.getElementById('idEmpresa').value = planEmpresa;
    document.getElementById('tipo').value = planTipo;
    document.getElementById('precio').value = planPrecio;
    document.getElementById('descripcion').value = planDescripcion;

    // Configurar modal para edición
    planModalTitle.textContent = 'Editar plan';
    planSubmitButton.textContent = 'Actualizar plan';
    planForm.action = '/user/planes/update';
    planEditModeInput.value = 'true';

    planModal.style.display = 'block';
}

// Función para resetear el formulario de empresa
function resetForm() {
    document.getElementById('empresaId').value = '';
    document.getElementById('nombreEmpresa1').value = '';
}

// Función para resetear el formulario de plan
function resetPlanForm() {
    document.getElementById('planId').value = '';
    document.getElementById('idEmpresa').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descripcion').value = '';
}

// Modal de eliminación de empresa
function openDeleteModal(empresaId, empresaNombre) {
    document.getElementById('delete-empresa-name').textContent = empresaNombre;
    const deleteForm = document.getElementById('delete-form');
    deleteForm.action = '/user/empresas/delete/' + empresaId;
    document.getElementById('modal-delete-empresa').style.display = 'block';
}

function closeDeleteModal() {
    document.getElementById('modal-delete-empresa').style.display = 'none';
}

// Modal de eliminación de plan
function openDeletePlanModal(planId, planTipo) {
    document.getElementById('delete-plan-name').textContent = planTipo;
    const deletePlanForm = document.getElementById('delete-plan-form');
    deletePlanForm.action = '/user/planes/delete/' + planId;
    document.getElementById('modal-delete-plan').style.display = 'block';
}

function closeDeletePlanModal() {
    document.getElementById('modal-delete-plan').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    const deleteModal = document.getElementById('modal-delete-empresa');
    const deletePlanModal = document.getElementById('modal-delete-plan');

    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    if (event.target === deletePlanModal) {
        closeDeletePlanModal();
    }
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === planModal) {
        planModal.style.display = 'none';
    }
});

// Manejar mensajes de éxito/error
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        alert('Empresa registrada/actualizada con éxito');
    }
    if (urlParams.has('deleted')) {
        alert('Empresa eliminada correctamente');
    }
    if (urlParams.has('planSuccess')) {
        alert('Plan registrado con éxito');
    }
    if (urlParams.has('planUpdated')) {
        alert('Plan actualizado con éxito');
    }
    if (urlParams.has('planDeleted')) {
        alert('Plan eliminado correctamente');
    }
    if (urlParams.has('error')) {
        alert('Error al realizar la operación');
    }
});