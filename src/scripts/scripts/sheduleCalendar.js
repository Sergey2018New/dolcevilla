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
        const calendar = sheduleCalendars[i];

        flatpickr(calendar, {
            locale: Russian,
            inline: true,
            minDate: 'today',
            mode: 'multiple',
            monthSelectorType: 'static',
            dateFormat: 'd.m.Y',

            onDayCreate: function(dObj, dStr, fp, dayElem){
                let time = dayElem.dateObj.getTime();
                let isStartDate = false;
                let isEndDate = false;
                let isSelected = false;

                time = data.some((dataItem) => {
                    if (time >= fp.parseDate(dataItem.dateRange[0]).getTime() && time <= fp.parseDate(dataItem.dateRange[1]).getTime()) {
                        if (time === fp.parseDate(dataItem.dateRange[0]).getTime()) {
                            isStartDate = true;
                        } else if (time === fp.parseDate(dataItem.dateRange[1]).getTime()) {
                            isEndDate = true;
                        }

                        if (dataItem.selected) {
                            isSelected = true;
                        }

                        return true;
                    }
                });

                if (time) dayElem.classList.add('inRange');

                if (isStartDate || isEndDate) {
                    if (isStartDate) dayElem.classList.add('selected', 'startRange');
                    if (isEndDate) dayElem.classList.add('selected', 'endRange');
                }

                if (isSelected && !isStartDate && !isEndDate) {
                    dayElem.classList.add('is-selected');
                }
            }
        });
    }
}
