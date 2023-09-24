// const taskDiv = document.querySelector(".taskList");


//displaying time on page load
window.onload = function() {
    const now = new Date();
    const dateString = now.toString().replace(/\sGMT.+/, '');
    document.getElementById("datetime-local").innerHTML = "Time : " + dateString;
};
//displaying time
// let dateTime = Date.now();
setInterval(displayDate, 1000);
function displayDate() {
    const now = new Date();
    const dateString = now.toString().replace(/\sGMT.+/, '');
    document.getElementById("datetime-local").innerHTML = "Time : " + dateString;
}




// Array which stores data
var taskArray = [];
// Getting data from the user into the array of objects => taskList

/*
document.getElementById("add-btn").addEventListener("click", getData);
function getData() {

    let taskObject = {
        name: document.getElementById("inputText").value,
        due: document.getElementById("reminderDateTime").value,
        priority: document.getElementById("priority").value,
        isDone: false
    }
    console.log(taskArray);
    taskArray.push(taskObject);
    let linkText = document.getElementById("taskLink").value;
*/

const updateView = () => {
    const taskList = document.getElementById("taskList");

    lastChild = taskList.lastElementChild;
    while (lastChild) {
        taskList.removeChild(lastChild);
        lastChild = taskList.lastElementChild;
    }

    taskArray.forEach((Element, index) => {

        const newTask = document.createElement("div");
        newTask.setAttribute("class", "newTask");


        const taskText = document.createElement("div");
        taskText.setAttribute("class", Element.isDone ? "taskDone" : "taskNotDone");
        taskText.innerHTML = (index + 1) + ". " + Element.name;

        const taskLink = document.createElement("div");
        taskLink.setAttribute("class", "taskLink");
        taskLink.innerHTML = (index + 1) + ". " + Element.b;

        const taskReminderTime = document.createElement("div");
        taskReminderTime.setAttribute("class", "taskReminderTime");
        taskReminderTime.innerHTML = (index + 1) + ". " + Element.c;

        const taskPriority = document.createElement("div");
        taskPriority.setAttribute("class", "taskPriority");
        taskPriority.innerHTML = (index + 1) + ". " + Element.d;



        const taskControls = document.createElement("div");
        taskControls.setAttribute("class", "newTaskControls");


        const editTask = document.createElement("button");
        editTask.innerHTML = "Edit";
        editTask.setAttribute("id", index + "edit");
        editTask.setAttribute("class", "taskEditButton taskButton");
        editTask.addEventListener("click", function (event) {
            editFunction(event.target.id);
        })

        const deleteTask = document.createElement("button");
        deleteTask.innerHTML = "Delete";
        deleteTask.setAttribute("id", index + "delete");
        deleteTask.setAttribute("class", "taskDeleteButton taskButton");
        deleteTask.addEventListener("click", function (event) {
            deleteFunction(event.target.id);
        })

        const doneTask = document.createElement("button");
        doneTask.innerHTML = Element.isDone ? "Undo" : "Done";
        doneTask.setAttribute("id", index + "done");
        doneTask.setAttribute("class", "taskDoneButton taskButton");
        doneTask.addEventListener("click", function (event) {
            doneFunction(event.target.id);
        })

        taskControls.appendChild(doneTask);
        taskControls.appendChild(deleteTask);
        taskControls.appendChild(editTask);

        newTask.appendChild(taskControls);
        newTask.appendChild(taskText);
        newTask.appendChild(taskLink);
        newTask.appendChild(taskReminderTime);
        newTask.appendChild(taskPriority);
        taskList.appendChild(newTask);

    }
    )


}

const addTask = (isDone) => {
    const name = document.getElementById("inputText").value;
    const b = document.getElementById("taskLink").value;
    const c = document.getElementById("reminderDateTime").value;
    const d = document.getElementById("priority").value;
    if (name === null || name.trim() === "") return;
    taskArray.push({ name, isDone, b, c, d });
    localStorage.setItem("savedData", JSON.stringify(taskArray));
    updateView();
    const placeholderText1 = document.getElementById("inputText");
    const placeholderText2 = document.getElementById("taskLink");
    placeholderText1.value = "";
    placeholderText2.value = "";
    setReminder();
}


const editFunction = (id) => {
    const idInt = parseInt(id[0]);

    const placeholderText1 = document.getElementById("inputText");
    placeholderText1.value = taskArray[idInt].name;

    const placeholderText2 = document.getElementById("taskLink");
    placeholderText2.value = taskArray[idInt].b;

    const dateTimeValue = document.getElementById("reminderDateTime");
    dateTimeValue.value = taskArray[idInt].c;

    const priorityValue = document.getElementById("priority");
    priorityValue.value = taskArray[idInt].d;


    taskArray.splice(idInt, 1);
    localStorage.setItem("savedData", JSON.stringify(taskArray));
    updateView();
}

const deleteFunction = (id) => {
    const idInt = parseInt(id[0]);
    taskArray.splice(idInt, 1);
    localStorage.setItem("savedData", JSON.stringify(taskArray));
    updateView();
}

const doneFunction = (id) => {
    const idInt = parseInt(id[0]);
    taskArray[idInt].isDone = !taskArray[idInt].isDone;
    localStorage.setItem("savedData", JSON.stringify(taskArray));
    updateView();
}


document.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("savedData"));
    //spread operator to load the page
    if (savedData != null) taskArray = [...savedData];
    updateView();
})



// Add task
document.getElementById("add-btn").addEventListener("click", function () {
    addTask(false)
});
// document.getElementById("inputText").addEventListener("keydown", function(ev){
// if(ev.key = "Enter") addTask(false);
// }
// );



// Clear tasks
// document.getElementById("clr-btn").addEventListener("click",()=>{
//     localStorage.clear();
//     taskArray =[];
//     updateView();
// });




////////////////////////////////////////
//setting Reminder

function setReminder() {
    // get the selected reminder time from the datetime-local input
    const reminderInput = document.getElementById('reminderDateTime').value;

    // convert the input string to a Date object
    const reminderTime = new Date(reminderInput);

    // function to check if it's time for  the reminder
    function checkTime() {
        const now = new Date();
        if (now >= reminderTime) {

            // display the reminder message
            var reminderSound = new Audio('sound.mp3');
            reminderSound.play();
            alert('Reminder: Do something important!');



            // clear the interval to stop checking for reminders
            clearInterval(reminderInterval);
        }
    }

    // set the reminder interval to check every minute
    const reminderInterval = setInterval(checkTime, 1000);
    // reminderInterval;
}
