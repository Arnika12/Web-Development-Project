const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("You must write something !");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";      // It clears the input field after hitting the add button
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") 
    {
        e.target.classList.toggle("checked");
        saveData();
    } 
    else if (e.target.tagName === "SPAN") 
    {
        e.target.parentElement.remove();
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