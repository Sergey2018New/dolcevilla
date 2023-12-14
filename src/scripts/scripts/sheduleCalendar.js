import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";

export default function sheduleCalendar() {
    const sheduleCalendars = document.querySelectorAll('.js-shedule-calendar');
    const data = [
        {
            selected: true,
            dateRange: [new Date().fp_incr(3), new Date().fp_incr(9)],
        },
        {
            selected: false,
            dateRange: [new Date().fp_incr(9), new Date().fp_incr(15)]
        },
    ];

    for (let i = 0; i < sheduleCalendars.length; i += 1) {
        const calendarEl = sheduleCalendars[i];
        const month = calendarEl.getAttribute('data-month');
        const year = calendarEl.getAttribute('data-year');
        const disabledDates = calendarEl.getAttribute('data-disabled-dates');
        let disabledDatesArray = [];

        if (disabledDates) {
            const jsonParse = JSON.parse(disabledDates);

            for (let key in Object.keys(jsonParse)) {
                disabledDatesArray.push(jsonParse[key]);
            }
        }

        const calendar = flatpickr(calendarEl, {
            locale: Russian,
            inline: true,
            mode: 'range',
            minDate: 'today',
            dateFormat: 'd.m.Y',
            disable: disabledDatesArray,
            // enable: [
            //     function(date) {
            //         console.log(date.getDay())
            //         // return true to enable

            //         return (date.getDay() === 6);

            //     },
            //     function(date) {
            //         console.log(date.getDay())
            //         // return true to enable

            //         return (date.getDay() === 6);

            //     }
            // ],
            onDayCreate: function(dObj, dStr, fp, dayElem){
                let time = dayElem.dateObj.getTime();
                let isStartDate = false;
                let isEndDate = false;
                let isSelected = false;

                // time = data.some((dataItem) => {
                //     if (time >= fp.parseDate(dataItem.dateRange[0]).getTime() && time <= fp.parseDate(dataItem.dateRange[1]).getTime()) {
                //         if (time === fp.parseDate(dataItem.dateRange[0]).getTime()) {
                //             isStartDate = true;
                //         } else if (time === fp.parseDate(dataItem.dateRange[1]).getTime()) {
                //             isEndDate = true;
                //         }

                //         if (dataItem.selected) {
                //             isSelected = true;
                //         }

                //         return true;
                //     }
                // });

                // if (time) dayElem.classList.add('inRange');

                // if (isStartDate || isEndDate) {
                //     if (isStartDate) dayElem.classList.add('selected', 'startRange');
                //     if (isEndDate) dayElem.classList.add('selected', 'endRange');
                // }

                // if (isSelected && !isStartDate && !isEndDate) {
                //     dayElem.classList.add('is-selected');
                // }
            }
        });

        calendar.jumpToDate(new Date(year, month, 1));
        // calendar.changeMonth(month, false);
    }
}
