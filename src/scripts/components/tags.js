export default function tagsMenu() {
	const tagsItems = document.querySelectorAll('[data-tags]');

	for (let i = 0; i < tagsItems.length; i += 1) {
		const tabMenu = tagsItems[i];
		const tagsButtons = tabMenu.querySelectorAll('[data-tags-item]');
		const tagsClear = tabMenu.querySelector('[data-tags-clear]');

		for (let j = 0; j < tagsButtons.length; j += 1) {
			const tagsButton = tagsButtons[j];

			tagsButton.addEventListener('click', () => {
				let tagsButtonActive;

				tagsButton.classList.toggle('is-active');
				tagsButtonActive = tabMenu.querySelector('[data-tags-item].is-active');

				if (tagsClear) {
					if (tagsButtonActive) {
						tagsClear.classList.remove('is-hidden');
					} else {
						tagsClear.classList.add('is-hidden');
					}
				}
			});
		}

		if (tagsClear) {
			tagsClear.addEventListener('click', () => {
				tagsButtons.forEach((tagsButton) => {
					if (tagsButton.classList.contains) {
						tagsButton.classList.remove('is-active');
					}
				});

				tagsClear.classList.add('is-hidden');
			});
		}
	}
}
