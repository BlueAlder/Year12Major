var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var drawInstruction = [] ;


function populateWordList(file)		//this function loads a text file from a server and converts it too an array
								//the text in this file are the list of words possible
{
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () 
	{
		if (rawFile.readyState === 4)
		{
			if (rawFile.status === 200 || rawFile.status == 0)
			{
				var allText = rawFile.responseText;
				Arr_word_list = allText.split('\n');

		}
	}


	}
	rawFile.send(null);
}

function selectWord(wordLength){			//this function randomly selects a word from the array of possible words with the correct word length
	
	do 
	{
		var randNum = Math.random();

		var randIndex = Math.round(randNum * (Arr_word_list.length - 1));
	} while (Arr_word_list[randIndex].length != wordLength);

	return Arr_word_list[randIndex];
}

function scrambleWord (word)		//this scrambles the word chosen to be placed on the map 
									// it then returns the array of words jumbled
{
	wordLetters = word.split("");
	console.log(wordLetters);

	counter = wordLetters.length;

	while( counter > 0)
	{
		index = Math.floor(Math.random() * counter);
		counter -- ;

		var temp = wordLetters[counter];
		wordLetters[counter] = wordLetters[index];
		wordLetters[index] = temp;


	}

	var lenWordLetters = wordLetters.length;

	for (var i = 0; i < lenWordLetters; i++)		//this pushes the instructions to draw them and set them all to true
	{
		drawInstruction.push(true);
	}

	console.log(wordLetters);
	return wordLetters;	
}