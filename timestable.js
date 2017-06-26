for(var k = 1;k<10;k++){
	for(var l = 1; l < 10; l++){
		console.log(k*l);
	}
}


var number = function(x){
	var result = function(){
		for(var num = 1; num < 10; num++){
			console.log(" >> " + x * num);
			return x * num;
		}
	}
	console.log(result);
	return result;
}

for(var i = 1 ; i < 10 ; i++){
	multiplier = number(i);
	console.log(multiplier());
}
