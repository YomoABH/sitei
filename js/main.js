/*
1. вывести квиз на страницу +
2. обработчики кликов на кнопки +
3. переход к следующему вопросу +
4. валидация (нельзя не заполнить какой-то вопрос) +
5. добавление к отправке +
5.1. сбор данных +
6. отправка данных +

*/

const quizTemplate = (data = [], dataLength, options) => {
	const { number, title } = data;
	const { nextBtnText } = options;
	const answers = data.answers.map(item => {
		return `
		
			<label class="quiz-label">
				${item.type == 'text' ? `<span>${item.answer_title}</span>` : ''}
				<input type="${item.type}" data-valid="false" class="quiz-input" name="${data.answer_alias}"   value="${item.type !== 'text' ? item.answer_title : ''}">
				${item.type != 'text' ? `<span>${item.answer_title}</span>` : ''}
			</label>

		`;
	});

	return `
	
		<div class="quiz-content">
			<div class="quiz-questions">Шаг ${number} / ${dataLength}</div>
			<div class="quiz-question">
				<h3 class="quiz-questions-title">${title}</h3>
				<div class="quiz-questions__answers">
					${answers.join('')}
				</div>
				<div class="btn-container">
					<button type="button" class="quiz-btn quiz-prev-btn" data-prev-btn>${options.prevBtnText}</button>
					<button type="button" class="quiz-btn" data-next-btn>${nextBtnText}</button>
				</div>
			</div>
		</div>
	
	`;
};


// const quiz = document.querySelector('.quiz');
// quiz.innerHTML = quizTemplate(quizData[0], quizData.length);

class Quiz {
	constructor(selector, data, options) {
		this.$el = document.querySelector(selector);
		this.options = options;
		this.data = data;
		this.counter = 0;
		this.dataLength = this.data.length;
		this.resultArray = [];
		this.tmp = {};
		this.init();
		this.events();
	}

	init() {
		console.log('init!');
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
	}

	events() {
		this.$el.addEventListener('click', (e) => {
			if (e.target == document.querySelector('[data-next-btn]')) {
				this.addToSend();
				this.nextQuestion();
			}
			if (e.target == document.querySelector('[data-prev-btn]')) {
				this.prevQuestion();
			}

			if (e.target == document.querySelector('[data-send]')) {
				this.addToSend();
				this.send();
			}
		});

		this.$el.addEventListener('change', (e) => {
			if (e.target.tagName == 'INPUT') {
				if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
					let elements = this.$el.querySelectorAll('input');

					elements.forEach(el => el.checked = false);
				}

				this.tmp = this.serialize(this.$el);
			}
			console.log(this.tmp);
		});
	}

	nextQuestion() {
		if (this.valid()) {
			console.log('next question!');
			if (this.counter + 1 < this.dataLength) {
				this.counter++;
				this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);

				if (this.counter + 1 == this.dataLength) {
					this.$el.querySelector('.btn-container').insertAdjacentHTML("afterbegin", `<button type="button" class="quiz-btn" data-send>${this.options.sendBtnText}</button>`);
					this.$el.querySelector('[data-next-btn]').remove();
					this.$el.querySelector('[data-prev-btn]').remove();
					this.$el.querySelector('.btn-container').insertAdjacentHTML("afterbegin", `<button type="button" class="quiz-btn quiz-prev-btn" data-prev-btn>${this.options.prevBtnText}</button>`);
				}
			}
		}
	}
	prevQuestion() {

		console.log('prev question!');
		if (this.counter - 1 >= 0) {
			this.removeToSend()
			this.counter--;
			this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
		}

	}

	valid() {
		let isValid = false;
		let elements = this.$el.querySelectorAll('input');
		elements.forEach(el => {
			switch (el.type) {
				case 'text':
					(el.value) ? isValid = true : el.classList.add('error');
				case 'checkbox':
					(el.checked) ? isValid = true : el.classList.add('error');
				case 'radio':
					(el.checked) ? isValid = true : el.classList.add('error');
			}
		});

		return isValid;
	}

	addToSend() {
		this.resultArray.push(this.tmp);
	}
	removeToSend() {
		this.resultArray.pop()
	}

	send() {
		if (this.valid()) {
			console.log('send!');

			let elements = this.$el.querySelectorAll('input');
			elements.forEach(el => el.classList.remove('error'));


			const formData = new FormData();

			for (let item of this.resultArray) {
				for (let obj in item) {
					formData.append(obj, item[obj].substring(0, item[obj].length - 1))
					console.log(formData.getAll(obj));
				}
			}
			location.reload()
		}
	}

	serialize(form) {
		let field, s = {};
		let valueString = '';
		if (typeof form == 'object' && form.nodeName == "FORM") {
			let len = form.elements.length;
			for (let i = 0; i < len; i++) {
				field = form.elements[i];

				if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
					if (field.type == 'select-multiple') {
						for (j = form.elements[i].options.length - 1; j >= 0; j--) {
							if (field.options[j].selected)
								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					} else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
						valueString += field.value + ',';

						s[field.name] = valueString;


					}
				}
			}
		}
		return s
	}
}

window.quiz = new Quiz('.quiz', quizData, {
	nextBtnText: "Далее",
	prevBtnText: "Назад",
	sendBtnText: "Отправить"
});