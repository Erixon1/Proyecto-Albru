document.getElementById('btn-agregar').addEventListener('click', function () {
    const data = {
        lead: document.getElementById('input-lead').value,
        contacto: document.getElementById('select-contacto').value,
        campania: document.getElementById('select-campania').value,
        canal: document.getElementById('select-canal').value
    };
    localStorage.setItem('leadData', JSON.stringify(data));
    window.location.href = "derivacion.html";
});