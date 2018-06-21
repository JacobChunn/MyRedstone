//works for any type of tile, will check if the tile being checked has tiles of the same type surrounding it
function checkSimilar(thisCol, thisRow){ //returns array of 1's and 0's, 1 means true. format = [up,down,left,right]
	similar = [];							// checks the provided cells type and the 4 around it to see if similar.
	similar[0] = 0;
	if (thisRow-1 >= 0){
		if (board[thisCol][thisRow-1].tileType == board[thisCol][thisRow].tileType){
			similar[0] = 1;
		}
	}
	similar[1] = 0;
	if (thisRow+1 < cols){
		if (board[thisCol][thisRow+1].tileType == board[thisCol][thisRow].tileType){
			similar[1] = 1;
		}
	}
	similar[2] = 0;
	if (thisCol-1 >= 0){
		if (board[thisCol-1][thisRow].tileType == board[thisCol][thisRow].tileType){
			similar[2] = 1;
		}
	}
	similar[3] = 0;
	if (thisCol+1 < rows){
		if (board[thisCol+1][thisRow].tileType == board[thisCol][thisRow].tileType){
			similar[3] = 1;
		}
	}
	return(similar);
}

function easierButtons(buttonName, x, y, varToPass){
	buttons.push(createButton(buttonName));
	buttons[buttons.length-1].position(x,y);
	buttons[buttons.length-1].mousePressed(function(){active_tool = varToPass;});
}