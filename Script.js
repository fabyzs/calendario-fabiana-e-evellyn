document.addEventListener('DOMContentLoaded', function() {
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Lista de feriados (formato: 'mês-dia')
    const holidays = {
        '0-1': 'Confraternização Universal',        // 1 de Janeiro
        '3-21': 'Tiradentes',                        // 21 de Abril
        '4-1': 'Dia do Trabalho',                    // 1 de Maio
        '8-7': 'Independência do Brasil',            // 7 de Setembro
        '10-15': 'Proclamação da República',         // 15 de Novembro
        '11-25': 'Natal'                             // 25 de Dezembro
    };

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        calendarDays.innerHTML = '';
        monthYear.textContent = `${months[month]} ${year}`;

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adiciona os espaços em branco antes do primeiro dia do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }

        // Adiciona os dias do mês ao calendário
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            // Verifica se o dia é um feriado
            const holidayKey = `${month}-${day}`;
            if (holidays[holidayKey]) {
                dayDiv.classList.add('holiday');  // Adiciona a classe para feriados
                dayDiv.title = holidays[holidayKey];  // Tooltip com o nome do feriado
            }

            // Destaca o dia atual
            if (
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
            ) {
                dayDiv.classList.add('current-day');
            }

            calendarDays.appendChild(dayDiv);
        }
    }

    prevButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});
