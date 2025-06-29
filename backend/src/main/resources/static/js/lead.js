document.addEventListener('DOMContentLoaded', () => {
    const btnAgregarLeads = document.getElementById('openModalBtn');
    const modalImportar = document.getElementById('importModal');
    const botonesAsignar = document.querySelectorAll('.btn-edit'); // o '.btn-asignar'
    const modalAsignar = document.getElementById('customModal');
    const overlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContentAsignar = modalAsignar?.querySelector('.modal-content');
    const leadIdInput = document.getElementById('leadId');

    // Debug: verificar que los elementos existen
    console.log('Botones asignar encontrados:', botonesAsignar.length);
    console.log('Campo leadId encontrado:', leadIdInput);

    btnAgregarLeads?.addEventListener('click', e => {
        e.preventDefault();
        modalImportar?.classList.add('show');
    });

    window.cerrarModal = () => {
        modalImportar?.classList.remove('show');
    };

    // Manejar los botones de asignar
    botonesAsignar.forEach((boton, index) => {
        console.log(`Configurando botón ${index}:`, boton);

        boton.addEventListener('click', e => {
            e.preventDefault();

            // Capturar el lead ID del atributo data-lead-id
            const leadId = boton.getAttribute('data-lead-id');
            console.log('Lead ID capturado del botón:', leadId);

            // Verificar que tenemos tanto el input como el leadId
            if (leadIdInput && leadId) {
                leadIdInput.value = leadId;
                console.log('Lead ID asignado al input:', leadIdInput.value);
            } else {
                console.error('Error: No se pudo asignar leadId');
                console.error('leadIdInput existe:', !!leadIdInput);
                console.error('leadId tiene valor:', !!leadId);
                return; // No abrir el modal si hay error
            }

            modalAsignar?.classList.add('show');
        });
    });

    closeModalBtn?.addEventListener('click', () => {
        modalAsignar?.classList.remove('show');
    });

    overlay?.addEventListener('click', () => {
        modalAsignar?.classList.remove('show');
    });

    modalContentAsignar?.addEventListener('click', e => {
        e.stopPropagation();
    });

    // Debug: verificar el formulario antes del envío
    const form = document.getElementById('create-user-form');
    form?.addEventListener('submit', e => {
        const leadIdValue = document.getElementById('leadId').value;
        console.log('Enviando formulario con leadId:', leadIdValue);

        if (!leadIdValue || leadIdValue.trim() === '') {
            e.preventDefault();
            alert('Error: No se ha seleccionado un lead válido');
            return false;
        }
    });
});