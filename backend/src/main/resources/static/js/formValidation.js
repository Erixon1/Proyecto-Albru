document.addEventListener('DOMContentLoaded', function() {
    const validationTimeInput = document.getElementById('validationTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    validationTimeInput.value = `${hours}:${minutes}`;
});
document.querySelector('form').addEventListener('submit', function(event) {
    const mailInput = document.getElementById('mail');
    const mailValue = mailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(mailValue)) {
        alert('Por favor, introduce un correo electrónico válido.');
        event.preventDefault(); // Evita que el formulario se envíe
    }
});
document.getElementById('dni').addEventListener('input', function() {
    if (this.value.length > 8) {
        this.value = this.value.slice(0, 8);
    }
});
document.querySelector('form').addEventListener('submit', function(event) {
    if (!confirm('¿Estás seguro de que deseas enviar este formulario?')) {
        event.preventDefault(); // Evita el envío si el usuario cancela
    }
});