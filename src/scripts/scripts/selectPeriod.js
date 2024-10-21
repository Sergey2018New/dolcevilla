import moment from 'moment';

export default function selectPeriod() {
    const bookingInputDateFrom = document.querySelector('.js-booking-input-date-from');
    const bookingFixedBlock = document.querySelector('.js-detail-booking-fixed');
    const bookingInputDateTo = document.querySelector('.js-booking-input-date-to');
    const bookingDateFrom = document.querySelector('.js-booking-date-from');
    const bookingDateTo = document.querySelector('.js-booking-date-to');
    const bookingWeekFrom = document.querySelector('.js-booking-week-from');
    const bookingWeekTo = document.querySelector('.js-booking-week-to');
    const bookingPeriod = document.querySelector('.js-booking-period');
    const bookingPrice = document.querySelector('.js-booking-price');

    if (bookingInputDateFrom) {
        bookingInputDateFrom.addEventListener('change', () => {
            bookingInputDateTo.focus();
        });
    }

    const resetRangePeriods = () => {
        const selectPeriodElements = document.querySelectorAll('.js-select-period');

        for (let i = 0; i < selectPeriodElements.length; i++) {
            const el = selectPeriodElements[i];

            el.classList.remove('is-range');

            if (!el.classList.contains('is-selected')) {
                el.classList.remove('is-active');
            }
        }
    };

    const isSelectedPeriod = () => {
        const selectedPeriodEl = document.querySelector('.js-select-period.is-selected');

        if (selectedPeriodEl) {
            return true;
        } else {
            return false;
        }
    };

    const resetDates = () => {
        if (bookingInputDateFrom) {
            if (bookingInputDateFrom._flatpickr) {
                bookingInputDateFrom._flatpickr.clear();
            }

            bookingInputDateFrom.value = '';
            bookingInputDateFrom.removeAttribute('disabled');
            bookingInputDateFrom.classList.remove('is-error');
            bookingInputDateFrom.closest('[data-field-box]').classList.remove('is-disabled', 'is-filed');
        }

        if (bookingInputDateTo) {
            if (bookingInputDateTo._flatpickr) {
                bookingInputDateTo._flatpickr.clear();
            }
            bookingInputDateTo.value = '';
            bookingInputDateTo.removeAttribute('disabled');
            bookingInputDateTo.classList.remove('is-error');
            bookingInputDateTo.closest('[data-field-box]').classList.remove('is-disabled', 'is-filed');
        }
    };

    const setSelectedPeriods = () => {
        const periods = document.querySelectorAll('.js-select-period.is-selected');
        let isSelectedDateFrom = false;

        for (let i = 0; i < periods.length; i++) {
            const period = periods[i];
            const dateFrom = period.getAttribute('data-date-from');
            const dateTo = period.getAttribute('data-date-to');

            if (bookingDateFrom && dateFrom && !isSelectedDateFrom) {
                bookingDateFrom.textContent = dateFrom;

                if (bookingWeekFrom) {
                    bookingWeekFrom.textContent = moment(dateFrom, 'DD.MM.YYYY')._d.toLocaleString('ru-RU', { weekday: 'short' });
                }

                if (bookingInputDateFrom) {
                    bookingInputDateFrom._flatpickr.setDate(moment(dateFrom, 'DD.MM.YYYY')._d);
                    bookingInputDateFrom.value = dateFrom;

                    bookingInputDateFrom.closest('[data-field-box]') ? bookingInputDateFrom.closest('[data-field-box]').classList.add('is-disabled', 'is-filed') : '';
                    bookingInputDateFrom.setAttribute('disabled', 'disabled');
                    bookingInputDateFrom.classList.remove('is-error');
                }

                isSelectedDateFrom = true;
            }

            if (bookingDateTo && dateTo) {
                bookingDateTo.textContent = dateTo;

                if (bookingWeekTo) {
                    bookingWeekTo.textContent = moment(dateTo, 'DD.MM.YYYY')._d.toLocaleString('ru-RU', { weekday: 'short' });
                }

                if (bookingInputDateTo) {
                    bookingInputDateTo._flatpickr.setDate(moment(dateTo, 'DD.MM.YYYY')._d);
                    bookingInputDateTo.value = dateTo;

                    bookingInputDateTo.closest('[data-field-box]') ? bookingInputDateTo.closest('[data-field-box]').classList.add('is-disabled', 'is-filed') : '';
                    bookingInputDateTo.setAttribute('disabled', 'disabled');
                    bookingInputDateTo.classList.remove('is-error');

                }
            }




        }
    };

    const setDisabledPeriods = () => {
        const periods = document.querySelectorAll('.js-select-period');
        let isCurrentSelectedPeriod = false;
        let isNextDisabled = false;

        for (let i = 0; i < periods.length; i++) {
            const period = periods[i];

            if (isNextDisabled) {
                period.classList.add('is-disabled');
                period.classList.remove('is-selected');
            } else {
                period.classList.remove('is-disabled');

                if (
                    periods[i - 1] && periods[i - 1].classList.contains('is-selected')
                    || periods[i + 1] && periods[i + 1].classList.contains('is-selected')
                ) {} else if (!period.classList.contains('is-selected') && isSelectedPeriod()) {
                    period.classList.add('is-disabled');
                }

                if (isCurrentSelectedPeriod && !period.classList.contains('is-selected')) {
                    isNextDisabled = true;
                }

                if (period.classList.contains('is-selected')) {
                    isCurrentSelectedPeriod = true;
                }
            }


        }

        setSelectedPeriods();
    };

    const changeBooking = (event) => {
        const { target } = event;

        if (target) {
            const selectPeriodElements = document.querySelectorAll('.js-select-period');
            const sheduleCalendars = document.querySelectorAll('.js-shedule-calendar');
            const selectPeriodEl = target.classList.contains('js-select-period') ? target : target.closest('.js-select-period');

            if (event.type === 'click') {
                if (selectPeriodEl) {
                    const dateFrom = selectPeriodEl.getAttribute('data-date-from');
                    const dateTo = selectPeriodEl.getAttribute('data-date-to');
                    const period = selectPeriodEl.getAttribute('data-period');
                    const price = selectPeriodEl.getAttribute('data-price');

                    for (let i = 0; i < sheduleCalendars.length; i++) {
                        const month = sheduleCalendars[i].getAttribute('data-month');
                        const year = sheduleCalendars[i].getAttribute('data-year');
                        sheduleCalendars[i]._flatpickr.clear();
                        sheduleCalendars[i]._flatpickr.jumpToDate(new Date(year, month, 1));
                    }

                    if (!selectPeriodEl.classList.contains('is-selected')) {
                        setSelectedPeriods();

                        if (bookingPeriod && period) {
                            bookingPrice.textContent = period;
                        }

                        if (bookingDateTo && price) {
                            bookingPrice.textContent = price;
                        }

                        selectPeriodEl.classList.add('is-selected');

                        if (bookingFixedBlock) {
                            bookingFixedBlock.classList.add('is-active');
                        }
                    } else {
                        selectPeriodEl.classList.remove('is-selected');

                        if (bookingFixedBlock && !isSelectedPeriod()) {
                            bookingFixedBlock.classList.remove('is-active');
                        }

                        resetDates();
                    }

                    setSelectedPeriods();
                    setDisabledPeriods();

                }
            }

            if (event.type === 'change') {
                if (target.classList.contains('js-shedule-calendar')) {
                    const dateFrom = target._flatpickr.selectedDates[0];
                    const dateTo = target._flatpickr.selectedDates[1];

                    if (dateFrom && dateTo) {
                        const weekFrom = dateFrom.toLocaleString('ru-RU', { weekday: 'short' });
                        const weekTo = dateTo.toLocaleString('ru-RU', { weekday: 'short' });

                        for (let i = 0; i < selectPeriodElements.length; i++) {
                            selectPeriodElements[i].classList.remove('is-selected', 'is-disabled');
                        }

                        if (bookingDateFrom && dateFrom) {
                            bookingDateFrom.textContent = moment(dateFrom).format('DD.MM.YYYY');

                            if (bookingWeekFrom) {
                                bookingWeekFrom.textContent = weekFrom;
                            }

                            if (bookingInputDateFrom) {
                                bookingInputDateFrom._flatpickr.setDate(dateFrom);
                                bookingInputDateFrom.value = moment(dateFrom).format('DD.MM.YYYY');
                                bookingInputDateFrom.closest('[data-field-box]') ?bookingInputDateFrom.closest('[data-field-box]').classList.add('is-disabled', 'is-filed') : '';
                                bookingInputDateFrom.setAttribute('disabled', 'disabled')
                                bookingInputDateFrom.classList.remove('is-error');
                            }
                        }

                        if (bookingDateTo && dateTo) {
                            bookingDateTo.textContent = moment(dateTo).format('DD.MM.YYYY');

                            if (bookingWeekTo) {
                                bookingWeekTo.textContent = weekTo;
                            }

                            if (bookingInputDateTo) {
                                bookingInputDateTo._flatpickr.setDate(dateTo);
                                bookingInputDateTo.value = moment(dateTo).format('DD.MM.YYYY');
                                bookingInputDateTo.setAttribute('disabled', 'disabled');
                                bookingInputDateTo.closest('[data-field-box]') ?bookingInputDateTo.closest('[data-field-box]').classList.add('is-disabled', 'is-filed') : '';
                                bookingInputDateTo.classList.remove('is-error');


                            }
                        }

                        if (bookingFixedBlock) {
                            bookingFixedBlock.classList.add('is-active');
                        }
                    }
                }
            }

        }

    };

    document.addEventListener('click', (event) => {
        changeBooking(event);
    });

    document.addEventListener('change', (event) => {
        changeBooking(event);
    });
}
