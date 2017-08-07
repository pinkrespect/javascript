'use strict'; // strict mode: https://developer.mozilla.org/en-US/docs/Web/JavaScript/References/Strict_mode

const today = new Date();

const nowYear = today.getUTCFullYear();
const nowMonth = today.getMonth();
const nowDate = today.getDate();

// Set title to today's date.
document.title = `* ${nowYear}/${nowMonth+1}/${nowDate} *`;

// Set Boxes.
const box = document.createElement("div");
box.className = "box";
document.body.appendChild(box);

const titleBox = document.createElement("div");
titleBox.className = "titleBox";
titleBox.innerHTML = `<b>${nowYear}</b>`;
box.appendChild(titleBox);

const calendarBox = document.createElement("p");
calendarBox.className = "calendarBox";

calendarBox.appendChild(drawCalendar(nowYear, nowMonth-1));
calendarBox.appendChild(drawCalendar(nowYear, nowMonth));
calendarBox.appendChild(drawCalendar(nowYear, nowMonth+1));
box.appendChild(calendarBox);

function drawCalendar(year, month) {
    const lastday = new Date(year, month+1, 0);
    const firstday = new Date(year, month, 1);

    const monthNumber = firstday.getMonth();
    const monthText = firstday.toDateString().split(" ")[1];
    const lastDate = lastday.getDate();
    const firstDay = firstday.getDay();

    // Set component's className, attribute.
    const calendarTable = document.createElement("p");
    calendarTable.className = "calendarTable";

    const monthTitle = document.createElement("div");
    monthTitle.className = "monthString";

    const daysTable = document.createElement("table");
    daysTable.className = "daysTable";

    const dateTable = document.createElement("table");
    dateTable.className = "dateTable";

    // Make titleLine content.
    monthTitle.innerHTML = `<strong> ${monthText} </strong>`;

    // Make daysTable contents.
    const daysRow = daysTable.insertRow();

    // Sets days of week.
    // MDN "for ... of" example.
    for (const x of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) {
        daysRow.insertCell().innerHTML = `<strong> ${x} </strong>`;
    }

    // Make dateTable contents. 
    let number = 0;
    for (let i = 0; i <= 5;i++) {
        const dateRow = dateTable.insertRow();
        for (let j = 0; j < 7;j++) {
            if (i === 0 && j < firstDay) {
                dateRow.insertCell().innerHTML = "";
            } else {
                if (number < lastDate) {
                    if (nowMonth === monthNumber && number === nowDate) {
                        // Make today's date bold.
                        const todateCell = dateRow.insertCell();
                        todateCell.className = "todateCell";
                        todateCell.innerHTML = `<strong> ${++number} </strong>`;
                    } else {
                        dateRow.insertCell().innerHTML = ++number; 
                    }
                } else {
                    dateRow.insertCell().innerHTML = "&nbsp;";
                }
            }
        }
    }

    // Append Child Node to each Parent Node.
    calendarTable.appendChild(monthTitle);
    calendarTable.appendChild(daysTable);
    calendarTable.appendChild(dateTable);
    return calendarTable;
}
