import {gotoBlock} from './gotoblock.js';

/* Scroll to element */
export default function scrollTo() {
	const goToItems = document.querySelectorAll('.js-scroll-to');

    for (let i = 0; i < goToItems.length; i++) {
        const goToItem = goToItems[i];

        goToItem.addEventListener('click', (event) => {
            const selector = goToItem.getAttribute('href') || goToItem.getAttribute('data-goto');

            if (selector) {
                gotoBlock(selector, false, 800, 54);
            }

            event.preventDefault();
        });
    }
}
