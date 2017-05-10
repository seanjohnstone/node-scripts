/*
	Testing whitespace on web pages
	Remember
		- it could be gzipped
	But...
		- gzip is only going to reduce this by ~1/5 at max
		- http://superuser.com/questions/139253/what-is-the-maximum-compression-ratio-of-gzip
*/

	var arguments 		= process.argv,
		total			= 0,
		nodeString		= arguments[0],
		thisFilePath	= arguments[1];

	//	Run Process
	if(typeof arguments[2] == 'undefined') {
		console.log('No URL Parameter...');
		process.exit(1);
	}

	var fs 					= require('fs'),
		http 				= require('http'),
		url 				= 'http://www.' + arguments[2] + '/',
		pageString 			= "",
		numTextLines 		= 0,
		numBlankLines 		= 0,
		textLineCharCount 	= 0,
		blankLineCharCount 	= 0;

	//	Send request and gather page response
	http.get(url, function(res) {
		//	data returned
		res.on('data', function(chunk) {
			var s = chunk.toString();
			pageString += s;
		});

		//	end of data stream
		res.on('end', function() {
			parseWhiteSpace();
		});
	});

	//	Determines the percent of lines and characters that are whitespace
	function parseWhiteSpace() {
		var splitLines = pageString.split('\n');
		for(var i = 0; i < splitLines.length;) {
			var line = splitLines[i],
				trimmed = line.trim(),
				lineLength = line.length;
			//	Add in length of new line char
			if(i !== splitLines.length - 1) {
				lineLength++;
			}

			//Determine if line is blank or now
			if(trimmed !==  "") {
				numTextLines++;
				textLineCharCount += lineLength;
			}else {
				numBlankLines++;
				blankLineCharCount += lineLength;
			}
			i = i+1;
		}

		//	Calc percents
		var percentBlankLines 		= ( numBlankLines / pageString.split('\n').length * 100 ).toFixed(2),
			percentBlankLineChars 	= ( blankLineCharCount/pageString.length * 100 ).toFixed(2);


		//	Display differences
		console.log('');
		console.log('Whitespace Analysis');
		console.log('');
		console.log('url - ' + url);
		console.log('');
		console.log('# total characters : 		' + pageString.length);
		console.log('');
		console.log('# lines with text: 		' + numTextLines);
		console.log('# chars on text lines: 		' + textLineCharCount);
		console.log('');
		console.log('# lines without text: 		' + numBlankLines);
		console.log('# chars on blank lines:  	' + blankLineCharCount);
		console.log('');
		console.log('% lines without text: 		' + percentBlankLines+'%');
		console.log('% chars on blank lines:  	' + percentBlankLineChars+'%');
		console.log('');
	}
