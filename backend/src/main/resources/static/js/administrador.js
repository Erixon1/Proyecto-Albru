// Estado de la aplicación
        const state = {
            currentTime: new Date(),
            startTime: '--:--',
            endTime: '--:--',
            breaks: [],
            activeBreak: null,
            attendanceData: [
                { day: 'Lunes', status: 'present', hours: 8 },
                { day: 'Martes', status: 'present', hours: 7.5 },
                { day: 'Miércoles', status: 'late', hours: 6 },
                { day: 'Jueves', status: 'present', hours: 8 },
                { day: 'Viernes', status: 'absent', hours: 0 },
                { day: 'Sábado', status: 'off', hours: 0 },
                { day: 'Domingo', status: 'off', hours: 0 }
            ],
            menuActive: false
        };

        // Función para formatear la hora
        function formatTime(date) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        }

        // Función para actualizar la hora actual
        function updateCurrentTime() {
            state.currentTime = new Date();
            document.getElementById('current-hours').textContent = 
                state.currentTime.getHours().toString().padStart(2, '0');
            document.getElementById('current-minutes').textContent = 
                state.currentTime.getMinutes().toString().padStart(2, '0');
            
            // Actualizar la fecha
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            document.getElementById('current-date').textContent = 
                state.currentTime.toLocaleDateString('es-ES', options);
        }

        // Función para manejar el inicio del día
        function handleStartDay() {
            state.startTime = formatTime(new Date());
            state.endTime = '--:--';
            state.breaks = [];
            state.activeBreak = null;
            
            document.getElementById('start-time').textContent = state.startTime;
            document.getElementById('end-time').textContent = state.endTime;
            document.getElementById('breaks-section').innerHTML = '<h3>Descansos hoy</h3>';
            
            updateActionButtons();
        }

        // Función para manejar el final del día
        function handleEndDay() {
            state.endTime = formatTime(new Date());
            document.getElementById('end-time').textContent = state.endTime;
            updateActionButtons();
        }

        // Función para iniciar un descanso
        function handleStartBreak() {
            const newBreak = {
                start: formatTime(new Date()),
                end: ''
            };
            state.breaks.push(newBreak);
            state.activeBreak = newBreak;
            
            renderBreaks();
            updateActionButtons();
        }

        // Función para finalizar un descanso
        function handleEndBreak() {
            if (state.activeBreak) {
                state.activeBreak.end = formatTime(new Date());
                state.activeBreak = null;
                
                renderBreaks();
                updateActionButtons();
            }
        }

        // Función para renderizar los descansos
        function renderBreaks() {
            const breaksSection = document.getElementById('breaks-section');
            breaksSection.innerHTML = '<h3>Descansos hoy</h3>';
            
            if (state.breaks.length === 0) return;
            
            state.breaks.forEach((brk, index) => {
                const breakItem = document.createElement('div');
                breakItem.className = 'break-item';
                
                const breakTime = document.createElement('span');
                breakTime.className = 'break-time';
                breakTime.textContent = `${brk.start} - ${brk.end || 'En progreso'}`;
                
                const breakDuration = document.createElement('span');
                breakDuration.className = 'break-duration';
                
                if (brk.end) {
                    const startDate = new Date(`2000-01-01T${brk.start}:00`);
                    const endDate = new Date(`2000-01-01T${brk.end}:00`);
                    const duration = Math.floor((endDate - startDate) / 60000);
                    breakDuration.textContent = `${duration} min`;
                }
                
                breakItem.appendChild(breakTime);
                breakItem.appendChild(breakDuration);
                breaksSection.appendChild(breakItem);
            });
        }

        // Función para actualizar los botones de acción
        function updateActionButtons() {
            const actionButtons = document.getElementById('action-buttons');
            
            if (state.startTime === '--:--') {
                actionButtons.innerHTML = `
                    <button class="btn-start" onclick="handleStartDay()">
                        <ion-icon name="time-outline"></ion-icon> Marcar Entrada
                    </button>
                `;
            } else if (state.endTime === '--:--') {
                if (!state.activeBreak) {
                    actionButtons.innerHTML = `
                        <button class="btn-break" onclick="handleStartBreak()">
                            <ion-icon name="cafe-outline"></ion-icon> Iniciar Descanso
                        </button>
                        <button class="btn-end" onclick="handleEndDay()">
                            <ion-icon name="exit-outline"></ion-icon> Marcar Salida
                        </button>
                    `;
                } else {
                    actionButtons.innerHTML = `
                        <button class="btn-break" onclick="handleEndBreak()">
                            <ion-icon name="cafe-outline"></ion-icon> Terminar Descanso
                        </button>
                        <button class="btn-end" onclick="handleEndDay()">
                            <ion-icon name="exit-outline"></ion-icon> Marcar Salida
                        </button>
                    `;
                }
            } else {
                actionButtons.innerHTML = `
                    <div class="day-completed">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Jornada completada</span>
                    </div>
                `;
            }
        }

        // Función para alternar el menú
        function toggleMenu() {
            state.menuActive = !state.menuActive;
            
            const sidebar = document.querySelector('.sidebar');
            const menuToggle = document.querySelector('.menuToggle');
            const mainContent = document.querySelector('.main-content');
            
            if (state.menuActive) {
                sidebar.classList.add('active');
                menuToggle.classList.add('active');
                mainContent.classList.add('menu-active');
            } else {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
                mainContent.classList.remove('menu-active');
            }
        }

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            // Configurar la hora actual
            updateCurrentTime();
            setInterval(updateCurrentTime, 60000);
            
            // Configurar la fecha actual
            updateCurrentTime();
            
            // Configurar los botones de acción iniciales
            updateActionButtons();
        });