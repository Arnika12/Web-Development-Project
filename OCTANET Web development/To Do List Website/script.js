const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something !");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        // Create span for trash icon
        let trashSpan = document.createElement("span");
        trashSpan.innerHTML = '<i class="fas fa-trash"></i>';
        trashSpan.classList.add("trash-icon");
        trashSpan.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent event bubbling
            li.remove(); // Remove the corresponding list item
            saveData();
        });

        // Create span for edit icon
        let editSpan = document.createElement("span");
        editSpan.innerHTML = '<i class="fas fa-edit"></i>';
        editSpan.classList.add("edit-icon");
        editSpan.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent event bubbling
            editTask(li);
        });

        // Append trash span and edit span to the list item
        li.appendChild(editSpan);
        li.appendChild(trashSpan);

        // Append list item to the list container
        listContainer.appendChild(li);
    }

    inputBox.value = ""; // It clears the input field after hitting the add button
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle the checked class for strikethrough effect
        saveData();
    }
});

function editTask(task) {
    let currentText = task.textContent;
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText.trim();
    inputField.classList.add("edit-input");

    // Replace task text with input field
    task.textContent = "";
    task.appendChild(inputField);
    inputField.focus();

    // Event listener to save edited task on Enter key press
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            // Save the edited task
            task.textContent = inputField.value;
            // Re-append edit and trash icons
            let editSpan = document.createElement("span");
            editSpan.innerHTML = '<i class="fas fa-edit"></i>';
            editSpan.classList.add("edit-icon");
            editSpan.addEventListener("click", function(event) {
                event.stopPropagation(); // Prevent event bubbling
                editTask(task);
            });
            task.appendChild(editSpan);
            let trashSpan = document.createElement("span");
            trashSpan.innerHTML = '<i class="fas fa-trash"></i>';
            trashSpan.classList.add("trash-icon");
            trashSpan.addEventListener("click", function(event) {
                event.stopPropagation(); // Prevent event bubbling
                task.remove(); // Remove the corresponding list item
                saveData();
            });
            task.appendChild(trashSpan);
            saveData();
        }
    });
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    //we can display this data using getdata()
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

const clearAllButton = document.getElementById("clear-all-button");

clearAllButton.addEventListener("click", function() {
    listContainer.innerHTML = ""; // Clear all tasks from the list
    localStorage.removeItem("data"); // Clear the saved data from localStorage
});
