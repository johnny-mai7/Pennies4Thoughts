// Function to open tab content
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Meditation Timer
let meditationTimer;

function startMeditation() {
    const minutesInput = document.getElementById("meditation-time");
    const minutes = parseInt(minutesInput.value);
    let seconds = minutes * 60;

    let display = document.getElementById("meditation-timer");
    display.textContent = formatTime(seconds);

    clearInterval(meditationTimer); // Clear any existing timer
    meditationTimer = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(meditationTimer);
            display.textContent = "Time's up!";
        } else {
            seconds--;
            display.textContent = formatTime(seconds);
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Journaling
document.getElementById("save-entry-btn").addEventListener("click", saveJournalEntry);

function saveJournalEntry() {
    const journalEntry = document.getElementById("journal-entry").value;
    const currentDate = new Date().toLocaleString();
    const entryItem = document.createElement("li");
    entryItem.textContent = `${currentDate}: ${journalEntry}`;
    document.getElementById("journal-list").appendChild(entryItem);
    localStorage.setItem(currentDate, journalEntry);
    alert("Journal entry saved!");
}

// Daily Routines
function addRoutineTask() {
    const taskInput = document.getElementById("routine-task");
    const taskName = taskInput.value.trim();
    
    if (taskName !== "") {
        const taskList = document.getElementById("routine-list");
        const newTask = document.createElement("li");
        newTask.innerHTML = `<input type="checkbox" onchange="toggleTaskStatus(this)"> ${taskName}`;
        taskList.appendChild(newTask);
        taskInput.value = "";
    }
}

function toggleTaskStatus(checkbox) {
    if (checkbox.checked) {
        checkbox.parentElement.style.textDecoration = "line-through";
    } else {
        checkbox.parentElement.style.textDecoration = "none";
    }
}

// Initialize map to store unique habit names and their corresponding counts
const habitMap = new Map();

// Track Habits
function trackHabit() {
    const habitName = document.getElementById("habit-name").value.trim();
    const habitAction = document.getElementById("habit-action").value;
    const habitTracker = document.getElementById("habit-tracker");

    if (habitName !== "") {
        // Check if the habit is not already tracked
        if (!habitMap.has(habitName)) {
            // Create a new habit entry
            let habitEntry = document.createElement("div");
            let habitButton = document.createElement("button");

            // Initialize counters for this habit
            let createCounter = 1;
            let breakCounter = 1;

            // Determine emoji based on habit action
            if (habitAction === "create") {
                habitEntry.textContent = `${habitName} ✅ ${createCounter}`;
                habitEntry.classList.add("habit-entry", "create-habit");
            } else {
                habitEntry.textContent = `${habitName} ❌ ${breakCounter}`;
                habitEntry.classList.add("habit-entry", "break-habit");
            }

            habitButton.textContent = "+";
            habitButton.classList.add("habit-button");
            habitButton.onclick = () => {
                if (habitAction === "create") {
                    createCounter++;
                    habitEntry.textContent = `${habitName} ✅ ${createCounter}`;
                    if (createCounter === 21) {
                        alert(`Congratulations! You've tracked the habit "${habitName}" for 21 days. Keep up the good work!`);
                    }
                } else {
                    breakCounter++;
                    habitEntry.textContent = `${habitName} ❌ ${breakCounter}`;
                    if (breakCounter === 21) {
                        alert(`Congratulations! You've tracked the habit "${habitName}" for 21 days. Keep up the good work!`);
                    }
                }
            };

            // Append the habit entry and button to the habit tracker
            habitTracker.appendChild(habitEntry);
            habitTracker.appendChild(habitButton);

            // Add habit and its counters to the map
            habitMap.set(habitName, { createCounter, breakCounter });

            // Clear input fields after adding a habit
            document.getElementById("habit-name").value = "";
            document.getElementById("habit-action").value = "";
        } else {
            console.log("You've already tracked this habit. Please enter a new one.");
        }
    }
}


// Array of motivational quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "With the new day comes new strength and new thoughts. - Eleanor Roosevelt",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "The only limit is your mind.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "The harder you work, the luckier you get.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Your only limit is you.",
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "The only person you should try to be better than is the person you were yesterday.",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Believe you can and you're halfway there.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "The only limit is your mind.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "The harder you work, the luckier you get."
];


// Function to display a random quote
function displayRandomQuote() {
    const quoteText = document.getElementById("quote-text");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
}

// Call displayRandomQuote() when the page loads
document.addEventListener("DOMContentLoaded", function() {
    displayRandomQuote();
});

// Function to save a quote
function saveQuote() {
    const quoteText = document.getElementById("quote-text").textContent;
    localStorage.setItem("savedQuote", quoteText);
    alert("Quote saved!");
}
