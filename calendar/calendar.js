'use strict'; // strict mode: https://developer.mozilla.org/en-US/docs/Web/JavaScript/References/Strict_mode

// Sets this month's last day, first day, today.

function dateObject(){
    let lastday, firstday;
    if(arguments[1] !== 12){
        lastday = new Date(arguments[0], arguments[1]+1, 0);
        firstday = new Date(arguments[0], arguments[1], 1);
    }else{
        lastday = new Date(arguments[0]+1, 0, 1);
        firstday = new Date(arguments[0], arguments[1], 1);
    }
    let dateText = firstday.toDateString().split(" ")[1]; 

    return{
        name: arguments[2],
        month: firstday.getMonth(),
        monthText: dateText,
        lastDate: lastday.getDate(),
        firstDay: firstday.getDay(),
    }
}

const today = new Date();

const now = {
    name: "now",
    year: today.getUTCFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
};
const thisMonth = dateObject(now.year, now.month, "thisMonth");
const preMonth = dateObject(now.year, now.month-1, "preMonth"); 
const nextMonth = dateObject(now.year, now.month+1, "nextMonth");

// Sets days of week.
const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function drawCalendar(daysObject){
    // Set component's className, attribute.
    const date = document.createElement("p");
    date.className = daysObject.name;

    const calendarTitle = document.createElement("div");
    calendarTitle.className = daysObject.name + "Title";

    const daysTable = document.createElement("table");
    daysTable.className = daysObject.name + "Days";

    const dateTable = document.createElement("table");
    dateTable.className = daysObject.name + "Date";

    // Make titleLine content.
    calendarTitle.innerHTML = `<strong> ${daysObject.monthText} </strong>`;

    // Make daysTable contents.
    let daysRow = daysTable.insertRow();
    for(let x of weeks){ // MDN "for ... of" example.
        daysRow.insertCell().innerHTML = "<strong>" + x + "</strong>";
    }

    // Make dateTable contents. 
    let number = 0;
    for(let i = 0; i <= 5;i++){
        let dateRow = dateTable.insertRow();
        dateRow.setAttribute("style", "height:25px;");
        for(let j = 0; j < 7;j++){
            if(i === 0 && j < daysObject.firstDay){
                dateRow.insertCell().innerHTML = "";
            }else{
                if(number < daysObject.lastDate){
                    number++;
                    if(daysObject.name === "thisMonth" && number === now.date){
                        // Make today's date bold.
                        let todateCell = dateRow.insertCell();
                        todateCell.className = "todateCell";
                        todateCell.innerHTML = "<strong>" + number + "</strong>";
                    } else {
                        dateRow.insertCell().innerHTML = number; 
                    }
                } else{
                    dateRow.insertCell().innerHTML = "";
                }
            }
        }
    }

    // Append Child Node to each Parent Node.
    date.appendChild(calendarTitle);
    date.appendChild(daysTable);
    date.appendChild(dateTable);
    return date;
}

// Set title to today's date.
document.title = `* ${now.year}/${now.month+1}/${now.date} *`;

// Set Boxes.
const box = document.createElement("div");
box.className = "box";
box.align = "center";

const titleBox = document.createElement("canvas");
titleBox.className = "titleBox";

let titleString = titleBox.getContext('2d');
titleString = Object.assign(titleString, {className: "titleBox", shadowColor: "#9AABBE", shadowOffsetX: 10, shadowOffsetY: 10, shadowBlur: 0, font: "120px 'Consolas'", textAlign: "center", fillStyle: "#4B3376"});
titleString.fillText(now.year, 150, 130);

const calendarBox = document.createElement("p");
calendarBox.className = "calendarBox";

calendarBox.appendChild(drawCalendar(preMonth));
calendarBox.appendChild(drawCalendar(thisMonth));
calendarBox.appendChild(drawCalendar(nextMonth));
box.appendChild(titleBox);
box.appendChild(calendarBox);
document.body.appendChild(box);

