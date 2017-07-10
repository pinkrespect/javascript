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

// Sets Color Set.
const colorSet = {
	lightBgColor: "#9AABBE",
	darkBgColor: "#4B3376",
	lightFontColor: "#BDCAD1",
	darkFontColor: "#472264",
	midColor: "#60639A"
}

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
	date.setAttribute("style", "width: 200px; margin: 30px 30px 30px 30px;");
	date.setAttribute("align", "center");

	const calendarTitle = document.createElement("div");
	calendarTitle.id = daysObject.name + "Title";
	calendarTitle.setAttribute("style", "font-size: 30px; color:" + colorSet.lightBgColor + ";");

	const daysTable = document.createElement("table");
	daysTable.id = daysObject.name + "Days";
	daysTable.setAttribute("style", "width: 200px; font-size: 10px; color: " + colorSet.lightFontColor +"; text-align: center");

	const dateTable = document.createElement("table");
	dateTable.id = daysObject.name + "Date";
	dateTable.setAttribute("style", "width: 200px; background-color: " + colorSet.midColor + "; color: " + colorSet.lightFontColor + "; height: 160px; text-align: center; font-size: 16px;");

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
						todateCell.innerHTML = "<strong>" + number + "</strong>";
						todateCell.setAttribute("style", "background-color: "+ colorSet.lightBgColor + "; color: " + colorSet.darkBgColor +";");
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
box.setAttribute("align", "center");

const titleBox = document.createElement("canvas");
titleBox.setAttribute("style", "width: 300px; margin-top: 100px;");
var titleString = titleBox.getContext('2d');
titleString.id = "titleBox";
titleString.shadowColor = colorSet.lightFontColor;
titleString.shadowOffsetX = 10;
titleString.shadowOffsetY = 10;
titleString.shadowBlur = 0;
titleString.font = "120px 'Consolas'";
titleString.textAlign = "center";
titleString.fillStyle = colorSet.darkBgColor;
titleString.fillText(now.year, 150, 130);

const calendarBox = document.createElement("p");
calendarBox.id = "calendarBox";
calendarBox.setAttribute("style", "width: 100%; background-color:" + colorSet.darkBgColor + ";display: flex; flex-direction: row; justify-content: center;");

calendarBox.appendChild(drawCalendar(preMonth));
calendarBox.appendChild(drawCalendar(thisMonth));
calendarBox.appendChild(drawCalendar(nextMonth));
box.appendChild(titleBox);
box.appendChild(calendarBox);
document.body.appendChild(box);
document.body.style.backgroundColor = colorSet.lightBgColor;

