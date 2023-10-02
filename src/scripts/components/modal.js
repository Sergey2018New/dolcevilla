/*
	  --------
	|   MODAL  |
	  --------

	* Basic Attributes:
		* data-modal-open - attribute for opening a modal window, the value specifies the modal window selector
		* data-modal - modal window
		* data-modal-window - visible part of the modal window
		* data-modal-close - attribute to close the modal window

	* Modal window initialization
		modal.init()

	* Callback functions when opening and closing a modal window
		modal.beforeOpen(callback) - Callback function before opening modal window
		modal.afterOpen(callback) - Callback function after opening modal window
		modal.beforeClose(callback) - Callback function before modal closes
		modal.afterClose(callback) - Callback function after closing the modal window
*/

const html = document.documentElement;
const body = document.querySelector('body');
const timeout = 300;
let modalSelectorOpen = null;
let modal = {};
let unlock = true;
let isOpen = false;

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const focusElements = [
	'a[href]',
	'area[href]',
	'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
	'select:not([disabled]):not([aria-hidden])',
	'textarea:not([disabled]):not([aria-hidden])',
	'button:not([disabled]):not([aria-hidden])',
	'iframe',
	'object',
	'embed',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])'
];

modal.beforeOpen = (callbackCurrent) => {
	callback(callbackCurrent);
};
modal.beforeClose = (callbackCurrent) => {
	callback(callbackCurrent);
};
modal.afterOpen = (callbackCurrent) => {
	callback(callbackCurrent);
};
modal.afterClose = (callbackCurrent) => {
	callback(callbackCurrent);
};

modal.init = (beforeOpenCallback, beforeCloseCallback) => {
	document.addEventListener('click', (e) => {
		const target = e.target;

		if (target.closest('[data-modal-open]') || target.hasAttribute('data-modal-open')) {
			const modalSelector = target.getAttribute('data-modal-open') || target.closest('[data-modal-open]').getAttribute('data-modal-open');
			const currentModal = modalSelector ? document.querySelector(modalSelector) : '';

			modalSelectorOpen = target.hasAttribute('data-modal-open') ? target :
            target.closest('[data-modal-open]');

			e.preventDefault();

			if (currentModal) {
				if (isOpen) {
					const activeModal = document.querySelector('[data-modal].is-active');

					if (activeModal) {
						closeModal(activeModal, true);
					}

					openModal(currentModal, true);

					setTimeout(() => {

					}, timeout);
				} else {
					openModal(currentModal);
				}
			}
		}

		if (isOpen && (target.closest('[data-modal-close]') || target.hasAttribute('data-modal-close') ||
			!target.closest('[data-modal-window]') && !target.hasAttribute('data-modal-window'))
		) {
			const currentModal = target.hasAttribute("data-modal") ? target : target.closest('[data-modal]') || '';
			closeModal(currentModal);
			e.preventDefault();
		}
	});

	document.addEventListener('keydown', (e) => {
		const modalActive = document.querySelector('[data-modal].is-active');

		if (e.which === 27 && isOpen) {
			closeModal(modalActive);
			return;
		}

		if (e.which == 9 && isOpen) {
			focusCatcher(e, modalActive);
			return;
		}
	});
};

modal.open = (selector, callbackCurrent) => {
	const currentModal = selector && typeof selector == 'string' ? document.querySelector(selector) : '';

	callback(callbackCurrent);
	openModal(currentModal);
};

document.addEventListener('touchstart', function(event) {
	touchstartX = event.changedTouches[0].screenX;
	touchstartY = event.changedTouches[0].screenY;
}, false);

addEventListener("touchmove", (event) => {
	const target = event.changedTouches[0].target;
	touchendX = event.changedTouches[0].screenX;
	touchendY = event.changedTouches[0].screenY;

	const touchY = Math.abs(touchendY - touchstartY);

	if (handleGesture() === 'down' && touchY > 0 && !target.hasAttribute('data-modal-window') && !target.closest('[data-modal-window]') && (target.hasAttribute('data-modal') || target.closest('[data-modal]'))) {
		const activeModal = document.querySelector('[data-modal].is-active');

		if (activeModal) {
			const modalWrap = activeModal.querySelector('[data-modal-wrap]');

			if (modalWrap) {
				activeModal.classList.add('is-dragged');
				modalWrap.style.transform = `translate3d(0,${touchY}px,0)`;
			}
		}
	}
});

document.addEventListener('touchend', function(event) {
	const target = event.changedTouches[0].target;

	touchendX = event.changedTouches[0].screenX;
	touchendY = event.changedTouches[0].screenY;

	const touchY = Math.abs(touchendY - touchstartY);

	if (!target.hasAttribute('data-modal-window') && !target.closest('[data-modal-window]') && (target.hasAttribute('data-modal') || target.closest('[data-modal]'))) {
		const activeModal = document.querySelector('[data-modal].is-active');

		if (activeModal) {
			const modalWrap = activeModal.querySelector('[data-modal-wrap]');

			if (modalWrap) {
				modalWrap.style.removeProperty('transform');
				activeModal.classList.remove('is-dragged')

				// if (handleGesture() === 'down' && touchY >= 30) {
				// 	closeModal(activeModal);
				// }
			}
		}
	}
}, false);

function openModal(currentModal, isDoubleModal = false) {
	if (currentModal && !isOpen && unlock || isDoubleModal) {

		if (!isDoubleModal) {
			modal.beforeOpen();
		}

		currentModal.setAttribute('aria-hidden', false);
		currentModal.classList.add('is-visible');

		const modalWindow = currentModal.querySelector('[data-modal-window]');


		setTimeout(() => {
			currentModal.classList.add('is-active');
		}, 10);

		isOpen = true;

		if (!isDoubleModal) {
			bodyLock();

			setTimeout(() => {
				modal.afterOpen();

				if (modalWindow) {
					modalWindow.focus();
				}

			}, timeout);
		}
	}
}

function closeModal(activeModal, isDoubleModal = false) {
	if (isOpen && unlock && activeModal) {
		modal.beforeClose();

		activeModal.setAttribute('aria-hidden', true);
		activeModal.classList.remove('is-active');

		if (!isDoubleModal) {
			bodyUnlock();
		}

		setTimeout(() => {
			activeModal.scrollTop = 0;
			activeModal.querySelector('[data-modal-window]').scrollTop = 0;
			activeModal.classList.remove('is-visible');

			if (!isDoubleModal) {
				isOpen = false;

				if (modalSelectorOpen) {
					modalSelectorOpen.focus();
				}

				modal.afterClose();
			}
		}, timeout);
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

	html.style.setProperty('--modal-lock-padding-right', lockPaddingValue);
	body.classList.add('is-modal-active');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	unlock = false;

	setTimeout(() => {
		html.style.removeProperty('--modal-lock-padding-right');
		body.classList.remove('is-modal-active');

		unlock = true;
	}, timeout);
}

function callback (callbackCurrent) {;
	if (callbackCurrent && typeof callbackCurrent === 'function') {
		callbackCurrent();
	}
}

function focusCatcher(e, modal){
    // Находим все элементы на которые можно сфокусироваться
    const nodes = modal.querySelectorAll(focusElements);

    //преобразуем в массив
    const nodesArray = Array.prototype.slice.call(nodes);

    //если фокуса нет в окне, то вставляем фокус на первый элемент
    if (!modal.contains(document.activeElement)) {
        nodesArray[0].focus();
        e.preventDefault();
    } else {
        const focusedItemIndex = nodesArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedItemIndex === 0) {
            //перенос фокуса на последний элемент
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }

        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            //перенос фокуса на первый элемент
            nodesArray[0].focus();
            e.preventDefault();
        }
    }
}

function handleGesture() {
	const touchX = touchendX - touchstartX;
	const touchY = Math.abs(touchendY - touchstartY);

	if (touchY <= 30 && touchX < 0 && Math.abs(touchX) >= 40) {
		return 'left';
	}

	if (touchY <= 30 && touchX > 0 && Math.abs(touchX) >= 40) {
		return 'right';
	}

	if (touchendY < touchstartY ) {
		return 'up';
	}

	if (touchendY > touchstartY ) {
		return 'down';
	}

	if (touchendY === touchstartY) {
		return 'tap';
	}
}

export {modal};
