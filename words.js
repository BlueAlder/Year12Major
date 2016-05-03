var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

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
				console.log(Arr_word_list);
							}
		}
	}


	rawFile.send(null);
}

function selectWord(wordLength){
	
	do 
	{
		var randNum = Math.random();

		var randIndex = Math.round(randNum * (Arr_word_list.length - 1));
	} while (Arr_word_list[randIndex].length != wordLength);

	return Arr_word_list[randIndex];
}