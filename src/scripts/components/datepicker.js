import flatpickr from "flatpickr";
import English from "flatpickr/dist/l10n/default.js";
import { Russian } from "flatpickr/dist/l10n/ru.js";

// import IMask from 'imask';

/*
	Vanillajs-datepicker
	https://mymth.github.io/vanillajs-datepicker/#/
*/

const getWeek = (date) => {
    var day = date.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 1)
        // Only manipulate the date if it isn't Mon.
        date.setHours(-24 * (day - 1));
};

const buttonTexts = {
    apply: {
        ru: "Применить",
        en: "Apply",
    },
    cancel: {
        ru: "Отмена",
        en: "Cancel",
    },
};

export default function datepicker(datepickerSelectors) {
    /*
		@param  {Element} datepickerSelectors - HTML container element, default document
	*/

    let datepickers;

    if (
        datepickerSelectors &&
        typeof datepickerSelectors === "object" &&
        datepickerSelectors.length > 0
    ) {
        datepickers = datepickerSelectors;
    } else {
        datepickers = document.querySelectorAll("[data-datepicker]");
    }

    if (datepickers) {
        datepickers.forEach((datepickerEl) => {
            const datepickerInput = datepickerEl.querySelector(
                "[data-datepicker-input]"
            );
            const datepickerInputSelected = datepickerEl.querySelector(
                "[data-datepicker-input-selected]"
            );
            const datepickerInfoEl = datepickerEl.querySelector(
                "[data-datepicker-info]"
            );
            const isNoDelected = datepickerEl.classList.contains("no-selected");
            const isExtended = datepickerEl.classList.contains("is-extended");
            const lang = document.body.getAttribute("data-lang") || "ru";
            let datepicker;
            let isApplyDate = false;
            let isClosing = false;
            let defaultDate;
            const todayDate = new Date();
            const weekCurrentDay = todayDate.getDay();

            const checkControlApply = (controlApply, selectedDates) => {
                if (controlApply) {
                    if (selectedDates.length > 1) {
                        controlApply.removeAttribute("disabled");
                        controlApply.classList.remove("is-disabled");
                        isApplyDate = true;

                        setTimeout(() => {
                            controlApply.focus();
                        }, 10);
                    } else {
                        controlApply.setAttribute("disabled", "disabled");
                        controlApply.classList.add("is-disabled");
                        isApplyDate = false;
                    }
                }
            };

            // const defaultDate = datepickerInput ? datepickerInput.value;
            if (datepickerInput) {
                let weekDiff;

                if (weekCurrentDay === 0) {
                    weekDiff = -1;
                } else {
                    weekDiff = 6 - weekCurrentDay;
                }

                defaultDate = [
                    todayDate.fp_incr(weekDiff),
                    todayDate.fp_incr(weekDiff + 7),
                ];
            } else {
                defaultDate = datepickerEl.value
                    ? datepickerEl.value
                    : new Date().getDay();
            }

            const options = {
                static: datepickerInput ? false : true,
                monthSelectorType: "static",
                locale: lang === "ru" ? Russian : English,
                position: "auto left",
                disableMobile: true,
                mode: datepickerInput ? "range" : "single",
                minDate: "today",
                dateFormat: "d.m.Y",
                defaultDate: !isNoDelected ? defaultDate : null,
                // enable: [
                //     function(date) {
                //         // return true to enable

                //         return (date.getDay() === 0);

                //     }
                // ],
                onDayCreate: function (dObj, dStr, fp, dayElem) {
                    let arrayAllowedDays = [1, 2, 3, 4, 5];

                    if (dObj.length === 1) {
                        if (dObj[0].getDay() === 6) {
                            arrayAllowedDays = [0, 1, 2, 3, 4, 5];
                        } else if (dObj[0].getDay() === 0) {
                            arrayAllowedDays = [1, 2, 3, 4, 5, 6];
                        }
                    }

                    if (
                        arrayAllowedDays.indexOf(dayElem.dateObj.getDay()) !==
                        -1
                    ) {
                        dayElem.classList.add("isNotAllowed");
                    }
                },

                onReady: function (selectedDates, dateStr, instance) {
                    const eventChange = new Event("change");
                    const calendarContainer = instance.calendarContainer;
                    const container = instance.rContainer;
                    const currentMonth = calendarContainer.querySelector(
                        ".flatpickr-current-month"
                    );
                    const header = document.createElement("div");
                    const footer = document.createElement("div");
                    const currentYear = document.createElement("div");
                    const buttonsHTML = `
                        <button type="button" class="flatpickr-button flatpickr-button-apply ui-button ui-button_size_sm">${
                            buttonTexts.apply[lang] || buttonTexts.apply.ru
                        }</button>
                        <button type="button" class="flatpickr-button flatpickr-button-cancel ui-button ui-button_size_sm ui-button_style_outline">${
                            buttonTexts.cancel[lang] || buttonTexts.cancel.ru
                        }</button>`;
                    let controlApply;
                    let controlCancel;
                    const setApplyDate = () => {
                        isClosing = true;
                        datepickerInput.focus();
                        datepicker.close();

                        if (isApplyDate && datepickerInputSelected) {
                            datepickerInputSelected.value =
                                instance.input.value;
                            datepickerInputSelected.dispatchEvent(eventChange);
                        }
                    };

                    if (isExtended) {
                        calendarContainer.classList.add("is-extended");
                    }

                    if (datepickerInput) {
                        if (isExtended) {
                            header.className = "flatpickr-header";
                            header.innerHTML = buttonsHTML;
                            calendarContainer.prepend(header);
                        } else {
                            footer.className = "flatpickr-footer";
                            footer.innerHTML = buttonsHTML;
                            container.append(footer);
                        }
                    }

                    if (datepickerInfoEl) {
                        container.append(datepickerInfoEl);
                    }

                    currentYear.className = "flatpickr-current-year";
                    currentYear.innerHTML = instance.currentYear;

                    if (datepickerInput) {
                        // Cancel
                        controlCancel = calendarContainer.querySelector(
                            ".flatpickr-button-cancel"
                        );

                        if (controlCancel) {
                            controlCancel.addEventListener("click", () => {
                                datepicker.clear();
                                if (datepickerInputSelected) {
                                    datepickerInputSelected.value =
                                        instance.input.value;
                                    datepickerInputSelected.dispatchEvent(
                                        eventChange
                                    );
                                }
                                isClosing = true;
                                datepicker.close();
                            });
                        }

                        // Apply
                        controlApply = calendarContainer.querySelector(
                            ".flatpickr-button-apply"
                        );

                        if (datepickerInputSelected) {
                            if (!isNoDelected) {
                                datepickerInputSelected.value =
                                    instance.input.value;
                                datepickerInputSelected.dispatchEvent(
                                    eventChange
                                );
                            }

                            datepickerInputSelected.addEventListener(
                                "change",
                                () => {
                                    if (datepickerInputSelected.value === "") {
                                        datepicker.clear();
                                        datepicker.close();
                                    }
                                }
                            );
                        }

                        checkControlApply(controlApply, selectedDates);

                        if (controlApply) {
                            controlApply.addEventListener(
                                "click",
                                setApplyDate
                            );
                        }

                        calendarContainer.addEventListener("keyup", (e) => {
                            if (
                                (e.code === "Space" ||
                                    e.code === "Enter" ||
                                    e.key === "Enter") &&
                                document.activeElement === controlApply
                            ) {
                                setApplyDate();
                            }
                        });
                    }

                    // Current month and Current year
                    if (currentMonth) {
                        currentMonth.append(currentYear);
                    }
                },

                onChange: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length === 2) {
                        let minRange = 7;

                        if (selectedDates[0].getDay() == 0) {
                            minRange = 6;
                        }

                        if (selectedDates.length === 2) {
                            let diffTime = Math.abs(
                                selectedDates[1] - selectedDates[0]
                            );
                            let diffDays = Math.ceil(
                                diffTime / (1000 * 60 * 60 * 24)
                            );
                            let addDays = Math.max(0, minRange - diffDays);

                            if (addDays > 0) {
                                selectedDates[1].setDate(
                                    selectedDates[1].getDate() + addDays
                                );
                                datepicker.setDate(selectedDates);
                                setTimeout(() => {
                                    datepicker.jumpToDate(selectedDates[0]);
                                    // datepicker.open();
                                });
                            }
                        }
                    }

                    if (datepickerInput) {
                        const calendarContainer = instance.calendarContainer;
                        const controlApply = calendarContainer.querySelector(
                            ".flatpickr-button-apply"
                        );

                        checkControlApply(controlApply, selectedDates);

                        datepicker.open();
                        isClosing = false;
                    }
                },

                onYearChange: function (selectedDates, dateStr, instance) {
                    const calendarContainer = instance.calendarContainer;
                    const currentYear = calendarContainer.querySelector(
                        ".flatpickr-current-year"
                    );

                    if (currentYear) {
                        currentYear.innerHTML = instance.currentYear;
                    }
                },

                onOpen: function (selectedDates, dateStr, instance) {
                    if (datepickerInput) {
                        isClosing = true;
                    }
                },

                onClose: function (selectedDates, dateStr, instance) {
                    const dropdownActive = document.querySelector(
                        "[data-dropdown].is-active"
                    );

                    setTimeout(() => {
                        if (dropdownActive && isClosing) {
                            dropdownActive.classList.remove("is-active");
                        }
                    }, 100);
                },
            };

            if (datepickerInput) {
                document.addEventListener("click", (event) => {
                    const target = event.target;

                    if (
                        !target.closest(".flatpickr-calendar") &&
                        !target.classList.contains("flatpickr-calendar")
                    ) {
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
