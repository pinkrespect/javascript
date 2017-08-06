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
box.align = "center";
document.body.appendChild(box);

const titleBox = document.createElement("canvas");
titleBox.className = "titleBox";
box.appendChild(titleBox);

const titleString = Object.assign(titleBox.getContext('2d'), {
    className: "titleBox",
    shadowColor: "#9AABBE",
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowBlur: 0,
    font: "120px 'Consolas'",
    textAlign: "center",
    fillStyle: "#4B3376"
});
titleString.fillText(nowYear, 150, 130);

const calendarBox = document.createElement("p");
calendarBox.className = "calendarBox";

calendarBox.appendChild(drawCalendar(nowYear, nowMonth-1, "preMonth"));
calendarBox.appendChild(drawCalendar(nowYear, nowMonth, "thisMonth"));
calendarBox.appendChild(drawCalendar(nowYear, nowMonth+1, "nextMonth"));
box.appendChild(calendarBox);

function drawCalendar(year, month, name) {
    const lastday = new Date(year, month+1, 0);
    const firstday = new Date(year, month, 1);

    const monthNumber = firstday.getMonth();
    const monthText = firstday.toDateString().split(" ")[1];
    const lastDate = lastday.getDate();
    const firstDay = firstday.getDay();

    // Set component's className, attribute.
    const date = document.createElement("p");
    date.className = name;

    const calendarTitle = document.createElement("div");
    calendarTitle.className = name + "Title";

    const daysTable = document.createElement("table");
    daysTable.className = name + "Days";

    const dateTable = document.createElement("table");
    dateTable.className = name + "Date";

    // Make titleLine content.
    calendarTitle.innerHTML = `<strong> ${monthText} </strong>`;

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
                    number++;
                    if (name === "thisMonth" && number === nowDate) {
                        // Make today's date bold.
                        const todateCell = dateRow.insertCell();
                        todateCell.className = "todateCell";
                        todateCell.innerHTML = `<strong> ${number} </strong>`;
                    } else {
                        dateRow.insertCell().innerHTML = number; 
                    }
                } else {
                    dateRow.insertCell().innerHTML = "&nbsp;";
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
