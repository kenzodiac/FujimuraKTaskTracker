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
        tempId = (data[data.length - 1].id) + 1;
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
});

//save task button
modalSave.addEventListener('click', function(){
    let item = { 
        name: nameInput.value, 
        description: descriptionInput.value, 
        stat: statusInput.value, 
        priority: priorityInput.value,
        date: dateInput.value, 
        id: idNum.textContent
    };
    SaveItemToLocalStorage(item);
    WipeStaging();
    CreateElements();
});

//close modal buttons
modalCloseBtn.addEventListener('click', function(){

});

modalCloseXBtn.addEventListener('click', function(){

});

//WIPE STAGING AREAS CLEAR FOR REPOPULATION:
function WipeStaging(){
    toDoStaging.innerHTML = "";
    inProgressStaging = "";
    completedStaging = "";
}

//FUNCTION FOR CREATING/DISPLAYING TASKS
function CreateElements(){
    let tasks = GetLocalStorage();
    tasks.map(task => {
        //create card for to do list item:
            //create card title
            let h5 = document.createElement('h5');
            h5.className = 'card-title';
            h5.textContent = task.title;  //points to task name; not yet functional

            let h6 = document.createElement('h6');
            h6.className = 'card-subtitle mb-2 text-muted';
            h6.textContent = task.date; //points to task due-date; not yet functional

            //create card btns
            let viewTaskBtn = document.createElement('button');
            viewTaskBtn.type = 'button';
            viewTaskBtn.className = 'btn btn-success view-options-btn';
            viewTaskBtn.textContent = 'View/Edit Task';
            viewTaskBtn.addEventListener('click', function(){
                
            }); //not yet functioning

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
            mainCardDiv.style = 'width: 18rem;';

            //assembling components into card
            cardBody.appendChild(h5);
            cardBody.appendChild(viewTaskBtn);
            cardBody.appendChild(deleteBtn);
            mainCardDiv.appendChild(cardBody);

            //rules for injecting into three separate columns depending on task priority
            if (task.stat == 1) {
                toDoStaging.appendChild(mainCardDiv);
            } else if (task.stat == 2) {
                inProgressStaging.appendChild(mainCardDiv);
            } else if (task.stat == 3) {
                completedStaging.appendChild(mainCardDiv);
            }
    });
}

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
