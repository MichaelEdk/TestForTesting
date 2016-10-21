
var qArray = [];
var aArray = [];
var ind = 0;
var questions = 0;
var correct = 0;
var percentage = 0;

var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		var node = document.getElementById('output');
		node.innerHTML = splitTable(text);
		qArray = loadArray(text, 0);
		aArray = loadArray(text, 1);

	};
	reader.readAsText(input.files[0]);
	document.getElementById("startButton").style.display = "initial";
};

function switchQ() {
	var tmp = [];
	tmp = aArray;
	aArray = qArray;
	qArray = tmp;
	startClick();
}

function splitTable(text) {
	var output = "<tr id='headRow'><td>Question</td><td>Answer</td></tr>";
	var lineArr = text.split('\n');
	for (var i = 0; i < lineArr.length; i++) {
		var indLineArr = lineArr[i].split(' = ');
		if (i % 2 == 0) {
			output += "<tr id='oddRow'>";
		} else {
			output += "<tr id='evenRow'>";
		}
		for (var j = 0; j < indLineArr.length; j++) {
			output += "<td>" + indLineArr[j] + "</td>";
		}
		output += "</tr>";
	}
	return output;
}

function loadArray(text, x) {
	var thisArr = [];
	var lineArr = text.split('\n');
	for (var i = 0; i < lineArr.length; i++) {
		var indLineArr = lineArr[i].split(' = ');
		thisArr.push(indLineArr[x].trim());
	}
	return thisArr;
}

function startClick() {
	document.getElementById("card").style.display = "block";
	document.getElementById("record").style.display = "block";
	document.getElementById("output").style.display = "none";
	ind = Math.floor((Math.random() * qArray.length));
	document.getElementById("question").innerHTML = qArray[ind];
	document.getElementById("startButton").innerHTML = "Skip Question";
	document.getElementById("switch").style.display = "block";
}

function nextClick() {
	checkAnswer(ind);
	ind = Math.floor((Math.random() * qArray.length));
	document.getElementById("question").innerHTML = qArray[ind];
	return ind;
}

function checkAnswer(ind) {
	var theirAns = document.getElementById("answer").value.toUpperCase();
	var realAns = aArray[ind].toUpperCase();
	if (theirAns == realAns) {
		alert("Correct!");
		correct += 1;
	} else {
		alert("Not quite, the answer was '" + aArray[ind] + "'. Your answer was '" + document.getElementById("answer").value + "'");
	}
	document.getElementById("answer").value = "";
	questions += 1;
	updateScore();
}

function updateScore() {
	if (correct == 0) {
		percentage = 0;
	} else {
		percentage = correct / questions * 100;
	}
	document.getElementById("record").innerHTML = "<b><p id='score'> " + correct + "/" + questions + " = " + percentage.toFixed(2) + "%</p></b>";
}

function resetScore() {
	questions = 0;
	correct = 0;
	updateScore();
}