function SaveItemToLocalStorage(item){
    let tasks = GetLocalStorage();
    console.log(tasks);
    if (tasks.length == 0){
        tasks.push(item);
    } else {
        let temp;
        let check = false;
        for (let i = 0; i < tasks.length; i++){
            if (tasks[i].id == item.id){
                temp = i;
                check = true;
            }
        }
        if (check == true){
            tasks[temp] = item;
        } else {
            tasks.push(item);
        }
    }

    localStorage.setItem('Tasks', JSON.stringify(tasks));
    console.log('SaveItemToLocalStorage() has been executed');
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