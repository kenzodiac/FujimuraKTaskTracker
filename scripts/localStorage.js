function SaveItemToLocalStorage(item){
    let tasks = GetLocalStorage();
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].id == item.id){
            tasks[i] = item;
        } else {
            tasks.push(item);
        }
    }

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function GetLocalStorage(){
    let localStorageData = localStorage.getItem('Tasks');

    if(localStorageData === null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function RemoveFromLocalStorage(item){
    let tasks = GetLocalStorage();

    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].name == item.name && tasks[i].state == item.state){
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('Tasks', JSON.stringify(tasks))
}

export { SaveItemToLocalStorage, GetLocalStorage, RemoveFromLocalStorage };