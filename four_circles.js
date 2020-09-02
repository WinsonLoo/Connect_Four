var round = 0;
var table = $('.board');

//returns the color of that row and column
function getColor(row,col){
	return table.eq(row).find('td').eq(col).find('#chips').css('background-color');
}

//change the color of that row and column based on round
function changeColor(row,col){
	if(round%2===0)
		table.eq(row).find('td').eq(col).find('#chips').css('background-color','rgb(10, 91, 252)');
	else
		table.eq(row).find('td').eq(col).find('#chips').css('background-color','rgb(224, 31, 31)');
}

//determine the bottommost grey chip of that column
function bottomGreyRow(col){
	for(var i = 5; i >=0;i--){
		if (getColor(i,col)=== "rgb(128, 128, 128)"){
			return i;
		}
	}
}
//return true if there are four chips of same color
function fourChips(first,second,third,fourth){
	return first === second && first === third && first === fourth && first !== 'rgb(128, 128, 128)';
}

function winCondition(){
	//Condition One: Vertical goal
	for(var col = 0; col < 7; col++){
		for(var row = 0; row < 3; row++){
			if(fourChips(getColor(row,col),getColor(row+1,col),getColor(row+2,col),getColor(row+3,col)))
				return true;
		}
	}
	
	//Condition Two: Horizontal goal
	for(var row = 0; row < 6; row++){
		for(var col = 0; col < 3; col++){
			if(fourChips(getColor(row,col),getColor(row,col+1),getColor(row,col+2),getColor(row,col+3)))
				return true;
		}
	}
	
	//Condition Three: Diagonal goal top-left to bottom-right (\)
	for(var row = 0; row < 3; row++){
		for(var col = 0; col < 4; col++){
			if(fourChips(getColor(row,col),getColor(row+1,col+1),getColor(row+2,col+2),getColor(row+3,col+3)))
				return true;
		}
	}
	
	//Condition Four: Diagonal goal top-right to bottom-left (/)
	for(var row = 0; row < 3; row++){
		for(var col = 6; col > 2; col--){
			if(fourChips(getColor(row,col),getColor(row+1,col-1),getColor(row+2,col-2),getColor(row+3,col-3)))
				return true;
		}
	}
	
	//if all condition not met thn will return false
	return false;
}
	

//program start here
var playerOne = prompt("Player One: Enter Your Name, you will be Blue");
var playerTwo = prompt("Player Two: Enter Your Name, you will be Red");
var playerNames =[playerOne,playerTwo];

//start with player one
$("#turns").text(playerNames[round%2]+": it is your turn, please pick a column to drop your chip.")

//if button were clicked
$("table #chips").on('click',function(){
	//make sure player doesnt select chip that is selected
	if($(this).css("background-color") !== "rgb(128, 128, 128)" )
	{
		alert("this place is not available!")
		return;
	}
	var colClicked = $(this).closest("td").index();
	var rowClicked = bottomGreyRow(colClicked);
	changeColor(rowClicked,colClicked);
	
	
	if(winCondition()){
		$('h4').fadeOut('fast');
		$("h1").text("Congratulation!! ")
		$('h3').text(playerNames[round%2]+" have won the game! Restart to try again")
		$('table #chips').prop('disabled', true); //disable the buttons to prevent player to continue playing
		return;
	}
	round++;
	$("#turns").text(playerNames[round%2]+": it is your turn, please pick a column to drop your chip.")
})




