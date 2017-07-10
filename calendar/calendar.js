// Sets this month's last day, first day, today.
function dateObject(){
    var lastday, firstday;
    if(arguments.length == 3){
        if(arguments[1] != 12){
            lastday = new Date(arguments[0], arguments[1]+1, 0);
            firstday = new Date(arguments[0], arguments[1], 1);
        }else{
            lastday = new Date(arguments[0]+1, 0, 1);
            firstday = new Date(arguments[0], arguments[1], 1);
        }
        dateText = firstday.toDateString().split(" "); 

        return{
            name: arguments[2],
            year: firstday.getUTCFullYear(),
            month: firstday.getMonth(),
            monthText: dateText[1],
            firstDate: firstday.getDate(),
            lastDate: lastday.getDate(),
            firstDay: firstday.getDay(),
            lastDay: lastday.getDay()
        }

    } else{
        this.date = new Date();
        dateText = this.date.toDateString().split(" ");

        return {
            name: arguments[0],
            year: this.date.getUTCFullYear(),
            month: this.date.getMonth(),
            monthText: dateText[1],
            date: this.date.getDate(),
            day: this.date.getDay()
        }
    }
}

const now = dateObject("now");
const thisMonth = dateObject(now.year, now.month, "thisMonth");
const preMonth = dateObject(now.year, now.month-1, "preMonth"); 
const nextMonth = dateObject(now.year, now.month+1, "nextMonth");

// Sets days of week.
const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Sets maximum date for a month.
const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

function drawCalendar(daysObject){
    // Make date iterator. 
    var iter = function* () {
        var index = 0;
        while(dates[index] <= daysObject.lastDate){
            yield dates[index++];
        }
    }
    var iterator = iter();
    // Set component's id, attribute.
    const date = document.createElement("p");
    date.id = daysObject.name;

    const calendarTitle = document.createElement("div");
    calendarTitle.id = daysObject.name + "Title";

    const daysTable = document.createElement("table");
    daysTable.id = daysObject.name + "Days";

    const dateTable = document.createElement("table");
    dateTable.id = daysObject.name + "Date";

    // Make titleLine content.
    calendarTitle.innerHTML = "<strong>" + daysObject.monthText + "</strong>";

    // Make daysTable contents.
    var daysRow = daysTable.insertRow();
    for(x of weeks){
        daysRow.insertCell().innerHTML = "<strong>" + x + "</strong>";
    }

    // Make dateTable contents. 
    for(var i = 0; i <= 5;i++){
        var dateRow = dateTable.insertRow();
        dateRow.setAttribute("style", "height:25px;");
        for(var j=0; j < 7;j++){
            if(i == 0 && j < daysObject.firstDay){
                dateRow.insertCell().innerHTML = "";
            }else{
                var number = iterator.next().value;
                if(number != undefined && number <= daysObject.lastDate)
                    if(daysObject.name == "thisMonth" && number == now.date){
                        // Make today's date bold.
                        var todateCell = dateRow.insertCell();
                        todateCell.id = "todateCell";
                        todateCell.innerHTML = "<strong>" + number + "</strong>";
                    } else
                    dateRow.insertCell().innerHTML = number; 
                else
                    dateRow.insertCell().innerHTML = "";
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
const titleText = "<title>* " + (now.month+1) + "/" + now.date + "/" + now.year + " *</title>";
document.head.insertAdjacentHTML("afterbegin", titleText);

// Set Boxes.
const box = document.createElement("div");
box.id = "box";
box.align = "center";

const titleBox = document.createElement("canvas");
titleBox.id = "titleBox";

var titleString = titleBox.getContext('2d');
titleString = Object.assign(titleString, {id: "titleBox", shadowColor: "#9AABBE", shadowOffsetX: 10, shadowOffsetY: 10, shadowBlur: 0, font: "120px 'Consolas'", textAlign: "center", fillStyle: "#4B3376"});
titleString.fillText(now.year, 150, 130);

const calendarBox = document.createElement("p");
calendarBox.id = "calendarBox";

calendarBox.appendChild(drawCalendar(preMonth));
calendarBox.appendChild(drawCalendar(thisMonth));
calendarBox.appendChild(drawCalendar(nextMonth));
box.appendChild(titleBox);
box.appendChild(calendarBox);
document.body.appendChild(box);

