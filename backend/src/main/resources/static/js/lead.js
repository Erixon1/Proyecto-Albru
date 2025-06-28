document.addEventListener('DOMContentLoaded', () => {
    const btnAgregarLeads = document.getElementById('openModalBtn');
    const modalImportar = document.getElementById('importModal');
    const botonesAsignar = document.querySelectorAll('.btn-edit');
    const modalAsignar = document.getElementById('customModal');
    const overlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContentAsignar = modalAsignar?.querySelector('.modal-content');

    btnAgregarLeads?.addEventListener('click', e => {
        e.preventDefault();
        modalImportar?.classList.add('show');
    });

    window.cerrarModal = () => {
        modalImportar?.classList.remove('show');
    };

    botonesAsignar.forEach(boton => {
        boton.addEventListener('click', e => {
            e.preventDefault();
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
});
