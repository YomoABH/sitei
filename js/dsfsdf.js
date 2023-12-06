const quizTemplate = (data = [], steps, options) => {
	const { number, title } = data

	const answers = data.answers.map(item => {
		return `
			<label class="quiz-label">
				<input 
				type="${item.type}" 
				data-valid="false" 
				class="quiz-input" 
				name="${data.answer_alias}"
				value="${item.type !== 'text' ? item.answer_title : ""}"
				>
				<span>${item.answer_title}</span>
			</label>
		`
	})
	return `
	<div class="quiz-content">
		<div class="quiz-questions"> Шаг ${number} / ${steps}</div>
			<div class="quiz-question">
			<h3 class="quiz-questions-title">${title}</h3>
			<div class="quiz-questions__answers">${answers.join("")}</div>
			<button class="quiz-btn" type="button" data-next-btn>${options.nextBtnText}</button>
		</div>
	</div>

	`
}



// const quiz = document.querySelector('.quiz')
// quiz.innerHTML = quizTemplate(quizData[0], quizData.length)


class Quiz {
	constructor(selector, data, options) {
		this.$el = document.querySelector(selector)
		this.options = options
		this.data = data
		this.counter = 0
		this.steps = this.data.length
		this.resultArray = []
		this.init()
		this.events()
	}

	init() {
		console.log(this.steps);
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.steps, this.options)
	}

	events() {
		this.$el.addEventListener('click', (e) => {
			if (e.target == document.querySelector('[data-next-btn]')) {
				this.nextQuestion()
			}
		})
	}

	nextQuestion() {
		console.log('next')

		if (this.counter + 1 < this.steps) {
			this.counter++
			this.$el.innerHTML = quizTemplate(quizData[this.counter], this.steps, this.options)
			if (this.counter + 1 == this.steps) {
				this.$el.insertAdjacentHTML('beforeend', `<button type="submit" class="quiz-send-btn" data-send>${this.options.sendBtnText}</button>`)
				this.$el.querySelector('[data-next-btn]').remove()
			}
		}
	}
}

window.quiz = new Quiz('.quiz', quizData, {
	nextBtnText: "Далее",
	sendBtnText: "Отправить"
})