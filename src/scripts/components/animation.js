// import { CountUp } from 'countup.js';

/*
	  ------------
	|   Animation  |
	  ------------

	* Basic Attributes:
		* data-animation - attribute to set animation to element
		* data-animation-number - attribute to animate numbers
			** The attribute value contains a number
			** data-animation-number-suffix - attribute to add a suffix after a number
				*** The suffix is ​​specified in the attribute value
*/

export default function animation() {
	const animItems = document.querySelectorAll('[data-animation]');

	const offset = (el) => {
		const rect = el.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		}
	};

	const showAnim = (animItem) => {
		const animItemHeight = animItem.getBoundingClientRect().height;
		const animItemOffset = offset(animItem).top;
		const animStart = 10;
		const animDelay = Number(animItem.getAttribute('data-delay')) || 0;

		let animItemPoint = window.innerHeight - animItemHeight / animStart;

		if (animItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight - window.innerHeight / animStart;
		}

		if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
			if (!animItem.classList.contains('is-anim')) {

				setTimeout(() => {
					animItem.classList.add('is-anim');

					// if (animItem.hasAttribute('data-anim-number')) {
					// 	const countUp = new CountUp(animItem, Number(animItem.getAttribute('data-anim-number')), {
					// 		suffix: animItem.hasAttribute('data-anim-number-suffix') ? animItem.getAttribute('data-anim-number-suffix') : '',
					// 		duration: 3,
					// 		separator: '',
					// 	});
					// 	countUp.start();
					// }
				}, animDelay);
			}
		} else {
			if (animItem.hasAttribute('data-animation-no-hidden')) {
				animItem.classList.remove('is-anim');
			}
		}
	};

	const animOnScroll = () => {
		animItems.forEach(animItem => {
			showAnim(animItem)
		});
	};

    if (animItems.length) {
        setTimeout(() => {
            animOnScroll();
        }, 300);

        window.addEventListener('scroll', animOnScroll);
    }
}
