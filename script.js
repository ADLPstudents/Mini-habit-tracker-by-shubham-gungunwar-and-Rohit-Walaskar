let habits = [];

function addHabit() {
    let input = document.getElementById('habitInput');
    let habitName = input.value.trim();
    
    if (habitName === '') {
        alert('Please enter a habit name');
        return;
    }
    
    let habit = {
        name: habitName,
        days: []
    };
    
    habits.push(habit);
    input.value = '';
    displayHabits();
    saveHabits();
}

function displayHabits() {
    let list = document.getElementById('habitsList');
    list.innerHTML = '';
    
    for (let i = 0; i < habits.length; i++) {
        let habit = habits[i];
        
        let habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item';
        
        let nameDiv = document.createElement('div');
        nameDiv.className = 'habit-name';
        nameDiv.textContent = habit.name;
        
        let daysDiv = document.createElement('div');
        daysDiv.className = 'habit-days';
        
        let today = new Date();
        let currentDate = new Date(today);
        
        for (let j = 0; j < 30; j++) {
            let dayBox = document.createElement('div');
            dayBox.className = 'day-box';
            dayBox.textContent = currentDate.getDate();
            
            let dateStr = currentDate.toDateString();
            if (habit.days.includes(dateStr)) {
                dayBox.classList.add('checked');
            }
            
            dayBox.onclick = function() {
                toggleDay(i, dateStr, dayBox);
            };
            
            daysDiv.appendChild(dayBox);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteHabit(i);
        };
        
        habitDiv.appendChild(nameDiv);
        habitDiv.appendChild(daysDiv);
        habitDiv.appendChild(deleteBtn);
        
        list.appendChild(habitDiv);
    }
}

function toggleDay(habitIndex, dateStr, dayBox) {
    let habit = habits[habitIndex];
    let index = habit.days.indexOf(dateStr);
    
    if (index === -1) {
        habit.days.push(dateStr);
        dayBox.classList.add('checked');
    } else {
        habit.days.splice(index, 1);
        dayBox.classList.remove('checked');
    }
    saveHabits();
}

function deleteHabit(index) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits.splice(index, 1);
        displayHabits();
        saveHabits();
    }
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

window.onload = function() {
    let saved = localStorage.getItem('habits');
    if (saved) {
        habits = JSON.parse(saved);
        displayHabits();
    }
};

