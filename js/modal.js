const modalBtn = document.querySelector('.close-btn')
modalBtn.addEventListener('click', () => {
	document.body.classList.add('close')
})

const targetButton = document.querySelectorAll('.button')
targetButton.forEach(el => {
	el.addEventListener('click', () => {
		document.body.classList.remove('close')
	})
})
