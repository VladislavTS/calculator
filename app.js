var main = function(){
	var $buttons = $("[butt]");
	var $expression = $("input[name='expression']");
	var $answer = $(".answer");

	var nowExpressionValue = "";
	var nowExpressionValue_length = 0;
	var lastSymbol = "";



	function doCounting(){
		if(nowExpressionValue !== ""){
			try{
				$answer.text(eval(nowExpressionValue));
			} catch(err) {
				$answer.text("Ошибка");
			} // try
		} else {
			$answer.text("");
		}
	} // function. doCounting

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	} // function. isNumeric

	function clearExpression(){
		$expression.val("0");
		nowExpressionValue = "";

		doCounting();
	} // function. clearExpression

	function addNum(button){
		nowExpressionValue += button;
		$expression.val(nowExpressionValue);

		doCounting();
	} // function. addNum

	function addDot(){
		var error = 0;

		if(isNumeric(lastSymbol)){
			for(var i = 0; i < nowExpressionValue_length; i++){
				var itSymbol = nowExpressionValue.charAt(nowExpressionValue_length - i - 1);

				if(!isNumeric(itSymbol)){
					if(itSymbol == "."){
						error = 1;
						break;
					} else {
						break;
					} // if. lastSymbol == ","
				} // if. isNumeric(lastSymbol)
			} // for. i < nowExpressionValue_length

			if(error == 0){
				nowExpressionValue += ".";
				$expression.val(nowExpressionValue);
			} // if. error == 0
		} // if. isNumeric(lastSymbol)
	} // function. addDot

	function addPlus(){
		if(isNumeric(lastSymbol) || lastSymbol == ")"){
			nowExpressionValue += "+";
			$expression.val(nowExpressionValue);
		} // if. isNumeric(lastSymbol)
	} // function. addPlus

	function addMinus(){
		if(isNumeric(lastSymbol) || lastSymbol == ")"){
			nowExpressionValue += "-";
			$expression.val(nowExpressionValue);
		} else {
			nowExpressionValue += "(-";
			$expression.val(nowExpressionValue);
		} // if. isNumeric(lastSymbol)
	} // function. addMinus

	function addBracket(){
		var openBrackets = 0;
		var closeBrackets = 0;

		for(var i = 0; i < nowExpressionValue_length; i++){
			var itSymbol = nowExpressionValue.charAt(i);

			if(itSymbol == "(") openBrackets++;
			if(itSymbol == ")") closeBrackets++;
		} // for. i < nowExpressionValue_length

		if(openBrackets > closeBrackets){
			nowExpressionValue += ")";
			$expression.val(nowExpressionValue);

			doCounting()
		} else {
			nowExpressionValue += "(";
			$expression.val(nowExpressionValue);
		} // if. openBrackets < closeBrackets
	} // function. addBracket

	function addMultiply(){
		if(isNumeric(lastSymbol) || lastSymbol == ")"){
			nowExpressionValue += "*";
			$expression.val(nowExpressionValue);
		} // if. isNumeric(lastSymbol)
	} // function. addMultiply

	function addShare(){
		if(isNumeric(lastSymbol) || lastSymbol == ")"){
			nowExpressionValue += "/";
			$expression.val(nowExpressionValue);
		} // if. isNumeric(lastSymbol)
	} // function. addMultiply

	function removeSym(){
		if(nowExpressionValue_length > 0){
			nowExpressionValue = nowExpressionValue.slice(0, nowExpressionValue_length - 1);
			$expression.val(nowExpressionValue);

			doCounting();
		} // if. isNumeric(lastSymbol)
	} // function. removeSym

	function sum(){
		if(nowExpressionValue_length > 0){
			doCounting();
		} // if. isNumeric(lastSymbol)
	} // function. removeSym



	$buttons.on("click", function(){
		var clickedButton = $(this).attr("butt");

		nowExpressionValue_length = nowExpressionValue.length;
		lastSymbol = nowExpressionValue.charAt(nowExpressionValue_length - 1);

		if(isNumeric(clickedButton)) addNum(clickedButton);
		if(clickedButton == "c") clearExpression();
		if(clickedButton == ",") addDot();
		if(clickedButton == "+") addPlus();
		if(clickedButton == "-") addMinus();
		if(clickedButton == "(") addBracket();
		if(clickedButton == "*") addMultiply();
		if(clickedButton == "/") addShare();
		if(clickedButton == "<") removeSym();
		if(clickedButton == "=") sum();
	}); // click. $buttons

	$expression.keydown(function(){
		return false;
	}); // keydown. $expression

	var isCtrl = false;
	$($expression).keyup(function(event){
		if(event.which == 16) isCtrl = false;
	}).keydown(function(event){
		nowExpressionValue_length = nowExpressionValue.length;
		lastSymbol = nowExpressionValue.charAt(nowExpressionValue_length - 1);

		if(event.which == 16) isCtrl = true;

		if(event.which > 47 && event.which < 58 && isCtrl !== true) addNum(event.which - 48);
		if(event.which == 190) addDot();
		if(event.which == 189) addMinus();
		if(event.which == 191) addShare();
		if(event.which == 8) removeSym();
		if(event.which == 187 && isCtrl !== true) sum();

		if(event.which == 187 && isCtrl == true) addPlus();
		if(event.which == 48 && isCtrl == true) addBracket();
		if(event.which == 57 && isCtrl == true) addBracket();
		if(event.which == 56 && isCtrl == true) addMultiply();
		console.log(event.which);
	});



	clearExpression();
}

$(document).ready(main);