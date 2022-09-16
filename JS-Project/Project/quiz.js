

var quizes = [];
quizes = JSON.parse(localStorage.getItem("quizes"));

class TakeQuiz {
	constructor() {
		this.point = 0;
		this.quizserial = location.hash.slice(1);
		this.quiz;
		quizes.forEach((q) => {
			if (q.serial == this.quizserial) this.quiz = q;
		});
		this.render();
	}
	render() {
		var titleElem = document.querySelector("#header-quiz-title");
		var serialem = document.querySelector("#serial");
		var countElem = document.querySelector("#count-value");
		var submitAnswersBtn = document.querySelector("#submit-adswers");
		titleElem.innerHTML = this.quiz.title;
		serialem.innerHTML=this.quiz.serial;
		countElem.innerHTML = this.quiz.count;
		this.timeoutMaker();
		submitAnswersBtn.addEventListener("click", () => {
			this.getQuizResult();
		});
		this.generateQuestions();
	}
	timeoutMaker() {
		var timeoutElem = document.querySelector("#timer-value");
		var timeoutMinute = +this.quiz.timeout;
		var min = timeoutMinute - 1;
		var sec = 59;
		setInterval(timeoutHandler, 1000);
		function timeoutHandler() {
			if (sec < 0) {
				min--;
				sec = 59;
				timeoutElem.innerHTML = `${min}:${sec}`;
				sec--;
			} else {
				timeoutElem.innerHTML = `${min}:${sec}`;
				sec--;
			}
			if (sec == 0 && min == 0) {
				this.getQuizResult();
				clearInterval();
			}
		}
	}
	generateQuestions() {
		var questionsContainer = document.querySelector(".question-list");
		this.quiz.questions.forEach((question) => {
			questionsContainer.insertAdjacentHTML(
				"beforeend",
				`
        <div class="question">
        <p class="question-number">${question.id}</p>
        <div>
            <p class="question-title">.${question.title}</p>
            <div class="question-answers">
                <div>
                    <input type="radio" id="${question.id}answer1" name="${question.id}answer" />
                    <label for="${question.id}answer1">1.${question.options[0]}</label>
                </div>
                <div>
                    <input type="radio" id="${question.id}answer2" name="${question.id}answer" />
                    <label for="${question.id}answer2">2.${question.options[1]}</label>
                </div>
                <div>
                    <input type="radio" id="${question.id}answer3" name="${question.id}answer" />
                    <label for="${question.id}answer3">3.${question.options[2]}</label>
                </div>
                <div>
                    <input type="radio" id="${question.id}answer4" name="${question.id}answer" />
                    <label for="${question.id}answer4">4.${question.options[3]}</label>
                </div>
            </div>
        </div>
    </div>
        `
			);
		});
	}

	getQuizResult() {
		var questions = document.querySelectorAll(".question-answers");
		var correctAnswers = [];
		var checkedAnswer = [];

		questions.forEach((question) => {
			var inputs = question.querySelectorAll("input");

			var isChecked = 0;
			inputs.forEach((input) => {
				if (input.checked) {
					checkedAnswer.push(+input.id.slice(7));
					isChecked = 1;
				}
			});
			if (isChecked == 0) checkedAnswer.push(0);
		});

		this.quiz.questions.forEach((question) => {
			correctAnswers.push(+question.correct);
		});

		var questinsCount = this.quiz.questions.length;
		var eachQuestionPoint = 100 / questinsCount;

		var i = 0;
		while (i < correctAnswers.length) {
			if (correctAnswers[i] == checkedAnswer[i]) {
				this.point += eachQuestionPoint;
			}
			i++;
		}

		var questionsContainer = document.querySelector(".question-list");
		var answerQuestionTitle = document.querySelector(".answer-the-test");
		var timeoutElem = document.querySelector("#timer-value");
		var submitBtn = document.querySelector("#submit-adswers");
		var cancelBtn = document.querySelector("#cancel-quiz");

		questionsContainer.innerHTML = `
        <h2 class="answer-the-test" style="color:green; margin:100px 0"> ${this.point}%</h2>  `;
		answerQuestionTitle.innerHTML = "Your Score ";
		timeoutElem.style.display = "none";
		submitBtn.style.display = "none";
		cancelBtn.innerHTML = "Back To Home";
	}
}

var holdingQuiz = new TakeQuiz();