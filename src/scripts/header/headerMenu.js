/*
     ----------------
	|  HEADER  MENU  |
	 ----------------
*/

export default function headerMenu(maxWidth = 1024, delay = 300) {
    /*
		@param  {number} delay - menu opening time (also needs to be changed in CSS)
		@param  {number} maxWidth - the maximum width of the browser at which the nested menu fires when clicked
	*/

    const menu = document.querySelector('.js-menu');
    const header = document.querySelector('.js-header');

    if (menu) {
        const menuBurger = menu.querySelector('.js-menu-burger');
        const menuPopup = menu.querySelector('.js-menu-popup');
        const menuContainer = menu.querySelector('.js-menu-container');
        const menuOverlay = menu.querySelector('.js-menu-overlay');
        const menuClose = menu.querySelector('.js-menu-close');
        const menuItems = menu.querySelectorAll('.js-menu-dropdown');
        let isMenu = true;
        let isMenuOpen = false;
        const focusElements = [
            'a[href]',
            'area[href]',
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            'select:not([disabled]):not([aria-hidden])',
            'textarea:not([disabled]):not([aria-hidden])',
            'button:not([disabled]):not([aria-hidden])',
            'iframe',
            'object',
            'embed',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        const focusCatcher = (e, menu) => {
            // Находим все элементы на которые можно сфокусироваться
            const nodes = menu.querySelectorAll(focusElements);

            //преобразуем в массив
            const nodesArray = Array.prototype.slice.call(nodes);

            //если фокуса нет в окне, то вставляем фокус на первый элемент
            if (!menu.contains(document.activeElement)) {
                nodesArray[0].focus();
                e.preventDefault();
            } else {
                const focusedItemIndex = nodesArray.indexOf(document.activeElement);

                if (e.shiftKey && focusedItemIndex === 0) {
                    //перенос фокуса на последний элемент
                    nodesArray[nodesArray.length - 1].focus();
                    e.preventDefault();
                }

                if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
                    //перенос фокуса на первый элемент
                    nodesArray[0].focus();
                    e.preventDefault();
                }
            }
        };

        const lockBody = () => {
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px';
            document.documentElement.style.setProperty('--lock-padding-right', lockPaddingValue);
            document.body.classList.add('is-menu-active');
        };

        const unlockBody = () => {
            document.documentElement.style.removeProperty('--lock-padding-right');
            document.body.classList.remove('is-menu-active');
        };

        const openMenu = () => {
            if (isMenu) {
                isMenu = false;

                if (menuBurger) {
                    const ariaLabel = menuBurger.getAttribute('aria-label');

                    menuBurger.classList.add('is-active');
                    menuBurger.setAttribute('aria-label', menuBurger.getAttribute('data-aria-label'));
                    menuBurger.setAttribute('data-aria-label', ariaLabel);
                }

                if (menuOverlay) {
                    menuOverlay.classList.add('is-active');
                }

                if (menuPopup) {
                    menuPopup.classList.add('is-visible');

                    setTimeout(() => {
                        menuPopup.classList.add('is-active');
                    }, 1);
                }

                if (menuContainer) {
                    menuContainer.scrollTop  = 0;
                }

                isMenuOpen = true;

                lockBody();

                setTimeout(() => {
                    isMenu = true;
                }, delay);

                setTimeout(() => {
                    const firstItem = menu.querySelector('.js-menu-dropdown');

                    if (firstItem) {
                        firstItem.classList.add('is-active');
                    }
                }, 1000);
            }
        };

        const closeMenu = () => {
            if (isMenu) {
                isMenu = false;

                if (menuBurger) {
                    const ariaLabel = menuBurger.getAttribute('aria-label');

                    menuBurger.classList.remove('is-active');
                    menuBurger.setAttribute('aria-label', menuBurger.getAttribute('data-aria-label'));
                    menuBurger.setAttribute('data-aria-label', ariaLabel);
                }

                if (menuOverlay) {
                    menuOverlay.classList.remove('is-active');
                }

                if (menuPopup) {
                    menuPopup.classList.remove('is-active');

                    setTimeout(() => {
                        menuPopup.classList.remove('is-visible');

                        const firstItem = menu.querySelector('.js-menu-dropdown.is-active');

                        if (firstItem) {
                            firstItem.classList.remove('is-active');
                        }
                    }, delay);
                }

                isMenuOpen = false;

                unlockBody();

                setTimeout(() => {
                    isMenu = true;
                }, delay);
            }
        };

        menuItems.forEach((item) => {
            const link = item.querySelector('.js-menu-link');

            const openSubmenu = () => {
                if (window.innerWidth >= maxWidth) {
                    const menuItemActive = menu.querySelector('.js-menu-dropdown.is-active');

                    if (menuItemActive) {
                        menuItemActive.classList.remove('is-active');
                    }

                    item.classList.add('is-active');
                }
            }

            const closeActiveMenu = () => {
                if (window.innerWidth >= maxWidth) {
                    const menuItemActive = menu.querySelector('.js-menu-dropdown.is-active');

                    if (menuItemActive) {
                        menuItemActive.classList.remove('is-active');
                    }
                }
            }

            link.addEventListener('focus', () => {
                if (item.classList.contains('js-menu-dropdown')) {
                    openSubmenu();
                } else {
                    closeActiveMenu();
                }
            });


            item.addEventListener('mouseenter', () => {
                openSubmenu();
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth >= maxWidth) {
                    if (!item.classList.contains('js-menu-dropdown')) {
                        item.classList.remove('is-active');
                    }
                }
            });
        });

        if (menuBurger) {
            menuBurger.addEventListener('click', () => {
                if (menuBurger.classList.contains('is-active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (menuClose) {
            menuClose.addEventListener('click', () => {
                closeMenu();
            });
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                closeMenu();
            });
        }

        document.addEventListener('keydown', (e) => {
            if ((e.code === 'Escape' || e.key === 'Escape') && isMenuOpen) {
                closeMenu();
            }

            if ((e.code === 'Tab' || e.key === 'Tab') && isMenuOpen && header) {
                focusCatcher(e, header);
                return;
            }
        });
    }
}
