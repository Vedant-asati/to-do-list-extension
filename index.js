const taskDiv = document.querySelector(".taskList");



//displaying time
// let dateTime = Date.now();
setInterval(displayDate, 1000);
function displayDate() {
    document.getElementById("datetime-local").innerHTML = "Time : " + new Date();
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

    // lastChild = taskList.lastElementChild;
    // while (lastChild) {
    //     taskList.removeChild(lastChild);
    //     lastChild = taskList.lastElementChild;
    // }

    taskArray.forEach((Element, index) => {

        const newTask = document.createElement("div");
        newTask.setAttribute("class", "newTask");


        const taskText = document.createElement("div");
        taskText.setAttribute("class", Element.isDone ? "taskDone" : "taskNotDone");

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
        doneTask.innerHTML = Event.isDone ? "Undo" : "Done";
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
    const placeholderText = document.getElementById("inputText");
    placeholderText.value = "";
}


const editFunction = (id) => {
    const idInt = parseInt(id[0]);
    const placeholderText = document.getElementById("inputText");
    placeholderText.value = taskArray[idInt].name;
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
    Event[idInt].isDone = !Event[idInt].isDone;
    updateView();
    localStorage.setItem("savedData",JSON.stringify(taskArray));

}


document.addEventListener("DOMContentLoaded", () =>{
   const savedData = JSON.parse(localStorage.getItem("savedData"));
   //spread operator to load the page
    if (savedData != null) taskArray = [...savedData];
    updateView();
})



// Add task
document.getElementById("add-btn").addEventListener("click",addTask(false));
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



//setting Reminder




