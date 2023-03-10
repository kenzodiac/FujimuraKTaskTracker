//importing functions from localStorage.js to enable favorites functionality
import { SaveItemToLocalStorage, GetLocalStorage, RemoveFromLocalStorage } from "./localStorage.js";

//DECLARE VARIABLES FOR LINKING HTML TO JAVASCRIPT
//counters for task type
let toDoCounter = document.getElementById("toDoCounter");
let inProgressCounter = document.getElementById("inProgressCounter");
let completedCounter = document.getElementById("completedCounter");

//staging area
let toDoStaging = document.getElementById("toDoStaging");
let inProgressStaging = document.getElementById("inProgressStaging");
let completedStaging = document.getElementById("completedStaging");

//new task btn
let addNewTaskBtn = document.getElementById("addNewTaskBtn");

//modal input fields
let nameInput = document.getElementById("nameInput");
let descriptionInput = document.getElementById("descriptionInput");
let statusInput = document.getElementById("statusInput");
let priorityInput = document.getElementById("priorityInput");
let dateInput = document.getElementById("dateInput");
let idNum = document.getElementById("idNum");
let errorMsg = document.getElementById("errorMsg");

let modalSave = document.getElementById("modalSave");

let modalCloseBtn = document.getElementById("modalCloseBtn");
let modalCloseXBtn = document.getElementById("modalCloseXBtn");

//SYSTEM FOR CREATING TASK ID#s
function IdGenerator(){
    let data = GetLocalStorage();
    let tempId;
    if (data.length == 0){
        tempId = 1;
    } else {
        tempId = data[data.length - 1].id + 1;
    }
    return tempId
}

//EVENT LISTENER FOR PAGE BUTTONS
//add new task button
addNewTaskBtn.addEventListener('click', function(){
    nameInput.value = "";
    descriptionInput.value = "";
    statusInput.value = "";
    priorityInput.value = "";
    dateInput.value = "";
    idNum.textContent = IdGenerator();
    errorMsg.textContent = '';
});

//save task button
modalSave.addEventListener('click', function(){
    let item = { 
        name: nameInput.value, 
        description: descriptionInput.value, 
        stat: statusInput.value, 
        priority: priorityInput.value,
        date: dateInput.value, 
        id: parseInt(idNum.textContent)
    };
    if (nameInput.value == '' || descriptionInput.value == '' || statusInput.value == '' || priorityInput.value == '' || dateInput.value == '') {
        errorMsg.textContent = "Error: Please make sure you fill out every input field."
    } else {
        errorMsg.textContent = '';
        SaveItemToLocalStorage(item);
        WipeStaging();
        CreateElements();
    }
});

//close modal buttons
modalCloseBtn.addEventListener('click', function(){
    errorMsg.textContent = '';
});

modalCloseXBtn.addEventListener('click', function(){
    errorMsg.textContent = '';
});

//WIPE STAGING AREAS CLEAR FOR REPOPULATION:
function WipeStaging(){
    toDoStaging.innerHTML = "";
    inProgressStaging.innerHTML = "";
    completedStaging.innerHTML = "";
}

//FUNCTION FOR CREATING/DISPLAYING TASKS
function CreateElements(){
    let tasks = GetLocalStorage();
    tasks.map(task => {
        //create card for to do list item:
            //create card title
            let h5 = document.createElement('h5');
            h5.className = 'card-title';
            h5.textContent = task.name;

            let h6 = document.createElement('h6');
            h6.className = 'card-subtitle mb-2 text-muted';
            h6.textContent = "Due Date: " + task.date;

            //create card btns
            let viewTaskBtn = document.createElement('button');
            viewTaskBtn.type = 'button';
            viewTaskBtn.className = 'btn btn-success view-options-btn';
            viewTaskBtn.textContent = 'View/Edit Task';
            viewTaskBtn.setAttribute("data-bs-toggle", "modal"); 
            viewTaskBtn.setAttribute("data-bs-target", "#taskInfoModal");
            viewTaskBtn.addEventListener('click', function(){
                nameInput.value = task.name;
                descriptionInput.value = task.description;
                statusInput.value = task.stat;
                priorityInput.value = task.priority;
                dateInput.value = task.date;
                idNum.textContent = task.id;
                errorMsg.textContent = '';
            });

            let deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn btn-warning options-btn';
            deleteBtn.textContent = 'Delete Task';
            deleteBtn.addEventListener('click', function(){
                RemoveFromLocalStorage(task);
                WipeStaging();
                CreateElements();
            });

            //creating the divs to put the components into
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            let mainCardDiv = document.createElement('div');
            mainCardDiv.className = 'card';
            mainCardDiv.style = 'width: 18rem; background-color: rgba(0,0,0,.8); margin-top: 8px; margin-bottom: 8px;';

            //assembling components into card
            cardBody.appendChild(h5);
            cardBody.appendChild(h6);
            cardBody.appendChild(viewTaskBtn);
            cardBody.appendChild(deleteBtn);
            mainCardDiv.appendChild(cardBody);


            //rules for injecting into three separate columns depending on task priority
            if (task.stat == 1) {
                toDoStaging.append(mainCardDiv);
            } else if (task.stat == 2) {
                inProgressStaging.append(mainCardDiv);
            } else if (task.stat == 3) {
                completedStaging.append(mainCardDiv);
            }
    });
}
CreateElements();

//nonfunctional html code for reference modeling how compoents should look
{/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */}

{/* <button type="button" class="btn btn-info">Info</button> */}
