class Square {
	constructor(x,y,w,i,j) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.columns = i;
		this.row = j;
		this.tileType = "blank";
		//these next two variables are the root pieces of charging wires. The charged variable tells wether a certain wire piece is charged or not.
		//The 'dest' variable stands for destination, and it is there to check if there is a place for the charges to go to make sure that a circuit can be completed.
		//deviceCheck variable will be true only on devices
		this.charged = false;
		this.dest = false;
		this.deviceCheck = false;
		this.deviceCheckPast = false;
		//store direction of pos and neg ends(for example: on the light cell, there is a pos and neg end). Default is 0,2 for pos,neg.
		this.posEnd;
		this.negEnd;
	}
	
	show() {
		rect(this.x,this.y,this.w,this.w);
	}


	change(tileType) {
		this.tileType = tileType;
		this.update();
	}
	
	update() {
		if (this.tileType[0] + this.tileType[1] + this.tileType[2] + this.tileType[3] == "norm"){
			if(this.tileType[7] == "r"){fill(255,0,0);}
			if(this.tileType[7] == "g"){fill(0,255,0);}
			if(this.tileType[7] == "b"){fill(0,0,255);}
			rect(this.x,this.y,this.w,this.w);
		}
		
		if (this.tileType[0] + this.tileType[1] + this.tileType[2] + this.tileType[3] == "insu"){
			noStroke();
			
			//creates black background of tile (insulation)
			fill(0);
			rect(this.x,this.y,this.w,this.w);
			
			//creates center square(no edge pieces by default)
			if(this.tileType[6] == "r"){fill(255,0,0);}
			if(this.tileType[6] == "g"){fill(0,255,0);}
			if(this.tileType[6] == "b"){fill(0,0,255);}
			rect(this.x + ((2/9) * this.w),this.y + ((2/9) * this.w),this.w * (5/9),this.w * (5/9));
		}	
		if (this.tileType[0] + this.tileType[1] + this.tileType[2] + this.tileType[3] == "blan") {
			fill(150);
			rect(this.x,this.y,this.w,this.w);
		}
		if (this.tileType[0] + this.tileType[1] + this.tileType[2] + this.tileType[3] == "ligh"){
			var lightVar = lightPolarity();
			this.posEnd = lightVar[0];
			this.negEnd = lightVar[1];
			lightDrawConnections(this.x,this.y,this.w,'false',this.posEnd,this.negEnd);
		}
	}
	
	checkUpdate() {
		//if this function is called for this tile, checks what type it needs to check for and executes
		//new if statements for each type can be created or arrays with types to check can be created
		
		if (this.tileType[0] + this.tileType[1] + this.tileType[2] + this.tileType[3] == "insu"){
			var color;
			if(this.tileType[6] == "r"){color = "red";}
			if(this.tileType[6] == "g"){color = "green";}
			if(this.tileType[6] == "b"){color = "blue";}
			var similarTiles = checkSimilar(this.columns,this.row);		
			insul_DrawConnections(this.x,this.y,this.w,similarTiles, color);
		}
	}
	
	//This function is never called btw - its easier to use (Object).tileType which gives value without the use of a function
	tell() { 
		return this.tileType; //useless for this variable
	}
}

//the draw function for insulated red connections
//is given the directions of adjacent tiles and makes a connecting rectangle
function insul_DrawConnections(xPos, yPos, width, similarTiles, color){
	fill(0);
	rect(xPos,yPos,width,width);
	if (color == "red"){fill(255,0,0);}
	if (color == "green"){fill(0,255,0);}
	if (color == "blue"){fill(0,0,255);}
	rect(xPos + ((2/9) * width), yPos + ((2/9) * width),width * (5/9),width * (5/9));
	
	
	if (similarTiles[0] == 1){
		rect(xPos + ((2/9) * width),yPos,width * (5/9),width * (5/9));
	}
	if (similarTiles[1] == 1){
		rect(xPos + ((2/9) * width),yPos + ((2/9) * width),width * (5/9),width * (7/9));	
	}
	if (similarTiles[2] == 1){
		rect(xPos,yPos + ((2/9) * width),width * (5/9),width * (5/9));
	}
	if (similarTiles[3] == 1){
		rect(xPos + ((2/9) * width),yPos + ((2/9) * width),width * (7/9),width * (5/9));
	}
}
//This draws the light cell and passes the polarities to drawPosNeg to draw the polar signs
function lightDrawConnections(xPos,yPos,width,status,pos,neg) {	
	if (status == "true") {
	fill(255,255,0);
	} else if (status == "false") {
	fill(100);
	}
	rect(xPos,yPos,width,width);
	drawPosNeg(xPos, yPos, width, pos, neg);
}

function drawPosNeg(xPos,yPos,width,pos,neg) {
	//draw pos
	noStroke();
	fill(255,0,0);
	if (pos == 0) {
		rect(xPos + ((12/30) * width), yPos + ((4/30) * width), width * (6/30), width * (2/30));
		rect(xPos + ((14/30) * width), yPos + ((2/30) * width), width * (2/30), width * (6/30));
	} else if (pos == 1) {
		rect(xPos + ((22/30) * width), yPos + ((14/30) * width), width * (6/30), width * (2/30));
		rect(xPos + ((24/30) * width), yPos + ((12/30) * width), width * (2/30), width * (6/30));
	} else if (pos == 2) {
		rect(xPos + ((12/30) * width), yPos + ((24/30) * width), width * (6/30), width * (2/30));
		rect(xPos + ((14/30) * width), yPos + ((22/30) * width), width * (2/30), width * (6/30));
	} else if (pos == 3) {
		rect(xPos + ((2/30) * width), yPos + ((14/30) * width), width * (6/30), width * (2/30));
		rect(xPos + ((4/30) * width), yPos + ((12/30) * width), width * (2/30), width * (6/30));
	}
	//draw neg
	fill(0);
	if (neg == 0) {
		rect(xPos + ((12/30) * width), yPos + ((4/30) * width), width * (6/30), width * (2/30));
	} else if (neg == 1) {
		rect(xPos + ((22/30) * width), yPos + ((14/30) * width), width * (6/30), width * (2/30));
	} else if (neg == 2) {
		rect(xPos + ((12/30) * width), yPos + ((24/30) * width), width * (6/30), width * (2/30));
	} else if (neg == 3) {
		rect(xPos + ((2/30) * width), yPos + ((14/30) * width), width * (6/30), width * (2/30));
	}
}