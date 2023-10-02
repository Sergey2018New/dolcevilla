export default function tabMenu() {
	const tabMenuItems = document.querySelectorAll('[data-tab-menu]');

	for (let i = 0; i < tabMenuItems.length; i += 1) {
		const tabMenu = tabMenuItems[i];
		const tabMenuButtons = tabMenu.querySelectorAll('[data-tab-menu-item]');

		for (let j = 0; j < tabMenuButtons.length; j++) {
			const tabMenuButton = tabMenuButtons[j];

			tabMenuButton.addEventListener('click', () => {
				const tabMenuButtonActive = tabMenu.querySelector('[data-tab-menu-item].is-active');

				if (tabMenuButtonActive) {
					tabMenuButtonActive.classList.remove('is-active');
				}

				tabMenuButton.classList.add('is-active');
			});
		}
	}
}
