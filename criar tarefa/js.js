const tasks = [];
function formatarData(data) {
  const partes = data.split('-'); // Supondo que a data esteja no formato 'AAAA-MM-DD'

  if (partes.length !== 3) {
    
    return 'Formato de data inválido';
  }

  const ano = partes[0];
  let mes = partes[1];
  let dia = partes[2];

  // Verificar e adicionar zero à esquerda para meses e dias menores que 10
  if (mes.length === 1) {
    mes = `0${mes}`;
  }

  if (dia.length === 1) {
    dia = `0${dia}`;
  }
  

  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}


function addTask(event) {
  event.preventDefault();

  const dateInput = document.getElementById('taskDate');
  const timeInput = document.getElementById('taskTime');
  const colorInput = document.getElementById('taskColor');
  const input = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (input.value.trim() === '') {
    alert('Por favor, insira uma tarefa.');
    return;
  }

  const date = new Date(dateInput.value);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = timeInput.value.split(':')[0].padStart(2, '0');
  const minute = timeInput.value.split(':')[1].padStart(2, '0');

  const dateTime = `${year}-${month}-${day} ${hour}:${minute}`;
  const color = colorInput.value;
  
  // Verificar se já existe uma tarefa no mesmo dia e hora
  const existingTask = tasks.find(task => task.includes(dateTime));
  if (existingTask) {
    alert('Já existe uma tarefa agendada para este dia e horário.');
    return; // Retorna sem adicionar a tarefa repetida
  }

  const task = `
    <div data-date="${dateTime}" class="task-item" style="background-color: ${color};">
      <button class="hour-text" style="background-color: ${color};">${dateTime}</button>
      <div>Data: ${dateInput.value}</div>
      <div class="agenda-task" style="background-color: ${color};">${input.value}</div>
      <button class="remove-button" onclick="removeTask(this)">Remover</button>
    </div>
  `;
  
  tasks.push(task);

  const li = document.createElement('li');
  li.innerHTML = task;

  taskList.appendChild(li);

  input.value = '';
  updateCalendar();
}

function removeTask(button) {
  const li = button.parentElement;
  const taskList = document.getElementById('taskList');
  const taskIndex = Array.from(taskList.children).indexOf(li);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  taskList.removeChild(li);
  updateCalendar();
}

function updateCalendar() {
  const calendarDiv = document.querySelector('.calendar');
  const taskListItems = document.querySelectorAll('#taskList li');

  const dateMap = new Map();

  taskListItems.forEach(item => {
    const taskDate = new Date(item.querySelector('.hour-text').textContent);
    const year = taskDate.getFullYear();
    const month = (taskDate.getMonth() + 1).toString().padStart(2, '0');
    const day = taskDate.getDate().toString().padStart(2, '0');

    const dateKey = `${year}-${month}-${day}`;

    if (dateMap.has(dateKey)) {
      dateMap.get(dateKey).push(item.innerHTML);
    } else {
      dateMap.set(dateKey, [item.innerHTML]);
    }
  });

  const calendarMonthInput = document.getElementById('calendarMonth');
  const selectedYear = parseInt(calendarMonthInput.value.split('-')[0]);
  const selectedMonthIndex = parseInt(calendarMonthInput.value.split('-')[1]);

  const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex - 1, 1).getDay();
  const selectedLastDay = new Date(selectedYear, selectedMonthIndex, 0).getDate();

  calendarDiv.innerHTML = '';
  calendarDiv.style.gridTemplateColumns = `repeat(7, 1fr)`;

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    emptyDay.textContent = '';
    calendarDiv.appendChild(emptyDay);
  }

  for (let day = 1; day <= selectedLastDay; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    const dateKey = `${selectedYear}-${selectedMonthIndex.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if (dateMap.has(dateKey)) {
      dayElement.classList.add('has-task');
      dayElement.addEventListener('click', (event) => {
        const clickedDayElement = event.target;
        showTasksForDay(selectedYear, selectedMonthIndex, day, dateMap.get(dateKey), clickedDayElement);
      });
    }

    dayElement.textContent = day;
    calendarDiv.appendChild(dayElement);
  }

  const daysInCalendar = firstDayOfMonth + selectedLastDay;
  const daysInWeek = 7;
  const remainingDays = daysInWeek - (daysInCalendar % daysInWeek);

  for (let i = 0; i < remainingDays; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    emptyDay.textContent = '';
    calendarDiv.appendChild(emptyDay);
  }
}

function formatDateTime(year, month, day, hour, minute) {
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function showTasksForDay(year, month, day, tasks) {
  const taskList = document.getElementById('taskList');

  const agendaDetails = document.getElementById('agendaDetails');
  const agendaTitle = document.getElementById('agendaTitle');
  const agenda = document.getElementById('agenda');

  taskList.innerHTML = '';

  agendaTitle.textContent = `Tarefas do dia ${day}/${month}/${year}:`;

  agenda.innerHTML = '';

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0');
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour');

    const dateTimeHour = formatarData(`${year}-${month}-${day}`) + ' ' + `${hourString}`;

    console.log('dateTimeHour:', dateTimeHour); // Adicionando um console.log


    const taskData = tasks.find(task => task.includes(dateTimeHour));
    if (taskData) {
      hourDiv.classList.add('has-task');
      console.log('oi',)
      const hourButton = document.createElement('button');
      hourButton.textContent = `${hourString}:00`;
      hourButton.classList.add('hour-button');
      hourButton.style.backgroundColor = 'none';
      hourButton.style.color = 'white';
      hourButton.style.border = 'none';
      hourButton.style.borderRadius = '5px';
      hourButton.style.cursor = 'pointer';
      hourButton.style.padding = '5px';
      hourButton.style.marginRight = '5px';
      hourButton.onclick = function () {
        showMinutesForHour(dateTimeHour, '#45a049'); // Passando a data e hora para a função
      };

      hourDiv.appendChild(hourButton);
      agenda.appendChild(hourDiv);
    } else {
      const hourButton = document.createElement('button');
      hourButton.textContent = `${hourString}:00`;
      hourButton.classList.add('hour-button');
      hourButton.style.backgroundColor = '#87CEFA';
      hourButton.style.color = 'white';
      hourButton.style.border = 'none';
      hourButton.style.borderRadius = '5px';
      hourButton.style.cursor = 'pointer';
      hourButton.style.padding = '5px';
      hourButton.style.marginRight = '5px';
      hourButton.onclick = function () {
        showMinutesForHour(dateTimeHour, '#87CEFA');
      };

      hourDiv.appendChild(hourButton);
      agenda.appendChild(hourDiv);
    }
  }

  agendaDetails.style.display = 'block';
  hideMinutesAgenda(); // Esconde a agenda de minutos ao mostrar a agenda de horas
}

function showMinutesForHour(dateTime, hourColor) {
  const minutesAgenda = document.getElementById('minutesAgenda');

  minutesAgenda.innerHTML = '';

  const numColumns = 3;
  const numRows = 20;
  const columnWidth = 100 / numColumns;
  const rowHeight = 100 / numRows;

  minutesAgenda.style.gridTemplateColumns = `repeat(${numColumns}, ${columnWidth}%)`;
  minutesAgenda.style.gridTemplateRows = `repeat(${numRows}, ${rowHeight}%)`;
  minutesAgenda.style.alignItems = 'center';

  const hourString = dateTime.split(' ')[1].split(':')[0];
  
  for (let minute = 0; minute < 60; minute++) {
    const minuteString = minute.toString().padStart(2, '0');
    const formattedDate = formatarData(dateTime.split(' ')[0]);
    const dateTimeMinute = `${formattedDate} ${hourString}:${minuteString}`;

    console.log("Checking for:", dateTimeMinute);

    const minuteDiv = document.createElement('div');
    minuteDiv.classList.add('minute');
    const minuteWidth = 100 / numColumns;
    minuteDiv.style.width = `${minuteWidth}%`;

    const minuteColor = hasTaskForDateTime(dateTimeMinute) ? hourColor : '#87CEFA';
    minuteDiv.style.backgroundColor = minuteColor;

    const minuteButton = document.createElement('button');
    minuteButton.textContent = `${hourString}:${minuteString}`;
    minuteButton.classList.add('minute-button');
    minuteButton.style.backgroundColor = minuteColor;
    minuteButton.onclick = function () {
      if (hasTaskForDateTime(dateTimeMinute)) {
        const taskData = tasks.find(task => task.includes(dateTimeMinute));
        // Esconde a lista de minutos antes de fazer qualquer outra coisa
         hideMinutesAgenda();
        
        // Criar um elemento temporário para facilitar o acesso ao conteúdo da tarefa
        const tempElement = document.createElement('div');
        tempElement.innerHTML = taskData;
    
        // Extrair o conteúdo da tarefa usando querySelector
        const taskContent = tempElement.querySelector('.agenda-task').textContent;
    
        // Atualizar os elementos na div de detalhes da tarefa
        const taskTitle = document.getElementById('taskTitle');
        const taskContentDiv = document.getElementById('taskContent');
    
        // Defina o conteúdo dos elementos de detalhes da tarefa
        taskTitle.textContent = dateTimeMinute;
        taskContentDiv.textContent = `Tarefa: ${taskContent}`;
        // Defina a cor de fundo da div de detalhes da tarefa
        const taskColor = tempElement.querySelector('.task-item').style.backgroundColor;
        const taskDetails = document.getElementById('taskDetails');

                // Remova o código de animação anterior e substitua por este:
        let deg = 0;
        const linearGradient = (angle = 0, color1, color2) =>
          `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;

        function animateGradient() {
          const animatedGradient = linearGradient(deg, taskColor, 'white');
          taskDetails.style.background = animatedGradient;
          deg = (deg + 1) % 360;
          requestAnimationFrame(animateGradient);
        }

        animateGradient();

        // Mostrar os detalhes da tarefa
        
        taskDetails.style.display = 'block';
    
        // Definir ação do botão de fechar
        const closeTaskButton = document.getElementById('closeTaskButton');
        closeTaskButton.onclick = function () {
          // Esconder os detalhes da tarefa ao clicar no botão de fechar
          taskDetails.style.display = 'none';
        };
      }else {
        const noTaskMessage = document.createElement('div');
        noTaskMessage.textContent = 'Nenhuma tarefa agendada para este minuto.';
        noTaskMessage.classList.add('minute-no-task');
        minutesAgenda.innerHTML = '';
        minutesAgenda.appendChild(noTaskMessage);
      }
    };

    minuteDiv.appendChild(minuteButton);
    minutesAgenda.appendChild(minuteDiv);
  }

  minutesAgenda.style.display = 'grid';
  hideAgendaDetails();
}


// Função para verificar se existe uma tarefa agendada para a data e hora especificadas
function hasTaskForDateTime(dateTime) {
  const taskData = tasks.find(task => task.includes(dateTime));
  return taskData !== undefined;
}

function toggleCalendar() {
  const calendarDiv = document.querySelector('.calendar');
  if (calendarDiv.style.display === 'grid') {
    calendarDiv.style.display = 'none';
  } else {
    calendarDiv.style.display = 'grid';
  }
}

function hideAgendaDetails() {
  const agendaDetails = document.getElementById('agendaDetails');
  agendaDetails.style.display = 'none';
}

function hideMinutesAgenda() {
  const minutesAgenda = document.getElementById('minutesAgenda');
  minutesAgenda.style.display = 'none';
}

window.onclick = function (event) {
  const agendaDetails = document.getElementById('agendaDetails');
  if (event.target === agendaDetails) {
    hideAgendaDetails();
  }
};

document.getElementById('closeAgendaButton').onclick = hideAgendaDetails;

window.onload = function () {
  updateCalendar();
};
