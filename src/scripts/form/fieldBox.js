/*
	  --------------
	|   ПОЛЯ ФОРМЫ   |
	  --------------

	* Базовые атрибуты:
		* data-field - обёртка для поля
			** data-field-password - атрибут для возможности показать пароль
		* data-field-input - элемент input
		* data-field-icon - иконка поля (необходима для отображения/скрытия пароля)
*/

export default function fieldBox(containerEl) {
	/*
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let fiedlsItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			fiedlsItems = containerEl.querySelectorAll('[data-field-box]');
		}
	} else {
		fiedlsItems = document.querySelectorAll('[data-field-box]');
	}

    if (fiedlsItems.length) {
        fiedlsItems.forEach((item) => {
            const changeInput = (inputEl) => {
                const val = inputEl.value.trim();

                if (val !== '') {
                    item.classList.add('is-filed');
                } else {
                    item.classList.remove('is-filed');
                }
            }

            const fieldInit = () => {
                const inputEl = item.querySelector('[data-field-box-input]');

                item.setAttribute('data-field-box-init', '');

                if (inputEl) {
                    changeInput(inputEl);

                    inputEl.onfocus = () => {
                        item.classList.add('is-focused');
                    };

                    inputEl.onblur = () => {
                        item.classList.remove('is-focused');
                    };

                    inputEl.addEventListener('change', () => {
                        changeInput(inputEl);
                    });
                }
            }

            if (!item.hasAttribute('data-field-box-init')) {
                fieldInit();
            }
        });
    }
}
