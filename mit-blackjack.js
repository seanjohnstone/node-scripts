
	//	Monty Hall Simulation

	var arguments 		= process.argv,
		total			= 0,
		nodeString		= arguments[0],
		thisFilePath	= arguments[1],
		maxN			= 1000000;	// one million

	//	Run Process
	if(typeof arguments[2] == 'undefined' || arguments[2] > maxN) {
		console.log('Please Enter legal parameters ( ' + maxN + 'max )');
		process.exit(1);
	}

	var numberOfRuns 	= arguments[2];
	
	//	Output
	console.log('');
	console.log('Monty Hall Simulation');
	console.log('------------------');
	console.log('');
	console.log('Number of runs: ' + numberOfRuns);
	console.log('');
	console.log('Player doesn\'t switch');
	runOneTest(0, numberOfRuns);
	console.log('Player switches');
	runOneTest(1, numberOfRuns);
	console.log('');

	//	Runs n simulations of the Monty Hall Problem
	//	with the decision of the participant to either always switch
	//	doors or never switch.
	function runOneTest(choice, n) {

		var wins 	= 0,
			losses 	= 0;

		//	Run N Cases
		for(var i = 0; i < n;) {
			//	Play one round
			var options			= 	[1,2,3],
				correctAnswer 	= 	getRandomInt(1,4),	// 1-3
				initialChoice 	= 	getRandomInt(1,4),	// 1-3
				secondSet = [],
				finalAnswer;

			//	Decide on value to use as other option
			secondSet.push(options.splice(options.indexOf(initialChoice),1));
			if(initialChoice != correctAnswer) {
				//	Correct answer given as the other option
				secondSet.push(options.splice(options.indexOf(correctAnswer),1));
			}else {
				//	Random other door given as other option
				secondSet.push(options.splice(getRandomInt(0,options.length),1));
			}

			//	Make a choice (or don't)
			if(choice == 1 ) {	//	User makes switch to remaining possible choice
				finalAnswer = secondSet[1];
			}else{				//	Doesn't make switch, use your initial guess
				finalAnswer = secondSet[0];
			}
			if(finalAnswer == correctAnswer) {
				wins++;
			}else {
				losses++;
			}
			i = i+1;
		}

		console.log('');
		console.log('	Wins: 		' + wins);
		console.log('	Losses: 	' + losses);
		console.log('');		
	}


	//	Returns a random int between min(included) and max (excluded)
	//	Using math.round will give non-uniform distribution.
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	



