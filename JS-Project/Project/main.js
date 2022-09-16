let quizes = [];

//static quiz datas in local host
if (!localStorage.getItem("quizes"))
	localStorage.setItem(
		"quizes",
		JSON.stringify([
			{
				id: 1,
				title: "CSS Quiz",
				serial:"abc1",
				count: 5,
				timeout: "8",
				questions: [
					{ id: 1, title: "What does CSS stand for?", options: ["Creative Style Sheets", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"], correct: "4" },
					{ id: 2, title: "Which HTML attribute is used to define inline styles?", options: ["Style", "Class", "Fonts", "Styles"], correct: "1" },
					{ id: 3, title: "Which property is used to change the background color?", options: ["Background Color", "Color", "BGColor", "Red"], correct: "1" },
					{ id: 4, title: "Which CSS property is used to change the text color of an element?", options: ["Color", "FGColor", "Text Color", "blue"], correct: "1" },
					{ id: 5, title: "Which CSS property controls the text size?", options: ["Font Style", "Font Size", "Text Size ", "Text Style"], correct: "2" },

				],
			},
			{
				id: 3,
				title: "Odd Words",
				serial:"abc2",
				count: 5,
				timeout: "7",
				questions: [
					{ id: 1, title: "word ?", options: ["parol", "job", "letter", "term"], correct: "2" },
					{ id: 2, title: "work ?", options: ["duty", "operations", "job", "great"], correct: "4" },
					{ id: 3, title: "hand ?", options: ["foot", "eye", "pen", "toes"], correct: "3" },
					{ id: 4, title: "lion ?", options: ["cat", "chicken", "horse", "whale"], correct: "2" },
					{ id: 5, title: "pencil", options: ["dog", "book", "class", "teacher"], correct: "1" },
				],
			},
		])
	);

quizes = JSON.parse(localStorage.getItem("quizes"));

class QuizList {
	constructor(quizContainer) {
		this.quizContainer = quizContainer;
		this.generateQuizes();
	}
	generateQuizes() {
		let iconSrc = "images/test-icon.png";
		let quizTitle;
         
		quizes.forEach((quiz) => {
			quizTitle = quiz.title;
			quizContainer.insertAdjacentHTML(
				"beforeend",
				`
            <div class="quiz-item">
				<div>
					<img class="quiz-item-icon" src=${iconSrc} alt="test icon" />
					<p class="quiz-item-title">${quizTitle}</p>
				</div>
				<a href="quiz.html#${quiz.serial}"><button>Show quiz</button></a>
			</div> `
			);
		});
	}
}

let quizContainer = document.querySelector("#quiz-list");
let mainList = new QuizList(quizContainer);
