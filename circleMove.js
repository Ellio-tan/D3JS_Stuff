function submit(){

	var circleArray =[]; 

	var userInput = document.getElementById("numCirc").value; 
	console.log(userInput);

	var userRadius = document.getElementById("sizeCirc").value;//Use after figuring out how big circles you want there to be

	while(isNaN(userInput)){
		userInput = prompt("please enter a number");
	}


	var coordSize = (userInput * 10); //10 abritraily chosen, fine now because the circles will never go outside the box 


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
			"cx" : 20+ ((Math.floor(Math.random()*coordSize))), //coordinate is rougly the center of the canvas
			"cy" : 20+ ((Math.floor(Math.random()*coordSize))), 
			"r" :  10,
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

	var circleCirc = JSON.stringify(circleArray[0].r);
	console.log(circleCirc);

	var svgContainer = d3.select("body").append("svg") //create a container for the svg shape
										.attr("width", coordSize+((calculateCirc(JSON.stringify(circleArray[0].r)))))
										.attr("height", coordSize+((calculateCirc(JSON.stringify(circleArray[0].r)))))
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