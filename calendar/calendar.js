'use strict'; // strict mode: https://developer.mozilla.org/en-US/docs/Web/JavaScript/References/Strict_mode

const today = new Date();

const nowYear = today.getUTCFullYear();
const nowMonth = today.getMonth();
const nowDate = today.getDate();

document.title = `*${nowYear}/${nowMonth+1}/${nowDate}*`;

const titleBox = document.createElement("div");
titleBox.className = "titleBox";
titleBox.innerHTML = `<b>${nowYear}</b>`;

const calendarBox = document.createElement("p");
calendarBox.className = "calendarBox";
calendarBox.appendChild(drawCalendar(nowYear, nowMonth-1));
calendarBox.appendChild(drawCalendar(nowYear, nowMonth));
calendarBox.appendChild(drawCalendar(nowYear, nowMonth+1));

const box = document.createElement("div");
box.className = "box";
document.body.appendChild(box);
box.appendChild(titleBox);
box.appendChild(calendarBox);

function drawCalendar(year, month) {
    const lastday = new Date(year, month+1, 0);
    const firstday = new Date(year, month, 1);

    const monthNumber = firstday.getMonth();
    const monthText = firstday.toDateString().split(" ")[1];
    const lastDate = lastday.getDate();
    const firstDay = firstday.getDay();

    const calendarTable = document.createElement("p");
    calendarTable.className = "calendarTable";

    const monthTitle = document.createElement("div");
    monthTitle.className = "monthString";
    calendarTable.appendChild(monthTitle);

    const daysTable = document.createElement("table");
    daysTable.className = "daysTable";
    calendarTable.appendChild(daysTable);

    const dateTable = document.createElement("table");
    dateTable.className = "dateTable";
    calendarTable.appendChild(dateTable);

    monthTitle.innerHTML = `<strong>${monthText}</strong>`;

    const daysRow = daysTable.insertRow();

    for (const x of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) {
        daysRow.insertCell().innerHTML = `<strong>${x}</strong>`;
    }

    let number = 0;
    for (let i = 0; i <= 5; i++) {
        const dateRow = dateTable.insertRow();
        dateRow.className = "dateRow";
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDay) || number >= lastDate) {
                dateRow.insertCell();
                continue;
            }
            
            number += 1;

            if (nowMonth !== monthNumber || number !== nowDate) {
                dateRow.insertCell().innerHTML = number; 
                continue;
            }

            // Make today's date bold.
            const todateCell = dateRow.insertCell();
            todateCell.className = "todateCell";
            todateCell.innerHTML = `<strong>${number}</strong>`;
        }
    }

    // Append Child Node to each Parent Node.
    return calendarTable;
}
