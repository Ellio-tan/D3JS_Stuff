function submit(){

	var circleArray =[]; 

	var userInput = Number(document.getElementById("numCirc").value); 
	//console.log(userInput);

	var userRadius = Number(document.getElementById("sizeCirc").value);//Use after figuring out how big circles you want there to be

	while(isNaN(userInput)){
		userInput = prompt("please enter a number");
	}


	
	var circleCirc = Number(userRadius);
	var coordSize = (circleCirc*10); //10 abritraily chosen, fine now because the circles will never go outside the box 

	function createCoord(){
		var cd = ((Math.random()*(coordSize-circleCirc))+ circleCirc);
		return cd; 

}

	function createRandomColor(){ //Creates a random colour from the HTML colour list 
		var letters = '0123456789ABCDEF'
		var color = "#"; 
		for (var i = 0; i < 6; i++){
			color += letters [Math.floor(Math.random() *16)]
		}
		return color; 
	}

	function calculateCirc(radius){
		return Math.pi *(radius*2); 
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
			"cx" :  createCoord(), //coordinate is rougly the center of the canvas
			"cy" : createCoord(), 
			"r" :  userRadius,
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

	
	//console.log(typeof(circleCirc) + " is the type of circleCird");

	var svgContainer = d3.select("body").append("svg") //create a container for the svg shape
										.attr("width", coordSize+ circleCirc)
										.attr("height", coordSize+ circleCirc)
										.style("border", "1px solid black");

	var circles = svgContainer.selectAll("circle") //Creates "nodes" for the circles based on how many indices are in the circle array
								.data(circleArray)
								.enter()
								.append("circle");

	var circleAttributes = circles
							.attr("cx", function (d) {return d.cx; })
							.attr("cy", function (d) {return d.cy; })
							.attr("r", function (d) {return d.r; })
							.style("fill", function (d) {return d.cirColor; });
}

function reset(){
	document.getElementById("form").reset();
	d3.select("svg").remove(); 
}