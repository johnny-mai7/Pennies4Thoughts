function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
  
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  
    // Deactivate all tablinks
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
  
    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";
  
    // Activate the button that opened the tab
    evt.currentTarget.classList.add("active");
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var taskText = taskInput.value;

    // Check if the input field is not empty
    if (taskText.trim() !== "") {
        // Create a new list item
        var listItem = document.createElement("li");

        // Create a checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = function () {
            // Toggle strikethrough style when checkbox is clicked
            listItem.style.textDecoration = checkbox.checked ? "line-through" : "none";
        };

        // Create a label for the task text
        var label = document.createElement("label");
        label.textContent = taskText;

        // Append the checkbox and label to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        // Append the new list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";
    } else {
        // Alert the user if the input field is empty
        alert("Please enter a task.");
    }
}

function addWorkout() {
    // Get workout data from input fields
    var workoutName = document.getElementById("workoutName").value;
    var workoutSets = document.getElementById("workoutSets").value;
    var workoutReps = document.getElementById("workoutReps").value;
    var workoutWeight = document.getElementById("workoutWeight").value;

    // Get current date and time
    var currentDate = new Date();
    var dateTimeString = currentDate.toLocaleString();

    // Create workout entry string
    var workoutEntry = workoutName + ', Sets: ' + workoutSets + ', Reps: ' + workoutReps + ', Weight: ' + workoutWeight;

    // Create list item for workout history
    var workoutItem = document.createElement('li');
    workoutItem.innerText = workoutEntry + ' - ' + dateTimeString;

    // Append workout item to workout history
    var workoutHistory = document.getElementById('workout-history');
    workoutHistory.appendChild(workoutItem);

    // Clear input fields
    document.getElementById("workoutName").value = '';
    document.getElementById("workoutSets").value = '';
    document.getElementById("workoutReps").value = '';
    document.getElementById("workoutWeight").value = '';
}



function addCardio() {
    // Get cardio data from input fields
    var cardioDuration = document.getElementById("cardioDuration").value;
    var cardioDistance = document.getElementById("cardioDistance").value;

    // Get current date and time
    var currentDate = new Date();
    var dateTimeString = currentDate.toLocaleString();

    // Create cardio entry string
    var cardioEntry = 'Duration: ' + cardioDuration + ' minutes, Distance: ' + cardioDistance + ' miles';

    // Create list item for cardio history
    var cardioItem = document.createElement('li');
    cardioItem.innerText = cardioEntry + ' - ' + dateTimeString;

    // Append cardio item to cardio history
    var cardioHistory = document.getElementById('cardio-history');
    cardioHistory.appendChild(cardioItem);

    // Clear input fields
    document.getElementById("cardioDuration").value = '';
    document.getElementById("cardioDistance").value = '';
}


function calculateRecommendedSleep() {
    var wakeUpTime = document.getElementById("wakeUpTime").valueAsDate;
    var sleepTime = document.getElementById("sleepTime").valueAsDate;
    var age = parseInt(document.getElementById("age").value);

    // Calculate the time difference in hours
    var timeDifference = (sleepTime.getTime() - wakeUpTime.getTime()) / (1000 * 3600);

    // Calculate recommended sleep based on age
    var recommendedSleep;
    if (age >= 18 && age <= 64) {
        recommendedSleep = 7; // Adults (18-64) need 7-9 hours of sleep
    } else if (age >= 65) {
        recommendedSleep = 7; // Older adults (65+) need 7-8 hours of sleep
    } else {
        recommendedSleep = 9; // Children and teenagers (6-17) need 9-11 hours of sleep
    }

    // Display the recommended sleep hours
    var recommendedSleepDiv = document.getElementById("recommendedSleep");
    recommendedSleepDiv.innerHTML = "Recommended Sleep Hours: " + recommendedSleep + " hours";
}

function trackSleep() {
    var actualSleepHours = parseFloat(document.getElementById("actualSleepHours").value);

    // Get the current date and time
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString();
    var formattedTime = currentDate.toLocaleTimeString();

    // Display the tracked sleep hours with date and time
    var trackedSleepDiv = document.getElementById("trackedSleepHours");
    trackedSleepDiv.innerHTML = "Tracked Sleep Hours: " + actualSleepHours + " hours (Recorded at " + formattedDate + " " + formattedTime + ")";
}

// JavaScript to track diet and calculate calorie needs
var foodData = []; // Array to store tracked foods

function trackDiet() {
    var foodName = document.getElementById("foodName").value;
    var calories = parseFloat(document.getElementById("calories").value);
    var meal = document.getElementById("meal").value;

    // Get the current date and time
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString();
    var formattedTime = currentDate.toLocaleTimeString();

    // Create a new food object
    var foodItem = {
        name: foodName,
        calories: calories,
        meal: meal,
        date: formattedDate,
        time: formattedTime
    };

    // Add the food object to the foodData array
    foodData.push(foodItem);

    // Display the tracked food with calories, meal, and date/time
    var foodList = document.getElementById("foodList");
    var listItem = document.createElement("li");
    listItem.textContent = foodName + " - " + calories + " calories - " + meal + " (Recorded at " + formattedDate + " " + formattedTime + ")";
    foodList.appendChild(listItem);

    // Clear input fields after adding food
    document.getElementById("foodName").value = "";
    document.getElementById("calories").value = "";
}

function calculateCalories() {
    // Calculate total calories consumed for each meal
    var totalCalories = {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0
    };

    // Loop through foodData array to calculate total calories for each meal
    foodData.forEach(function(foodItem) {
        totalCalories[foodItem.meal] += foodItem.calories;
    });

    // Calculate total calories for the day
    var totalCaloriesForDay = totalCalories.breakfast + totalCalories.lunch + totalCalories.dinner + totalCalories.snack;

    // Get user inputs for weight goal, weight change rate, and activity level
    var weightGoal = document.getElementById("weightGoal").value;
    var weightChangeRate = parseFloat(document.getElementById("weightChangeRate").value);
    var activityLevel = document.getElementById("activityLevel").value;

    // Calculate total daily calorie intake needed based on weight goal, weight change rate, and activity level
    var totalCaloriesNeeded = 0;
    if (weightGoal === "lose") {
        totalCaloriesNeeded = totalCaloriesForDay - (weightChangeRate * 500); // 500 calories deficit per day for 1 lb weight loss per week
    } else if (weightGoal === "gain") {
        totalCaloriesNeeded = totalCaloriesForDay + (weightChangeRate * 500); // 500 calories surplus per day for 1 lb weight gain per week
    }

    // Create HTML elements to display the results
    var resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Clear previous results

    // Total calories consumed
    var totalCaloriesConsumedHTML = "<p>Total Calories Consumed:</p>";
    totalCaloriesConsumedHTML += "<ul>";
    totalCaloriesConsumedHTML += "<li>Breakfast: " + totalCalories.breakfast + " calories</li>";
    totalCaloriesConsumedHTML += "<li>Lunch: " + totalCalories.lunch + " calories</li>";
    totalCaloriesConsumedHTML += "<li>Dinner: " + totalCalories.dinner + " calories</li>";
    totalCaloriesConsumedHTML += "<li>Snack: " + totalCalories.snack + " calories</li>";
    totalCaloriesConsumedHTML += "<li>Total Calories for the Day: " + totalCaloriesForDay + " calories</li>";
    totalCaloriesConsumedHTML += "</ul>";
    resultsContainer.innerHTML += totalCaloriesConsumedHTML;

    // Total daily calorie intake needed
    var totalCaloriesNeededHTML = "<p>Total Daily Calorie Intake Needed: " + totalCaloriesNeeded + " calories</p>";
    resultsContainer.innerHTML += totalCaloriesNeededHTML;
}

let minutes = 25; // Initial minutes for pomodoro
let seconds = 0; // Initial seconds for pomodoro
let isRunning = false; // Flag to indicate whether the timer is running
let intervalId; // Interval ID for the timer

function startPomodoro() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(updateTimer, 1000); // Update timer every second
    }
}

function stopPomodoro() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId); // Stop the timer
    }
}

function resetPomodoro() {
    stopPomodoro();
    minutes = 25; // Reset minutes to 25
    seconds = 0; // Reset seconds to 0
    updateDisplay();
}

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            // Pomodoro completed, stop the timer
            stopPomodoro();
            alert("Pomodoro completed!");
            return;
        } else {
            // Decrement minutes and set seconds to 59
            minutes--;
            seconds = 59;
        }
    } else {
        // Decrement seconds
        seconds--;
    }
    updateDisplay();
}

function updateDisplay() {
    // Display the current time in minutes and seconds
    let timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
