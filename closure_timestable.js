var multiply = function(left){
	return function(){
		var inner = [];
		for(var right = 0; right < 10; right++){
			inner[right] = left * right;
		}
		return inner;
	}
}


for(var i = 2; i < 10; i++){
	console.log(multiply(i)());
}
