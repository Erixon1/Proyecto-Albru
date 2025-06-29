// ===== MODAL CREATE USER =====
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const customModal = document.getElementById('customModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', () => {
    customModal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    closeUserModal();
});

modalOverlay.addEventListener('click', () => {
    closeUserModal();
});

// Función para cerrar y limpiar modal de creación/edición
function closeUserModal() {
    customModal.style.display = 'none';

    // Restaurar valores del formulario
    document.getElementById('editMode').value = 'false';
    document.getElementById('modalTitle').textContent = 'Crear nuevo usuario';
    document.getElementById('dni').readOnly = false;
    document.getElementById('dni').disabled = false;
    document.getElementById('create-user-form').reset();
    document.getElementById('password').closest('.form-group').style.display = 'block';
    document.getElementById('submitButton').textContent = 'Registrar nuevo usuario';
    document.getElementById('create-user-form').setAttribute('action', '/user/admin');
}

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
    customModal.style.display = 'block';
}




// Spring Boot maneja el envío del formulario de edición automáticamente


// ===== EVENT LISTENERS PARA CERRAR MODALES =====
window.addEventListener('click', function(event) {
    const deleteModal = document.getElementById('modal-delete-user');

    if (event.target === deleteModal) {
        closeDeleteModal();
    }

    if (event.target === customModal) {
        closeUserModal();
    }
});

// ===== CERRAR CON ESCAPE (opcional) =====
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDeleteModal();
        closeEditModal();        
    }
});


//FORMULARIOS VALIDACION

const form = document.getElementById('create-user-form');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('last-name');
const nameError = document.getElementById('name-error');
const lastNameError = document.getElementById('last-name-error');
const dniInput = document.getElementById('dni');
const dniError = document.getElementById('dni-error');
const formError = document.getElementById('form-error');

function validarSoloLetras(texto) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto.trim());
}

function validarSoloNumeros(texto) {
    return /^\d+$/.test(texto.trim());
}

function validarDNI() {
    const valor = dniInput.value.trim();
    if (!validarSoloNumeros(valor) || valor.length !== 8) {
        dniError.textContent = 'Ingresa un DNI válido de 8 dígitos';
        dniInput.classList.add('input-error');
        return false;
    } else {
        dniError.textContent = '';
        dniInput.classList.remove('input-error');
        return true;
    }
}

function validarCampo(input, errorSpan, mensaje) {
    const valor = input.value;
    if (!validarSoloLetras(valor)) {
        errorSpan.textContent = mensaje;
        input.classList.add('input-error');
        return false;
    } else {
        errorSpan.textContent = '';
        input.classList.remove('input-error');
        return true;
    }
}

// Validación en tiempo real
nameInput.addEventListener('input', () => {
    validarCampo(nameInput, nameError, '¡Por favor ingrese solo letras!');
});
lastNameInput.addEventListener('input', () => {
    validarCampo(lastNameInput, lastNameError, '¡Por favor ingrese solo letras!');
});
dniInput.addEventListener('input', validarDNI);

// Validación antes de enviar
form.addEventListener('submit', function (event) {
    const nombreValido = validarCampo(nameInput, nameError, '¡Por favor ingrese solo letras!');
    const apellidoValido = validarCampo(lastNameInput, lastNameError, '¡Por favor ingrese solo letras!');
    const dniValido = validarDNI();

    const formularioValido = nombreValido && apellidoValido && dniValido;

    if (!nombreValido || !apellidoValido) {
        event.preventDefault(); // Bloquea envío
    }

    if (!formularioValido) {
        event.preventDefault();
        formError.style.display = 'block';
        formError.textContent = 'Algún campo es incorrecto. Por favor, corrige los errores.';
    } else {
        formError.style.display = 'none';
    }
});
