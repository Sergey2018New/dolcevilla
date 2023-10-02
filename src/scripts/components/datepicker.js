
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";

// import IMask from 'imask';

/*
	Vanillajs-datepicker
	https://mymth.github.io/vanillajs-datepicker/#/
*/

export default function datepicker(datepickerSelectors) {
	/*
		@param  {Element} datepickerSelectors - HTML container element, default document
	*/

	let datepickers;

	if (datepickerSelectors && typeof datepickerSelectors === 'object' && datepickerSelectors.length > 0) {
		datepickers = datepickerSelectors;
	} else {
		datepickers = document.querySelectorAll('[data-datepicker]');
	}

	if (datepickers) {
        datepickers.forEach((datepickerEl) => {
            const datepickerInput = datepickerEl.querySelector('[data-datepicker-input]');
            const datepickerInputSelected = datepickerEl.querySelector('[data-datepicker-input-selected]');
            let datepicker;
            let isApplyDate = false;
            let isClosing = false;

            const checkControlApply = (controlApply, selectedDates) => {
                if (controlApply) {

                    if (selectedDates.length > 1) {
                        controlApply.removeAttribute('disabled');
                        controlApply.classList.remove('is-disabled');
                        isApplyDate = true;

                        setTimeout(() => {
                            controlApply.focus();
                        }, 10);
                    } else {
                        controlApply.setAttribute('disabled', 'disabled');
                        controlApply.classList.add('is-disabled');
                        isApplyDate = false;
                    }
                }
            };

            const options = {
                static: datepickerInput ? false : true,
                monthSelectorType: 'static',
                locale: Russian,
                position: "auto left",
                disableMobile: true,
                mode: datepickerInput ? 'range' : 'single',
                minDate: "today",
                dateFormat: 'd.m.Y',
                defaultDate: datepickerInput ? [new Date(), new Date().fp_incr(6)] : new Date(),

                onReady: function(selectedDates, dateStr, instance){
                    const eventChange = new Event('change');
                    const calendarContainer = instance.calendarContainer;
                    const container = instance.rContainer;
                    const currentMonth = calendarContainer.querySelector('.flatpickr-current-month');;
                    const footer = document.createElement('div');
                    const currentYear = document.createElement('div');
                    let controlApply;
                    let controlCancel;
                    const setApplyDate = () => {
                        isClosing = true;
                        datepickerInput.focus();
                        datepicker.close();

                        if (isApplyDate && datepickerInputSelected) {
                            datepickerInputSelected.value = instance.input.value;
                            datepickerInputSelected.dispatchEvent(eventChange);
                        }
                    }

                    if (datepickerInput) {
                        footer.className = 'flatpickr-footer';
                        footer.innerHTML = `<button type="button" class="flatpickr-button flatpickr-button-apply ui-button ui-button_size_sm">Применить</button><button type="button" class="flatpickr-button flatpickr-button-cancel ui-button ui-button_size_sm ui-button_style_outline">Отмена</button>`;
                        container.append(footer);
                    }

                    currentYear.className = 'flatpickr-current-year';
                    currentYear.innerHTML = instance.currentYear;

                    if (datepickerInput) {
                        // Cancel
                        controlCancel = footer.querySelector('.flatpickr-button-cancel');

                        if (controlCancel) {
                            controlCancel.addEventListener('click', () => {
                                isClosing = true;
                                datepicker.close();
                            });
                        }

                        // Apply
                        controlApply = footer.querySelector('.flatpickr-button-apply');

                        if (datepickerInputSelected) {
                            datepickerInputSelected.value = instance.input.value;
                            datepickerInputSelected.dispatchEvent(eventChange);

                            datepickerInputSelected.addEventListener('change', () => {
                                if (datepickerInputSelected.value === '' ) {
                                    datepicker.clear();
                                    datepicker.close();
                                }
                            });
                        }

                        checkControlApply(controlApply, selectedDates);

                        if (controlApply) {
                            controlApply.addEventListener('mousedown', () => {
                                setApplyDate();
                            });
                        }

                        calendarContainer.addEventListener('keyup', (e) => {
                            if ((e.code === 'Space' || e.code === 'Enter' || e.key === 'Enter')
                                && document.activeElement === controlApply) {
                                setApplyDate();
                            }
                        });
                    }

                    // Current month and Current year
                    if (currentMonth) {
                        currentMonth.append(currentYear);
                    }
                },

                onChange: function(selectedDates, dateStr, instance) {
                    if (datepickerInput) {
                        const calendarContainer = instance.calendarContainer;
                        const controlApply = calendarContainer.querySelector('.flatpickr-button-apply');

                        checkControlApply(controlApply, selectedDates);

                        datepicker.open();
                        isClosing = false;
                    }
                },

                onYearChange: function(selectedDates, dateStr, instance) {
                    const calendarContainer = instance.calendarContainer;
                    const currentYear = calendarContainer.querySelector('.flatpickr-current-year');

                    if (currentYear) {
                        currentYear.innerHTML = instance.currentYear;
                    }
                },

                onOpen: function(selectedDates, dateStr, instance) {
                    if (datepickerInput) {
                        isClosing = true;
                    }
                },

                onClose: function(selectedDates, dateStr, instance) {
                    const dropdownActive = document.querySelector('[data-dropdown].is-active');

                    setTimeout(() => {
                        if (dropdownActive && isClosing) {
                            dropdownActive.classList.remove('is-active');
                        }
                    }, 100);
                }
            };

            if (datepickerInput) {
                document.addEventListener('click', (event) => {
                    const target = event.target;

                    if (!target.closest('.flatpickr-calendar') && !target.classList.contains('flatpickr-calendar')) {
                        isClosing = true;
                    }
                });

                datepicker = flatpickr(datepickerInput, options);
            } else {
                flatpickr(datepickerEl, options);
            }
        });


    }
}
