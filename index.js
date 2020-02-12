$(document).ready()

$('.start').click( event=>{
	questionRender();
	$('.start').replaceWith();
	nextQuestion();
});


let i = 0;
let questNum = 1;
let score = 0;

//rendering questions

function questionRender(){
	$('main').find('#container').replaceWith(`<h3>${quiz[i].question}</h3><form class="quizForm"><input type="radio" name="answer" value="${quiz[i].answers[0]}" required>${quiz[i].answers[0]}<br><input type="radio" name="answer" value="${quiz[i].answers[1]}">${quiz[i].answers[1]}<br><input type="radio" name="answer" value="${quiz[i].answers[2]}">${quiz[i].answers[2]}<br><input type="radio" name="answer" value="${quiz[i].answers[3]}">${quiz[i].answers[3]}<br><button class='submit'>Submit</button></form>`);
	quizSubmit();
	questionCounter();
	scoreCounter();
}

// removes notification windows
function removeWindow(){
	$(event.target).closest('.incorrect').remove();
	$(event.target).closest('.correct').remove();
}

//handles each questions submission

function quizSubmit(){
	$('.quizForm').submit(event=> {
		let finalScore = score * 10;
	 	event.preventDefault();
		 	if($('input:checked').val() === quiz[i].correct){
		 		score += 1;
		 		scoreCounter();
		 		$('body').append(`<section label="passed" class="correct"><h3>You got it right!</h3><button class="next">Next Question</button></section>`);
		 	} else {
		 		$('body').append(`<section label="incorrect window" class="incorrect"><h3>Sorry! You got it wrong.</h3><p>The correct answer was <br><span id="question">${quiz[i].correct}</span></p><button class="next">Next Question</button></section>`);
		 	};
		 	$('main').empty();
		 	$('main').append("<section id= 'container'></section>")
	});
};
//removes elements and moves on to next question

function nextQuestion(){
	$('body').on('click', '.next', event=> {
		console.log('clickity')
		let finalScore = score * 10;
		if (questNum < 10){
			i++;
			removeWindow();
			questionRender();
			questNum ++;
			questionCounter();
		} else {
		 	if (finalScore > 50){
		 		removeWindow();
		 		$('body').append(`<section label="passed" class="correct"><h3>You passed with a ${finalScore}%!</h3><button class="retry">Retry?</button></section>`);
		 		retryButton();
		 	} else {
		 		removeWindow();
		 		$('body').append(`<section label="incorrect window" class="incorrect"><h3>Sorry! You failed with a ${finalScore}%</span></p><button class="retry">Retry?</button></section>`);
		 		retryButton();
		 	}
		 }
	});
};

//handles questions count
function questionCounter(){
	$('.questionNum').text(`${questNum}`);
}

//handles score count
function scoreCounter(){
	$('.questionsRight').text(`${score}`);
}

//restart quiz
function retryButton(){
	$('body').on('click', '.retry', event=>{
		i = 0;
		questNum = 1;
		score = 0;
		event.stopPropagation()
		removeWindow();
		$('main').empty();
		$('main').append("<section id= 'container'></section>")
		questionRender();
	})
}