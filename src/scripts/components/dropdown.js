/*
	  -------------
	|   DROPDOWN   |
	  -------------

	* Basic Attributes:
		* data-dropdown - dropdown menu wrapper
		* data-dropdown-button - popup open/close button
		* data-dropdown-button-text - button text for opening/closing the popup window
		* data-dropdown-popup - pop-up window
		* data-dropdown-list - list of dropdown options
		* data-dropdown-scroll - scroll of dropdown options
		* data-dropdown-option - list option
		* data-dropdown-input - Input when selected from dropdown list
*/

/**
	* @param {Element} dropdownContainer - HTML container element, default document
	* @param {Number} duration - Duration of opening and closing dropdown list
    (also needs to be changed in CSS)
*/

export default function dropdown(dropdownContainer, duration = 300) {
    let dropdowns;

    if (dropdownContainer) {
        if (dropdownContainer instanceof Node) {
            dropdowns = dropdownContainer.querySelectorAll("[data-dropdown]");
        }
    } else {
        dropdowns = document.querySelectorAll("[data-dropdown]");
    }

    if (dropdowns.length) {
        let isOpeningDropdown = true;

        /**
         * Get active html dropdown element
         */
        const getActiveDropdown = (dropdownEl) => {
            const activeDropdown = document.querySelector(
                "[data-dropdown].is-active"
            );

            if (dropdownEl && dropdownEl.classList.contains("is-active")) {
                return dropdownEl;
            } else {
                return activeDropdown;
            }
        };

        /**
         * The offset of the dropdown list if it extends to the right beyond
         * the window's visibility with
         */
        const calcOffsetDropdown = () => {
            if (getActiveDropdown()) {
                const dropdownActivePopup = getActiveDropdown().querySelector(
                    "[data-dropdown-popup]"
                );

                if (dropdownActivePopup) {
                    dropdownActivePopup.style.removeProperty("margin-left");

                    const getBoundingClientRect =
                        dropdownActivePopup.getBoundingClientRect();
                    const offsetLeft = getBoundingClientRect.x;
                    const width = getBoundingClientRect.width;

                    if (offsetLeft + width + 10 > window.innerWidth) {
                        dropdownActivePopup.style.marginLeft =
                            (offsetLeft + width + 10 - window.innerWidth) * -1 +
                            "px";
                    } else {
                        dropdownActivePopup.style.removeProperty("margin-left");
                    }
                }
            }
        };

        /**
         * Get focused option
         * @param  {Element} dropdownEl - dropdown html element
         */
        const getFocusedOption = (dropdownEl) => {
            return dropdownEl.querySelector(
                `[data-dropdown-option].is-focused`
            );
        };

        /**
         * Close active dropdown list
         */
        const closeDropdownActive = (event, dropdownActiveEl) => {
            if (getActiveDropdown(dropdownActiveEl) && isOpeningDropdown) {
                const closeDropdown = () => {
                    const dropdownPopup = getActiveDropdown(
                        dropdownActiveEl
                    ).querySelector("[data-dropdown-popup]");
                    const dropdownButton = getActiveDropdown(
                        dropdownActiveEl
                    ).querySelector("[data-dropdown-button]");

                    if (getFocusedOption(getActiveDropdown(dropdownActiveEl))) {
                        getFocusedOption(
                            getActiveDropdown(dropdownActiveEl)
                        ).classList.remove("is-focused");
                    }

                    if (
                        dropdownButton &&
                        getActiveDropdown(dropdownActiveEl) &&
                        getActiveDropdown(dropdownActiveEl).getAttribute(
                            "data-dropdown"
                        ) === "select"
                    ) {
                        dropdownButton.focus();

                        if (event) {
                            event.preventDefault();
                        }
                    }

                    if (dropdownButton) {
                        dropdownButton.setAttribute("aria-expanded", false);
                    }

                    getActiveDropdown(dropdownActiveEl).classList.remove(
                        "is-active"
                    );

                    if (dropdownPopup) {
                        dropdownPopup.setAttribute("aria-hidden", true);
                    }
                };

                closeDropdown();

                isOpeningDropdown = false;

                setTimeout(() => {
                    isOpeningDropdown = true;
                }, duration);
            }
        };

        /**
         * Dropdown initialization
         * @param  {Element} dropdownEl - dropdown html element
         */
        const initDropdown = (dropdownEl) => {
            const dropdownType = dropdownEl.getAttribute("data-dropdown");
            let dropdownPopup = dropdownEl.querySelector(
                "[data-dropdown-popup]"
            );
            let dropdownScroll = dropdownEl.querySelector(
                "[data-dropdown-scroll]"
            );
            let dropdownList = dropdownEl.querySelector("[data-dropdown-list]");
            let dropdownOptions = dropdownEl.querySelectorAll(
                "[data-dropdown-list] [data-dropdown-option]"
            );
            let dropdownInput = dropdownEl.querySelector(
                "[data-dropdown-input]"
            );
            let datepickerInput = dropdownEl.querySelector(
                "[data-datepicker-input]"
            );
            let dropdownButton = dropdownEl.querySelector(
                "[data-dropdown-button]"
            );
            let dropdownButtonText = dropdownEl.querySelector(
                "[data-dropdown-button-text]"
            );
            let dropdownButtonDefault = dropdownEl.querySelector(
                "[data-dropdown-button-default]"
            );
            let dropdownClear = dropdownEl.querySelector(
                "[data-dropdown-clear]"
            );
            const optionsCount = dropdownOptions.length;
            const dropdownId = Date.now();
            let optionFocusedIndex = -1;
            let dropdownInnerEl = dropdownEl.querySelector("[data-dropdown]");

            if (dropdownInnerEl) {
                if (
                    dropdownScroll &&
                    dropdownScroll.closest("[data-dropdown]") ===
                        dropdownInnerEl
                ) {
                    dropdownScroll = null;
                }

                if (
                    dropdownList &&
                    dropdownList.closest("[data-dropdown]") === dropdownInnerEl
                ) {
                    dropdownList = null;
                    dropdownOptions = null;
                }

                if (
                    dropdownInput &&
                    dropdownInput.closest("[data-dropdown]") === dropdownInnerEl
                ) {
                    dropdownInput = null;
                }

                if (
                    datepickerInput &&
                    datepickerInput.closest("[data-dropdown]") ===
                        dropdownInnerEl
                ) {
                    datepickerInput = null;
                }

                if (
                    dropdownButton &&
                    dropdownButton.closest("[data-dropdown]") ===
                        dropdownInnerEl
                ) {
                    dropdownButton = null;
                }

                if (
                    dropdownButtonText &&
                    dropdownButtonText.closest("[data-dropdown]") ===
                        dropdownInnerEl
                ) {
                    dropdownButtonText = null;
                }
            }

            /**
             * Get selected option
             */
            const clearDropdown = () => {
                const counters = dropdownEl.querySelectorAll("[data-counter]");
                const selects = dropdownEl.querySelectorAll(
                    '[data-dropdown="select"]'
                );

                if (counters && counters.length) {
                    counters.forEach((el) => {
                        const input = el.querySelector("[data-counter-input]");

                        if (input) {
                            input.value = input.getAttribute("min") || "1";
                        }
                    });
                }
                if (selects && selects.length) {
                    selects.forEach((el) => {
                        const input = el.querySelector("[data-dropdown-input]");
                        const buttonText = el.querySelector(
                            "[data-dropdown-button-text]"
                        );
                        const options = el.querySelectorAll(
                            "[data-dropdown-option]"
                        );

                        if (input) {
                            if (options && options.length) {
                                input.value =
                                    options[0].getAttribute("data-value");
                                buttonText.textContent =
                                    options[0].getAttribute("data-value") || "";

                                options.forEach((option, index) => {
                                    if (!index) {
                                        option.classList.add("is-focused");
                                        option.classList.add("is-selected");
                                        option.setAttribute(
                                            "aria-selected",
                                            "true"
                                        );
                                    } else {
                                        option.classList.remove("is-focused");
                                        option.classList.remove("is-selected");
                                        option.setAttribute(
                                            "aria-selected",
                                            "false"
                                        );
                                    }
                                });
                            } else {
                                input.value = "";
                                buttonText.textContent =
                                    options[0].getAttribute("data-value") || "";
                            }
                        }
                    });
                }

                return null;
            };

            /**
             * Get selected option
             */
            const getSelectedOption = () => {
                if (dropdownInput) {
                    return dropdownEl.querySelector(
                        `[data-dropdown-option][data-value="${dropdownInput.value}"]`
                    );
                }
                return null;
            };

            /**
             * Update the state of a focused option
             * @param  {Number} newIndex - Focused option index
             */
            const updateFocusedOption = (newIndex) => {
                if (dropdownOptions && dropdownOptions.length) {
                    const prevOption = dropdownOptions[optionFocusedIndex];
                    const option = dropdownOptions[newIndex];

                    if (prevOption) {
                        prevOption.classList.remove("is-focused");
                        prevOption.setAttribute("aria-selected", false);
                    }
                    if (option) {
                        option.classList.add("is-focused");
                        option.setAttribute("aria-selected", true);

                        if (dropdownList) {
                            dropdownList.setAttribute(
                                "aria-activedescendant",
                                option.id
                            );
                        }
                    }

                    optionFocusedIndex = newIndex;
                }
            };

            /**
             * Set scroll to see focused option
             */
            const setScrollTop = () => {
                const focusedOption = getFocusedOption(dropdownEl);

                if (dropdownScroll && focusedOption) {
                    const dropdownScrollHeight = dropdownScroll.clientHeight;
                    const { height } = focusedOption.getBoundingClientRect();
                    const offsetTop = focusedOption.offsetTop;

                    if (
                        offsetTop + height - dropdownScroll.scrollTop >
                        dropdownScrollHeight
                    ) {
                        dropdownScroll.scrollTop =
                            offsetTop + height - dropdownScrollHeight;
                    }

                    if (offsetTop - dropdownScroll.scrollTop < 0) {
                        dropdownScroll.scrollTop = offsetTop;
                    }
                }
            };

            /**
             * Open dropdown list
             */
            const openDropdown = () => {
                if (isOpeningDropdown) {
                    isOpeningDropdown = false;

                    if (
                        getActiveDropdown() &&
                        getActiveDropdown() !== dropdownEl &&
                        getActiveDropdown(dropdownEl) !== dropdownEl
                    ) {
                        if (!dropdownEl.closest("[data-dropdown].is-active")) {
                            getActiveDropdown().classList.remove("is-active");
                        }

                        dropdownEl.classList.add("is-active");
                    } else {
                        dropdownEl.classList.toggle("is-active");
                    }

                    if (dropdownEl.classList.contains("is-active")) {
                        if (
                            dropdownInput &&
                            dropdownInput.hasAttribute("data-datepicker-input")
                        ) {
                            dropdownInput.focus();
                        }

                        if (dropdownPopup) {
                            dropdownPopup.setAttribute("aria-hidden", false);
                        }

                        if (dropdownList) {
                            setTimeout(() => {
                                dropdownList.focus();
                            }, duration);
                        }

                        if (dropdownType === "select") {
                            setScrollTop();
                        }

                        if (dropdownButton) {
                            dropdownButton.setAttribute("aria-expanded", true);
                        }
                    } else {
                        if (dropdownPopup) {
                            dropdownPopup.setAttribute("aria-hidden", true);
                        }

                        if (dropdownButton) {
                            dropdownButton.setAttribute("aria-expanded", false);
                        }
                    }

                    if (dropdownInput && dropdownType === "select") {
                        const optionSelectedIndex = getSelectedOption()
                            ? [].indexOf.call(
                                  dropdownOptions,
                                  getSelectedOption()
                              )
                            : -1;

                        updateFocusedOption(optionSelectedIndex);
                    }

                    calcOffsetDropdown();

                    setTimeout(() => {
                        isOpeningDropdown = true;
                    }, duration);
                }
            };

            /**
             * Change dropdown
             * @param  {Element} dropdownOption - HTML option element
             * @param  {Boolean} isChangeEvent - Whether to trigger an input change event
             */
            const changeDropdown = (dropdownOption, isChangeEvent) => {
                if (isOpeningDropdown) {
                    isOpeningDropdown = false;
                    const eventChange = new Event("change");
                    let valueText = dropdownOption.textContent;
                    let value = dropdownOption.getAttribute("data-value");

                    const dropdownOptionSelected = dropdownEl.querySelector(
                        "[data-dropdown-option].is-selected"
                    );

                    if (dropdownOptionSelected) {
                        dropdownOptionSelected.classList.remove("is-selected");
                        dropdownOptionSelected.setAttribute(
                            "aria-selected",
                            "false"
                        );
                    }

                    dropdownOption.classList.add("is-selected");
                    dropdownOption.setAttribute("aria-selected", "true");

                    dropdownEl.classList.remove("is-active");
                    dropdownEl.classList.remove("is-placeholder");

                    if (dropdownList) {
                        dropdownList.setAttribute(
                            "aria-activedescendant",
                            dropdownOption.id
                        );
                    }

                    if (dropdownButton) {
                        dropdownButton.setAttribute("aria-expanded", false);
                    }

                    if (dropdownButtonText) {
                        dropdownButtonText.textContent = valueText
                            ? valueText
                            : value
                            ? value
                            : "";
                    }

                    if (dropdownOptions && dropdownOptions.length) {
                        const optionSelectedIndex = getSelectedOption()
                            ? [].indexOf.call(
                                  dropdownOptions,
                                  getSelectedOption()
                              )
                            : -1;
                        updateFocusedOption(optionSelectedIndex);
                    }

                    if (dropdownInput) {
                        dropdownInput.value = value;
                        dropdownInput.classList.remove("is-error");

                        if (isChangeEvent) {
                            dropdownInput.dispatchEvent(eventChange);
                        }
                    }

                    setTimeout(() => {
                        isOpeningDropdown = true;

                        if (dropdownPopup) {
                            dropdownPopup.setAttribute("aria-hidden", true);
                        }
                    }, duration);
                }
            };

            dropdownEl.setAttribute("data-dropdown-init", "");

            if (dropdownButtonText) {
                dropdownButtonText.id = `dropdown-button-text-${dropdownId}`;
            }

            if (dropdownButton) {
                if (dropdownType === "select") {
                    dropdownButton.setAttribute(
                        "aria-labelledby",
                        dropdownButtonText.id
                    );
                    dropdownButton.id = `dropdown-button-${dropdownId}`;
                }

                dropdownButton.addEventListener("click", () => {
                    openDropdown();
                });
            }

            if (dropdownPopup) {
                dropdownPopup.addEventListener("blur", () => {
                    closeDropdownActive();
                });
            }

            if (dropdownOptions && dropdownOptions.length) {
                dropdownOptions.forEach((option, index) => {
                    option.id = `dropdown-option-${dropdownId}-${index + 1}`;

                    option.addEventListener("click", () => {
                        changeDropdown(option, true);
                    });

                    // option.addEventListener('mouseenter', () => {
                    // 	updateFocusedOption(index);
                    // });
                });
            }

            if (dropdownInput && dropdownType === "select") {
                const optionSelectedIndex = getSelectedOption()
                    ? [].indexOf.call(dropdownOptions, getSelectedOption())
                    : -1;

                dropdownInput.addEventListener("change", (event) => {
                    const optionCurrent = dropdownEl.querySelector(
                        `[data-dropdown-option][data-value="${event.target.value}"]`
                    );

                    if (optionCurrent) {
                        changeDropdown(optionCurrent);
                    }
                });

                updateFocusedOption(optionSelectedIndex);
            }

            if (dropdownType === "multiselect") {
                const checkboxes = dropdownEl.querySelectorAll(
                    'input[type="checkbox"]'
                );

                checkboxes.forEach((el) =>
                    el.addEventListener("change", (event) => {
                        const currentValue = event.target.getAttribute("name");
                        const parsedValues = dropdownInput.value.split(", ");

                        if (parsedValues.includes(currentValue)) {
                            dropdownInput.value = parsedValues
                                .filter((el) => el === currentValue && el)
                                .join(", ");
                        } else {
                            dropdownInput.value = [
                                ...parsedValues,
                                currentValue,
                            ]
                                .filter(Boolean)
                                .join(", ");
                        }

                        const textValue = Array.from(checkboxes)
                            .filter((el) => el.checked)
                            .map(
                                (el) =>
                                    el.parentNode.querySelector(
                                        ".ui-checkbox__text"
                                    )?.textContent
                            )
                            .join(", ");

                        dropdownButtonText.textContent = textValue
                            ? textValue
                            : dropdownButtonDefault.getAttribute(
                                  "data-dropdown-button-default"
                              ) || "";
                    })
                );
            }

            if (datepickerInput) {
                datepickerInput.addEventListener("focus", () => {
                    openDropdown();
                });
            }

            dropdownEl.addEventListener("keyup", (e) => {
                // press enter or space
                if (
                    e.key === "Enter" ||
                    e.code === "Enter" ||
                    e.code === "Space"
                ) {
                    // -> open dropdown
                    if (document.activeElement === dropdownButton) {
                        openDropdown();
                    }

                    if (
                        document.activeElement.closest("[data-dropdown-list]")
                    ) {
                        if (dropdownEl.classList.contains("is-active")) {
                            if (getFocusedOption(dropdownEl)) {
                                changeDropdown(getFocusedOption(dropdownEl));
                            } else {
                                closeDropdownActive();
                            }

                            if (dropdownButton) {
                                dropdownButton.focus();
                            }
                        }
                    }
                }
            });

            dropdownEl.addEventListener("keydown", (e) => {
                if (
                    (e.key === "ArrowDown" || e.code === "ArrowDown") &&
                    optionFocusedIndex < optionsCount - 1
                ) {
                    updateFocusedOption(optionFocusedIndex + 1);
                    setScrollTop();
                    e.preventDefault();
                }

                // press up -> go previous
                if (
                    (e.key === "ArrowUp" || e.code === "ArrowUp") &&
                    optionFocusedIndex > 0
                ) {
                    updateFocusedOption(optionFocusedIndex - 1);
                    setScrollTop();
                    e.preventDefault();
                }

                // press tab
                if (e.code === "Tab" || e.key === "Tab") {
                    const dropdownClosestEl = document.activeElement.closest(
                        "[data-dropdown].is-active"
                    );
                    if (dropdownType === "select" && dropdownClosestEl) {
                        if (dropdownEl.closest("[data-dropdown]")) {
                            if (dropdownEl.classList.contains("is-active")) {
                                closeDropdownActive(e, dropdownEl);
                            }
                        } else {
                            closeDropdownActive(e);
                        }
                    }

                    if (
                        dropdownType === "menu" &&
                        !document.activeElement.closest(
                            "[data-dropdown].is-active"
                        )
                    ) {
                        closeDropdownActive(e);
                    }
                }

                if (e.key === "Escape" || e.code === "Escape") {
                    closeDropdownActive(e);
                }
            });

            if (dropdownClear) {
                dropdownClear.addEventListener("click", clearDropdown);
            }

            document.addEventListener("click", (e) => {
                // const { target } = e;
                // const withinBoundaries = e.composedPath().includes(dropdownEl);
                // if (!withinBoundaries) {
                //     console.log(dropdownEl)
                //     closeDropdownActive(e, dropdownEl);
                // }
            });
        };

        dropdowns.forEach((dropdownEl, index) => {
            if (!dropdownEl.hasAttribute("data-dropdown-init")) {
                setTimeout(() => {
                    initDropdown(dropdownEl, index);
                }, 5);
            }
        });

        document.addEventListener("click", (event) => {
            const { target } = event;
            const dropdownEl = target.hasAttribute("data-dropdown")
                ? target
                : target.closest("[data-dropdown]");

            if (
                (!dropdownEl &&
                    !target.closest(".flatpickr-calendar") &&
                    !target.classList.contains("flatpickr-calendar")) ||
                target.closest("[data-dropdown-close]") ||
                target.hasAttribute("data-dropdown-close")
            ) {
                closeDropdownActive(event);
            } else {
                const dropdownInnerEl = dropdownEl.querySelector(
                    "[data-dropdown].is-active"
                );

                if (dropdownInnerEl) {
                    closeDropdownActive(event, dropdownInnerEl);
                }
            }
        });

        document.addEventListener("keyup", (event) => {
            if (
                (event.code === "Tab" || event.key === "Tab") &&
                getActiveDropdown() &&
                !document.activeElement.closest("[data-dropdown].is-active")
            ) {
                closeDropdownActive(event);
            }
        });

        window.addEventListener("resize", (event) => {
            calcOffsetDropdown(event);
        });
    }
}
