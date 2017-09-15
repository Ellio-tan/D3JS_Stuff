var circleArray =[]; 

var userInput = prompt("enter number of rings you want to see"); 

while(isNaN(userInput)){
	userInput = prompt("please enter a number");
}


var coordSize = userInput * 10


function createRandomColor(){ //Creates a random colour from the HTML colour list 
	var letters = '0123456789ABCDEF'
	var color = "#"; 
	for (var i = 0; i < 6; i++){
		color += letters [Math.floor(Math.random() *16)]
	}
	return color; 
}

function checkColor(inputCol){
	if (inputCol = "#41b1be"){
		inputCol = createRandomColor();
		return inputCol;
	}
	else{
		return inputCol;
	}
}

for (x = 0; x < userInput ; x++){ // Set circle attributes 
	

	var circle = {
		"id" : x, 
		"cx" : coordSize/2, //corrdinate is rougly the center of the canvas
		"cy" : coordSize/2, 
		"r" : (x + 1) *5,
		"cirColor" : checkColor(createRandomColor())
	}

	if (x > 0){
		if (circle.cirColor == circleArray[x-1].cirColor){
			circle.cirColor = checkColor(createRandomColor); 
		}
	}
	circleArray.push(circle); 
}
circleArray.reverse(); // Must reverse the array so the largest circle is on the "bottom" of the stack

var svgContainer = d3.select("body").append("svg") //create a container for the svg shape
										.attr("width", coordSize)
										.attr("height", coordSize);
										//.style("border", "1px solid black")

	var circles = svgContainer.selectAll("circle") //Creates "nodes" for the circles based on how many indices are in the circle array
										.data(circleArray)
										.enter()
								.append("circle");

	var circleAttributes = circles
							.attr("cx", function (d) {return d.cx; })
							.attr("cy", function (d) {return d.cy; })
							.attr("r", function (d) {return d.r; })
							.style("fill", function (d) {return d.cirColor; });
