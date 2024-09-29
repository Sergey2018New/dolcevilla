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
        const enabledDates = calendarEl.getAttribute('data-enable-dates');
        let disabledDatesArray = [];
        let enabledDatesArray = [];
        let enabledDatesCalendar = [];

        if (disabledDates) {
            const jsonParse = JSON.parse(disabledDates);

            for (let key in Object.keys(jsonParse)) {
                disabledDatesArray.push(jsonParse[key]);
            }
        }

        if (enabledDates) {
            enabledDatesArray = enabledDates.split(',');

            for (let i = 0; i < enabledDatesArray.length; i++) {
                const enableDate = enabledDatesArray[i];
                const enableDateArray = enableDate.split('-');

                enabledDatesCalendar.push({
                    from: enableDateArray[0],
                    to: enableDateArray[1],
                });
            }
        }


        const calendar = flatpickr(calendarEl, {
            locale: Russian,
            inline: true,
            mode: 'range',
            // minDate: 'today',
            dateFormat: 'd.m.Y',
            disable: disabledDatesArray,
            // enable: enabledDatesCalendar || undefined ,
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
            onDayCreate: function(dObj, dStr, fp, dayElem) {
                if ([0, 1,2,3,4,5].indexOf(dayElem.dateObj.getDay()) !== -1) {
                    dayElem.classList.add('isNotAllowed');
                }
            },
            // onChange: function(selectedDates, dateStr, instance) {
            //     if (selectedDates.length === 2) {
            //         let minRange = 6;

            //         // if (selectedDates[0].getDay() == 0) {
            //         //     minRange = 6;
            //         // }

            //         if (selectedDates.length === 2) {
            //             let diffTime = Math.abs(selectedDates[1] - selectedDates[0]);
            //             let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            //             let addDays = Math.max(0, minRange - diffDays);

            //             if (addDays > 0) {
            //                 selectedDates[1].setDate(selectedDates[1].getDate() + addDays);
            //                 datepicker.setDate(selectedDates);
            //                 setTimeout(() => {
            //                     datepicker.jumpToDate(selectedDates[0]);
            //                     // datepicker.open();
            //                 });
            //             }
            //         }
            //     }
            // }
            // onDayCreate: function(dObj, dStr, fp, dayElem){
            //     let time = dayElem.dateObj.getTime();
            //     let isStartDate = false;
            //     let isEndDate = false;
            //     let isSelected = false;

            //     // time = data.some((dataItem) => {
            //     //     if (time >= fp.parseDate(dataItem.dateRange[0]).getTime() && time <= fp.parseDate(dataItem.dateRange[1]).getTime()) {
            //     //         if (time === fp.parseDate(dataItem.dateRange[0]).getTime()) {
            //     //             isStartDate = true;
            //     //         } else if (time === fp.parseDate(dataItem.dateRange[1]).getTime()) {
            //     //             isEndDate = true;
            //     //         }

            //     //         if (dataItem.selected) {
            //     //             isSelected = true;
            //     //         }

            //     //         return true;
            //     //     }
            //     // });

            //     // if (time) dayElem.classList.add('inRange');

            //     // if (isStartDate || isEndDate) {
            //     //     if (isStartDate) dayElem.classList.add('selected', 'startRange');
            //     //     if (isEndDate) dayElem.classList.add('selected', 'endRange');
            //     // }

            //     // if (isSelected && !isStartDate && !isEndDate) {
            //     //     dayElem.classList.add('is-selected');
            //     // }
            // }
        });

        calendar.jumpToDate(new Date(year, month, 1));
        // calendar.changeMonth(month, false);
    }
}
