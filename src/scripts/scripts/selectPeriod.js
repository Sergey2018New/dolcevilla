import moment from 'moment';

export default function selectPeriod() {
    const bookingInputDateFrom = document.querySelector('.js-booking-input-date-from');
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

    const changeBooking = (event) => {
        const { target } = event;

        const selectPeriodElements = document.querySelectorAll('.js-select-period');
        const sheduleCalendars = document.querySelectorAll('.js-shedule-calendar');

        if (target.classList.contains('.js-select-period') || target.closest('.js-select-period')) {
            const selectPeriodEl = target.closest('.js-select-period') ? target.closest('.js-select-period') : target;

            const dateFrom = selectPeriodEl.getAttribute('data-date-from');
            const dateTo = selectPeriodEl.getAttribute('data-date-to');
            const period = selectPeriodEl.getAttribute('data-period');
            const price = selectPeriodEl.getAttribute('data-price');

            for (let i = 0; i < selectPeriodElements.length; i++) {
                selectPeriodElements[i].classList.remove('is-active');
            }

            for (let i = 0; i < sheduleCalendars.length; i++) {
                const month = sheduleCalendars[i].getAttribute('data-month');
                const year = sheduleCalendars[i].getAttribute('data-year');
                sheduleCalendars[i]._flatpickr.clear();
                sheduleCalendars[i]._flatpickr.jumpToDate(new Date(year, month, 1));

            }

            selectPeriodEl.classList.add('is-active');

            if (bookingDateFrom && dateFrom) {
                bookingDateFrom.textContent = dateFrom;

                if (bookingWeekFrom) {
                    bookingWeekFrom.textContent = moment(dateFrom, 'DD.MM.YYYY')._d.toLocaleString('ru-RU', { weekday: 'short' });
                }

                if (bookingInputDateFrom) {
                    bookingInputDateFrom._flatpickr.setDate(moment(dateFrom, 'DD.MM.YYYY')._d);

                }
            }

            if (bookingDateTo && dateTo) {
                bookingDateTo.textContent = dateTo;

                if (bookingWeekTo) {
                    bookingWeekTo.textContent = moment(dateTo, 'DD.MM.YYYY')._d.toLocaleString('ru-RU', { weekday: 'short' });
                }

                if (bookingInputDateTo) {
                    bookingInputDateTo._flatpickr.setDate(moment(dateTo, 'DD.MM.YYYY')._d);
                }
            }

            if (bookingPeriod && period) {
                bookingPrice.textContent = period;
            }

            if (bookingDateTo && price) {
                bookingPrice.textContent = price;
            }
        }

        if (target.classList.contains('js-shedule-calendar')) {
            const dateFrom = target._flatpickr.selectedDates[0];
            const dateTo = target._flatpickr.selectedDates[1];

            if (dateFrom && dateTo) {
                const weekFrom = dateFrom.toLocaleString('ru-RU', { weekday: 'short' });
                const weekTo = dateTo.toLocaleString('ru-RU', { weekday: 'short' });

                for (let i = 0; i < selectPeriodElements.length; i++) {
                    selectPeriodElements[i].classList.remove('is-active');
                }

                if (bookingDateFrom && dateFrom) {
                    bookingDateFrom.textContent = moment(dateFrom).format('DD.MM.YYYY');

                    if (bookingWeekFrom) {
                        bookingWeekFrom.textContent = weekFrom;
                    }

                    if (bookingInputDateFrom) {
                        bookingInputDateFrom._flatpickr.setDate(dateFrom);
                    }
                }

                if (bookingDateTo && dateTo) {
                    bookingDateTo.textContent = moment(dateTo).format('DD.MM.YYYY');

                    if (bookingWeekTo) {
                        bookingWeekTo.textContent = weekTo;
                    }

                    if (bookingInputDateTo) {
                        bookingInputDateTo._flatpickr.setDate(dateTo);
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
