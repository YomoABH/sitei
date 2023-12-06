const quizData = [{
	number: 1,
	title: "Укажите какая сумма интересует",
	answer_alias: "money",
	answers: [
		{
			answer_title: "до 1000  BYN",
			type: "radio",
			status: 'checked'
		},
		{
			answer_title: "от 1000 до 3000 BYN",
			type: "radio"
		},
		{
			answer_title: "от 3000 до 7000 BYN",
			type: "radio"
		},
		{
			answer_title: "от 7000 до 15000 BYN",
			type: "radio"
		},
		{
			answer_title: "свыше 15000 BYN",
			type: "radio"
		},

	]
},
{
	number: 2,
	title: "Официально работаете?",
	answer_alias: "work",
	answers: [{
		answer_title: "да, более 3 месяцев",
		type: "radio",
		status: 'checked'
	},
	{
		answer_title: "да, менее 3 месяцев",
		type: "radio"
	},
	{
		answer_title: "работаю не официально",
		type: "radio"
	},
	{
		answer_title: "не работаю",
		type: "radio"
	},
	{
		answer_title: "декретный отпуск",
		type: "radio"
	},
	{
		answer_title: "пенсионер/студент",
		type: "radio"
	},
	]
},
{
	number: 3,
	title: "Ваша кредитная история",
	answer_alias: "history",
	answers: [{
		answer_title: "хорошая",
		type: "radio"
	},
	{
		answer_title: "плохая",
		type: "radio"
	},
	{
		answer_title: "работаю не официально",
		type: "radio"
	},
	{
		answer_title: "не знаю",
		type: "radio"
	},
	{
		answer_title: "есть действующие просрочки",
		type: "radio"
	},
	{
		answer_title: "есть исполнительные листы/штрафы",
		type: "radio"
	},
	]
},
{
	number: 4,
	title: "Оставьте свой телефон, мы вам перезвоним",
	answer_alias: "phone",
	answers: [
		{
			answer_title: "Имя *",
			type: "text"
		},
		{
			answer_title: "Ваш город /населенный пункт",
			type: "text"
		},
		{
			answer_title: "Телефон *",
			type: "text"
		},
	]
}
];