active_tool = "insul_red_wire"; //defaluts active tool, buttons change
board = [];
cols = 15;
rows = 15;
boxsize = 60;
boardX = 50;
boardY = 50;
buttons = [];

function setup() {
	createCanvas(1000,1000);
	background(0);
	frameRate(240);
	
	//using function I made for automating button creation process, found in logic.js
//format is [button name], [xPos], [yPos], [what to change active_tool to]
	easierButtons('Red Wire', 1000, 250, "normal_red_wire");
	easierButtons('Red Insulated Wire', 1000, 275, "insul_red_wire");
	easierButtons('Green Wire', 1000, 300, "normal_green_wire");
	easierButtons('Green Insulated Wire', 1000, 325, "insul_green_wire");
	easierButtons('Blue Wire', 1000, 350, "normal_blue_wire");
	easierButtons('Blue Insulated Wire', 1000, 375, "insul_blue_wire");
	easierButtons('Empty Cell', 1000, 400, "blank");
	
	fill(150);	//Default Light Gray Cell
	
	for (var i=0; i < cols; i++) {
		board[i] = [];
		for (var j=0; j < rows; j++) {
			
			board[i][j] = new Square(i*boxsize+boardX,j*boxsize+boardY, boxsize, i, j);
			board[i][j].show();
		}
	}
	//potential power source initialization here
	//Possibility: make certain tiles unbreakable/uneditable
	//board[6][7].change("normal_blue_wire");
}

function draw() {
	if (mouseIsPressed) {
		for (var i = 0; i < cols; i ++) {
			for (var j=0; j < rows; j ++) {
				if (mouseX > (i*boxsize+boardX) && mouseX < ( i *boxsize+boardX+boxsize) && mouseY > (j*boxsize+boardY) && mouseY < (j*boxsize+boardY+boxsize)) {
					board[i][j].change(active_tool);	
				}
				//checks every tile for needed updates. TODO: create algorithm that doesnt do this, only checks some tiles.
				/*update: this works, but it does not remove/write over portions of the squares that were once needed, 
				but are no longer. This can be fixed by rewriting every call, or a more targeted system that keeps track of 
				which positions it has active and updates when needed */
				if (board[i][j].tileType == "insul_red_wire" || board[i][j].tileType == "insul_green_wire" ||board[i][j].tileType == "insul_blue_wire" ){
					board[i][j].checkUpdate();
				}
			}
		}
	}
}