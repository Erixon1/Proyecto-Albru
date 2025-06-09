document.addEventListener("DOMContentLoaded", function () {
            const menu = document.getElementById("menubar");
            const menuIcon = document.getElementById("menuIcon");
            const iframe = document.getElementById("contenidoFrame");

            function showMenu() {
                menu.classList.add("visible");
                menuIcon.classList.add("active");
            }

            function hideMenu() {
                menu.classList.remove("visible");
                menuIcon.classList.remove("active");
            }

            menuIcon.addEventListener("click", function (event) {
                event.stopPropagation();
                menu.classList.toggle("visible");
                menuIcon.classList.toggle("active");
            });

            menu.addEventListener("mouseleave", function () {
                hideMenu();
            });

            document.addEventListener("mousemove", function (event) {
                if (event.clientX < 50) {
                    showMenu();
                }
            });

            document.addEventListener("click", function (event) {
                const isClickInsideMenu = menu.contains(event.target);
                const isClickOnIcon = menuIcon.contains(event.target);
                if (!isClickInsideMenu && !isClickOnIcon) {
                    hideMenu();
                }
            });

            window.cargarPagina = function (pagina) {
                iframe.src = pagina;
                hideMenu();
            };
        });