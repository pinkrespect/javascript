`use strict`;

function numberToKorean(number) {
	const koreanNumber = {
		"1": "일",
		"2": "이",
		"3": "삼",
		"4": "사",
		"5": "오",
		"6": "육",
		"7": "칠",
		"8": "팔",
		"9": "구",
	};

	const positionalNumber = {
		0: "십",
		1: "백",
		2: "천",
		3: "",
	};

	const numberOfUnits = ["조", "억", "만"];

	const stringArray = number.toString().split("");
	const reversedKoreanArray = [];
	const stringArrayLength = stringArray.length;
	const resultArray = [];

	for (let x = stringArrayLength - 1;x >= 0; x--) {
		reversedKoreanArray.push(koreanNumber[stringArray[x]]);
	}

	for (let x = 0; x < stringArrayLength;x++) {
		resultArray.unshift(reversedKoreanArray[x]);
		console.log(resultArray);
		if (x <= stringArrayLength-2){
			if(reversedKoreanArray[x+1] !== undefined) {
				resultArray.unshift(positionalNumber[x%4]);
			}
		//	resultArray.unshift(numberOfUnits[x%3]);
		//	console.log("2" + numberOfUnits[x%3]);
		// 요기에 이터레이터 만들어서 삽입하기 ㅇㅅ<
			// 이프-엘스 해서 undefined이면 배열에 삽입 안하구...
		}
	}

	return resultArray;
}

let randomNumber = 111001011; //일억일천일백만일천일십일
document.body.innerHTML = numberToKorean(randomNumber);
