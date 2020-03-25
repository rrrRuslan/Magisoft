// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const dueDate = document.querySelector(".dateSelector");
const uncompleted = document.querySelector(".filters__not-finished");
const sortByDateButton = document.querySelector(".filters__date");
const tillTomorrow = document.querySelector(".filters__till-tomorrow");






// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.date, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric", hour:"numeric", minute:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("ru", options);

// add to do function

function addToDo(toDo, id,date, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    // const _date = date.value;



    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo} | ${date}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key

document.addEventListener("keyup",function(even){
    if(event.keyCode === 13){
        const toDo = input.value;
        const ddate = dueDate.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, ddate,false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                date:ddate,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    // LIST[element.id].done = LIST[element.id].done ? false : true;
    LIST[element.id].done =!LIST[element.id].done;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
    const index = LIST.indexOf(element);
    LIST.splice(index,1);
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    console.log('clicked element',element);
    const elementJob = element.attributes.job.value; // complete or delete
    if(elementJob === "complete"){
        completeToDo(element);
    }else if(elementJob === "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


function sortUncompleted(mas){
    let arr = [];
    for (let i = 0; i < mas.length; i++) {
        if (!mas[i].done) arr.push(mas[i]);
    }
    return arr;
}

function sortByDate(mas){
    let arr = mas.sort(compareDate);
    return arr;
}

function compareDate(a, b) {
    if (a.date<b.date) {
        return -1;
    }
    if (a.date>b.date) {
        return 1;
    }
    // a must be equal to b
    return 0;
}


let switchUncompletedBool = false;
uncompleted.addEventListener("click", function(){

    switchUncompletedBool = !switchUncompletedBool;
    console.log("Sort by complement button log");
    if (switchUncompletedBool){
        list.innerHTML='';
        loadList(sortUncompleted(LIST));
    }else {
        list.innerHTML='';
        loadList(LIST);
    }
});



function sortTillTomorrow(mas) {
    let arr = [];
    for (let i = 0; i < mas.length; i++) {
        if (mas[i].date.slice(-2) <= today.getDate() + 1 && mas[i].date.slice(-2)>=today.getDate()) {

            arr.push(mas[i]);
        }
        console.log('dates',today.getDate(),mas[i].date.slice(-2));
        console.log(arr);
    }
    return arr;
}



let switchDateBool = false;
sortByDateButton.addEventListener("click",function () {
    switchDateBool = !switchDateBool;
    if (switchDateBool){
        list.innerHTML='';
        loadList(sortByDate(LIST));
    }else {
        list.innerHTML='';
        loadList(LIST);
    }
});

let switchTillTomorrowBool = false;
tillTomorrow.addEventListener("click", async function () {
    // switchTillTomorrowBool = !switchTillTomorrowBool;
    // console.log("Sort till tomorrow button log");
    // if (switchTillTomorrowBool){
    //     list.innerHTML='';
    //     loadList(sortTillTomorrow(LIST));
    // }else {
    //     list.innerHTML='';
    //     loadList(LIST);
    // }
    //todo AXIOS!!!!!!!!!!!!!
    try {
        console.log('LIST',LIST);
        console.log('JSON.stringify(sortTillTomorrow(LIST))',JSON.stringify(sortTillTomorrow(LIST)));

        const response = await fetch('http://localhost:3000/posts/1', {
            method: 'PUT', // или 'PUT'
            body: JSON.stringify(LIST), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
    } catch (error) {
        console.error('Ошибка:', error);
    }

    // const response = await fetch('http://localhost:3000/posts');
    // const myArray = await response.json();
    // console.log("from server",JSON.stringify(myArray));

});



