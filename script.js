// It will get the last key stored in local storage and increment it by 1, if empty start with 1
let key = localStorage.length ? parseInt(Object.keys(localStorage).pop()) + 1 : 1;
       
// This function is used to store task in local Storage
function displayTask() {
    let task = document.getElementById("task");
    task.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && task.value.trim() !== "") { // trim() will remove all the whitespaces from left and Right
            // task.value gives value given by the user which is extracted from the task variable
            localStorage.setItem(key, task.value);
            appendTask(key, task.value); // Separate function for appending paragraph tag
            key++; 
            task.value = ""; // Cleaning the input tag after execution
        }
    });
}

// This function is used to add task string to paragraph tag
function appendTask(key, value) {
    let ptag = document.createElement("p");
    ptag.textContent = key + ". " + value;
    ptag.setAttribute("data-key", key); // Assign a unique key attribute to each task
    let div = document.getElementById("main-container");
    div.appendChild(ptag);
}

// This is used in order to remain the paragraphs tag intact ever after refreshing of tab
window.onload = () => {
    let keys = Object.keys(localStorage).map(Number); // Object.keys will get all the keys stored in local storage and map(Number) will convert them to numbers(By default string)
    keys.sort((a, b) => a - b); // By Default keys get in random order so we need to sort them by own

    for (let i = 0; i < keys.length; i++) {
        let storedKey = keys[i]; // We have an array of keys and now we are accessing particular key 
        let storedValue = localStorage.getItem(storedKey); // Getting the key - value
        appendTask(storedKey, storedValue); // Again appending whenever window refreshes
    }

    displayTask(); // Calling Display function to ensure non-deleted items should appear even after refresh
    removeTask(); // Calling Delete function to ensure deleted items would not appear after refresh
}

// This function is used to remove particular task guided by the user
function removeTask() {
    let task = document.getElementById("deleteTask");
    task.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && task.value.trim() !== "") {
            let taskKey = parseInt(task.value); // Convert task value to Integer (By default it is string)
            // If key is available or valid
            if (localStorage.getItem(taskKey)) {
                localStorage.removeItem(taskKey); // Remove the key-value from local Storage
                removeElement(taskKey); // Remove task element from DOM
            } else { // If not
                alert("Task not Found!");
            }
            task.value = ""; // Clear input field after removal
        }
    });
}

function removeElement(key) {
    let taskElement = document.querySelector(`p[data-key='${key}']`); // Select the element with the matching key
    if (taskElement) {
        taskElement.remove(); // Remove the task element from DOM
    }
}