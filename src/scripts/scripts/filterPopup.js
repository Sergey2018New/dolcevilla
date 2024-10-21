
export default function filterPopupInit() {
	const filterInputs = document.querySelectorAll('.js-filter-popup-input');
	const filterPopups = document.querySelectorAll('.js-filter-popup');

    if (filterPopups.length && filterInputs.length) {
        const eventChange = new Event('change');

        const setHeightMenuPopup = (popup) => {
            const filterPopupMenu = popup ? popup.querySelector('.js-filter-popup-menu') : '';

            if (filterPopupMenu) {
                let popupHeight = 0;
                filterPopupMenu.style.removeProperty('height');

                let popupStartHeight = filterPopupMenu.getBoundingClientRect().height;

                if (!popup.classList.contains('is-result')) {
                    const submenuActive = popup.querySelector('.js-filter-popup-item.is-active .js-filter-popup-submenu');

                    if (submenuActive) {
                        popupHeight = submenuActive.getBoundingClientRect().height;
                    }

                    if (popupHeight > popupStartHeight) {
                        filterPopupMenu.style.height = `${popupHeight}px`;
                    } else {
                        filterPopupMenu.style.removeProperty('height');
                    }
                }
            }
        };

        const openPopup = (filterPopup) => {
            if (filterPopup) {
                if (!filterPopup.classList.contains('is-active')) {
                    filterPopup.classList.add('is-active');
                }

                setHeightMenuPopup(filterPopup);
            }
        };

        const closePopup = (filterPopup, filterInput) => {
            if (filterPopup) {
                filterPopup.classList.remove('is-active');
            }

            if (filterInput && filterInput.value.trim() === '') {
                filterInput.value = '';
                filterInput.dispatchEvent(eventChange);
            }
        };

        const clearInput = (filterPopup, filterInput) => {
            filterPopup.classList.remove('is-result');

            if (filterInput) {
                filterInput.value = '';
                filterInput.focus();
            }
        };

        for (let i = 0; i < filterPopups.length; i += 1) {
            const filterPopup = filterPopups[i];
            const filterPopupId = filterPopup.getAttribute('data-id') || '';
            const filterInput = document.querySelector(`.js-filter-popup-input[data-id="${filterPopupId}"]`);
            const filterPopupClear = filterPopup.querySelector('.js-filter-popup-clear');
            const filterPopupClose = filterPopup.querySelector('.js-filter-popup-close');
            const filterPopupItems = filterPopup.querySelectorAll('.js-filter-popup-item');

            if (filterPopupClose) {
                filterPopupClose.addEventListener('click', () => {
                    closePopup(filterPopup, filterInput);
                });
            }

            if (filterPopupClear) {
                filterPopupClear.addEventListener('click', () => {
                    clearInput(filterPopup, filterInput);
                    setHeightMenuPopup(filterPopup);
                });
            }

            filterPopupItems.forEach((filterPopupItem) => {
                const filterPopupLink = filterPopupItem.querySelector('.js-filter-popup-link');
                const filterPopupSubmenu = filterPopupItem.querySelector('.js-filter-popup-submenu');
                const submenuLinks = filterPopupSubmenu ?
                filterPopupSubmenu.querySelectorAll('a') : '';
                const submenuLinksArray = submenuLinks.length ? Array.prototype.slice.call(submenuLinks) : '';
                const filterPopupSubmenuShow = () => {
                    const filterPopupItemActive = filterPopup.querySelector('.js-filter-popup-item.is-active');

                    if (filterPopupItemActive) {
                        filterPopupItemActive.classList.remove('is-active');
                    }

                    filterPopupItem.classList.add('is-active');

                    setHeightMenuPopup(filterPopup);
                };

                if (filterPopupLink) {
                    /**
                        * Move focus through submenu links
                        * @param  {'down' | 'up'} dir - direction
                    */
                    const moveFocusedLinks = (dir) => {
                        let focusedIndex = submenuLinksArray.indexOf(document.activeElement);

                        let focusedIndexNew = dir === 'down'
                        ? focusedIndex + 1 : focusedIndex - 1;
                        let nextFocusedLink;

                        if (focusedIndexNew === submenuLinks.length - 1) {
                            focusedIndexNew = 0;
                        } else if (focusedIndexNew === -1) {
                            focusedIndexNew = submenuLinks.length - 1;
                        }

                        nextFocusedLink = submenuLinks[focusedIndexNew];

                        if (nextFocusedLink) {
                            nextFocusedLink.focus();
                        }
                    };

                    filterPopupLink.addEventListener('mouseenter', () => {
                        filterPopupSubmenuShow();
                    });

                    filterPopupLink.addEventListener('focus', () => {
                        filterPopupSubmenuShow();
                    });

                    filterPopupItem.addEventListener('keydown', (e) => {
                        if ((e.code === 'ArrowLeft' || e.key === 'ArrowLeft')
                            && document.activeElement.closest('.js-filter-popup-submenu')) {
                            filterPopupLink.focus();
                            e.preventDefault();
                        }

                        if ((e.code === 'ArrowRight' || e.key === 'ArrowRight')
                            && document.activeElement === filterPopupLink) {
                            filterPopupSubmenu.querySelectorAll('a')[0].focus();
                            e.preventDefault();
                        }

                        if ((e.code === 'ArrowDown' || e.key === 'ArrowDown')
                            && document.activeElement.closest('.js-filter-popup-submenu')) {
                            moveFocusedLinks('down');
                            e.preventDefault();
                        }

                        if ((e.code === 'ArrowUp' || e.key === 'ArrowUp')
                            && document.activeElement.closest('.js-filter-popup-submenu')) {
                            moveFocusedLinks('up');
                            e.preventDefault();
                        }
                    });
                }
            });

            document.addEventListener('click', (event) => {
                const target = event.target;

                if (
                    !target.closest('.js-filter-popup') &&
                    !target.classList.contains('js-filter-popup') &&
                    !target.classList.contains('js-filter-popup-input')
                    ) {
                    closePopup(filterPopup, filterInput);
                }
            });

            window.addEventListener('resize', () => {
                setHeightMenuPopup(filterPopup);
            });

            document.addEventListener('keyup', (e) => {
                if ((e.code === 'Tab' || e.key === 'Tab')
                    && document.activeElement !== filterInput
                    && document.activeElement.closest('.js-filter-popup') !== filterPopup) {

                    closePopup(filterPopup, filterInput);
                }
            });
        }

        for (let i = 0; i < filterInputs.length; i += 1) {
            const filterInput = filterInputs[i];
            const filterPopupId = filterInput.getAttribute('data-id') || '';
            const filterPopup = document.querySelector(`.js-filter-popup[data-id="${filterPopupId}"]`);

            if (filterInput) {
                filterInput.addEventListener('focus', () => {
                    openPopup(filterPopup);
                });

                filterInput.addEventListener('input', () => {
                    if (filterPopup) {
                        if (filterInput.value.trim() !== '') {
                            filterPopup.classList.add('is-result');
                        } else {
                            filterPopup.classList.remove('is-result');
                        }

                        openPopup(filterPopup);
                    }
                });
            }
        }
    }
}
