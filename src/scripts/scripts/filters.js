export default function filtersInit() {
    const filters = document.querySelector('.js-filters');

    if (filters) {
        const filtersContent = filters.querySelector('.js-filters-content');
        const inputs = filters.querySelectorAll('.js-filters-input');
        const checkboxes = filters.querySelectorAll('input[type="checkbox"]');
        const toggleButton = filters.querySelector('.js-filters-toggle');
        const resetButton = filters.querySelector('.js-filters-reset');
        const filtersItems = filters.querySelectorAll('.js-filters-item');
        const eventChange = new Event('change');
        let isReset;

        const toggleReset = () => {

            if (resetButton) {
                isReset = false;

                for (let i = 0; i < inputs.length; i += 1) {
                    const input = inputs[i];

                    if (input.value && input.value !== '') {
                        isReset = true;
                        break;
                    }
                }

                for (let i = 0; i < checkboxes.length; i += 1) {
                    const checkbox = checkboxes[i];

                    if (checkbox.checked) {
                        isReset = true;
                        break;
                    }
                }

                if (isReset) {
                    resetButton.classList.remove('is-hidden');
                } else {
                    resetButton.classList.add('is-hidden');
                }
            }
        };

        const resetFilters = () => {
            for (let i = 0; i < inputs.length; i += 1) {
                const input = inputs[i];
                input.value = '';
                input.dispatchEvent(eventChange);
            }

            for (let i = 0; i < checkboxes.length; i += 1) {
                const checkbox = checkboxes[i];
                checkbox.checked = false;
            }

            if (resetButton) {
                resetButton.classList.add('is-hidden');
            }
        };

        for (let i = 0; i < inputs.length; i += 1) {
            const input = inputs[i];

            input.addEventListener('change', () => {
                toggleReset();
            });
        }

        for (let i = 0; i < checkboxes.length; i += 1) {
            const checkbox = checkboxes[i];

            checkbox.addEventListener('change', () => {
                toggleReset();
            });
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                resetFilters();
            });
        }

        if (toggleButton) {
            let isOpenFilters = true;

            toggleButton.addEventListener('click', () => {
                if (isOpenFilters) {
                    const toggleButtonText = toggleButton.querySelector('.js-filters-toggle-text');

                    isOpenFilters = false;

                    if (!filters.classList.contains('is-open')) {
                        filters.classList.add('is-open');
                        filtersContent.style.maxHeight = `${filtersContent.scrollHeight}px`;

                        setTimeout(() => {
                            filtersContent.style.maxHeight = null;
                            filters.classList.add('is-visible');
                        }, 300);
                    } else {
                        filtersContent.style.maxHeight = `${filtersContent.scrollHeight}px`;
                        filters.classList.remove('is-visible', 'is-open');

                        setTimeout(() => {
                            filtersContent.style.maxHeight = null;
                        }, 1);
                    }

                    if (toggleButtonText) {
                        const toggleText = toggleButton.getAttribute('data-toggle-text') || '';

                        if (toggleText) {
                            toggleButton.setAttribute('data-toggle-text', toggleButtonText.textContent);
                            toggleButtonText.textContent = toggleText;
                        }
                    }

                    setTimeout(() => {
                        isOpenFilters = true;
                    }, 300);
                }
            });
        }

        for (let i = 0; i < filtersItems.length; i += 1) {
            const filtersItem = filtersItems[i];
            const filtersItemButton = filtersItem.querySelector('.js-filters-item-button');
            const filtersItemContent = filtersItem.querySelector('.js-filters-item-content');

            if (filtersItemButton) {
                let isOpenFilterItem = true;

                filtersItemButton.addEventListener('click', () => {
                    if (isOpenFilterItem) {
                        isOpenFilterItem = false;

                        if (!filtersItem.classList.contains('is-open')) {
                            filtersItem.classList.add('is-open');
                            filtersItemButton.setAttribute('aria-expanded', 'true');
                            filtersItemContent.style.maxHeight = `${filtersContent.scrollHeight}px`;

                            setTimeout(() => {
                                filtersItemContent.style.maxHeight = null;
                                filtersItem.classList.add('is-visible');
                            }, 300);
                        } else {
                            filtersItemContent.style.maxHeight = `${filtersItemContent.scrollHeight}px`;
                            filtersItem.classList.remove('is-visible', 'is-open');
                            filtersItemButton.setAttribute('aria-expanded', 'false');

                            setTimeout(() => {
                                filtersItemContent.style.maxHeight = null;
                            }, 1);
                        }

                        setTimeout(() => {
                            isOpenFilterItem = true;
                        }, 300);
                    }
                });
            }
        }

        toggleReset();
    }

    document.addEventListener('click', (event) => {
        const target = event.target;
        let filters;
        let filtersMoreButton = target;
        let filtersMoreText;

        if (target.closest('.js-filters-more-button') || target.hasAttribute('.js-filters-more-button')) {
            if (target.closest('.js-filters-more-button')) {
                filtersMoreButton = target.closest('.js-filters-more-button');
            }

            filters = filtersMoreButton.closest('.js-filters');
            filtersMoreText = filtersMoreButton.querySelector('.js-filters-more-text');

            if (filters) {
                const hiddenFilters = filters.querySelectorAll('.js-filters-item[data-filter-hidden]');

                for (let i = 0; i < hiddenFilters.length; i++) {
                    const filterHidden = hiddenFilters[i];
                    filterHidden.classList.toggle('is-hidden');
                }
            }

            filtersMoreButton.classList.toggle('is-active');

            if (filtersMoreText) {
                const toggleText = filtersMoreText.getAttribute('data-toggle-text') || '';

                if (toggleText) {
                    filtersMoreText.setAttribute('data-toggle-text', filtersMoreText.textContent);
                    filtersMoreText.textContent = toggleText;
                }
            }
        }
    });
}
