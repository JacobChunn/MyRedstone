//buttons.push(createButton(buttonName));
//	buttons[buttons.length-1].position(x,y);
//	buttons[buttons.length-1].mousePressed(function(){active_tool = varToPass;});

function lightRotationInit() {
	lightBentCheckbox = createCheckbox("Bent", false);
	lightBentCheckbox.changed(changeBent);
	lightBentCheckbox.position(1000, 225);
	
	lightReflectionCheckbox = createCheckbox("Reflection", false);
	lightReflectionCheckbox.changed(changeBent);
	lightReflectionCheckbox.position(1075, 225);
	
	createP("Rotation").position(1190, 211);
	
	lightRotationSlider = createSlider(0,3,0);
	lightRotationSlider.position(1250, 225);
}

function changeBent() {
	var l_bentCheck;
	if (lightBentCheckbox.checked()) {
		l_bentCheck = true;
	} else {
		l_bentCheck = false;
	}
	return l_bentCheck;
}
function changeReflection() {
	var l_reflectionCheck;
	if (lightReflectionCheckbox.checked()) {
		l_reflectionCheck = true;
	} else {
		l_reflectionCheck = false;
	}
	return l_reflectionCheck;
}

function lightPolarity() {
	var top = 0, right = 1, bottom = 2, left = 3;
	if (changeBent()) { //3 way cycle
		var temp = right;
		
		right = left;
		left = bottom;
		bottom = temp;
	}
	if (changeReflection()) { //left right swap
		var temp = right;
		
		right = left;
		left = temp;
	}
	for (var rAmt = lightRotationSlider.value(); rAmt > 0; rAmt--) { //full 4 way cycle loop
		var temp = top;
		
		top = left;
		left = bottom;
		bottom = right;
		right = temp;
	}
	return [top, bottom];
}


