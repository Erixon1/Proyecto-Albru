document.addEventListener("DOMContentLoaded", function () {
    // Mostrar datos en modal al hacer clic en "Atender"
    const atenderButtons = document.querySelectorAll(".btn-edit");

    atenderButtons.forEach(button => {
        button.addEventListener("click", function () {
            const celular = this.getAttribute("data-lead-celular") || '';
            const celularAlt = this.getAttribute("data-lead-celular-alt") || '';
            const fecha = this.closest("tr").children[2].innerText || '';
            const estado = this.closest("tr").children[3].innerText || '';

            document.getElementById("leadNumero").textContent = celular;
            document.getElementById("leadAltNumero").textContent = celularAlt;
            document.getElementById("leadFecha").textContent = fecha;
            document.getElementById("leadEstado").textContent = estado;

            document.getElementById("modalAtenderLead").style.display = "flex";
        });
    });

    // Cerrar modal
    document.getElementById("closeAtenderLead").addEventListener("click", function () {
        document.getElementById("modalAtenderLead").style.display = "none";
    });

    document.getElementById("overlayAtenderLead").addEventListener("click", function () {
        document.getElementById("modalAtenderLead").style.display = "none";
    });

    // Validación del formulario
    const form = document.getElementById("formAtencionLead");
    const inputs = form.querySelectorAll("input, textarea, select");

    // Validar cada campo en tiempo real
    inputs.forEach(input => {
        input.addEventListener("input", () => validateInput(input));
    });

    function validateInput(input) {
        const errorMsg = input.nextElementSibling;
        if (!input.checkValidity()) {
            input.classList.add("invalid");
            if (input.validity.valueMissing) {
                errorMsg.textContent = "Este campo es obligatorio.";
            } else if (input.validity.patternMismatch) {
                errorMsg.textContent = "Formato inválido.";
            } else {
                errorMsg.textContent = "Dato incorrecto.";
            }
        } else {
            input.classList.remove("invalid");
            errorMsg.textContent = "";
        }
    }

    // Validación final al enviar
    form.addEventListener("submit", function (e) {
        let isValid = true;
        inputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity()) isValid = false;
        });

        const generalError = document.getElementById("form-error-msg");
        if (!isValid) {
            e.preventDefault();
            generalError.textContent = "Corrija los errores antes de enviar.";
        } else {
            generalError.textContent = "";
        }
    });
});