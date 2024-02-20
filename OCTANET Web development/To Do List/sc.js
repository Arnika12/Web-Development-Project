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
        trashSpan.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashSpan.classList.add("trash-icon");
        trashSpan.addEventListener("click", function() {
            li.remove(); // Remove the corresponding list item
            saveData();
        });

        // Append trash span to the list item
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

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    //we can display this data using getdata()
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
