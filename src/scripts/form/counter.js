/*
	  ----------------------
	|   СЧЁТЧИК КОЛИЧЕСТВА   |
	  ----------------------

	* Базовые атрибуты:
		* data-counter - обёртка счётчика
		* data-counter-decrease - кнопка уменьшения счётчика
		* data-counter-increase - кнопка увеличения счётчика
		* data-counter-input - input счётчика
			** data-value-min - минимальное значение
			** data-value-max - максимальное значение
*/

/**
   * @param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
*/
export default function counter(containerEl) {
	let counterItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			counterItems = containerEl.querySelectorAll('[data-counter]');
		}
	} else {
		counterItems = document.querySelectorAll('[data-counter]');
	}

	if (counterItems.length) {
        const getNewValue = (element, value) => {
            if (element.hasAttribute('data-counter-increase')) {
                value += 1;
            } else {
                value -= 1;
            }

            return value;
        };

        const init = (counterEl) => {
            const inputEl = counterEl.querySelector('[data-counter-input]');
            const decreaseEl = counterEl.querySelector('[data-counter-decrease]');
            const increaseEl = counterEl.querySelector('[data-counter-increase]');

            const checkValue = (value) => {
                const valueMin = inputEl.hasAttribute('data-value-min') ? inputEl.getAttribute('data-value-min') : 1;
                const valueMax = inputEl.hasAttribute('data-value-max') ? inputEl.getAttribute('data-value-max') : 100;

                // decreaseEl.removeAttribute('disabled');
                // decreaseEl.classList.remove('is-disabled');
                // increaseEl.removeAttribute('disabled');
                // increaseEl.classList.remove('is-disabled');

                if (value <= valueMin || value === '') {
                    value = valueMin;
                    // decreaseEl.setAttribute('disabled', 'disabled');
                    // decreaseEl.classList.add('is-disabled');
                } else if (valueMax && parseInt(value) >= valueMax) {
                    value = valueMax;
                    // increaseEl.setAttribute('disabled', 'disabled');
                    // increaseEl.classList.add('is-disabled');
                }

                inputEl.value = value;
            }

            if (!inputEl) return;

            counterEl.setAttribute('data-counter-init', '');

            checkValue(parseInt(inputEl.value));

            if (decreaseEl) {
                decreaseEl.addEventListener('click', () => {
                    const value = getNewValue(decreaseEl, parseInt(inputEl.value));

                    checkValue(value);
                });
            }

            if (increaseEl) {
                increaseEl.addEventListener('click', () => {
                    const value = getNewValue(increaseEl, parseInt(inputEl.value));

                    checkValue(value);
                });
            }

            inputEl.addEventListener('change', () => {
                checkValue(inputEl.value);
            });
        }

        counterItems.forEach((counterItem) => {
            if (!counterItem.hasAttribute('data-counter-init')) {
                init(counterItem);
            }
        });
    }
}
