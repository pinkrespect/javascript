var square = (i => (j => j * i));

for(var j = 2; j < 10; j++)
	for(var k = 1; k < 10; k++)
		console.log(square(k)(j));

