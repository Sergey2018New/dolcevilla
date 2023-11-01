/*
     ----------------
	|  HEADER  SEARCH  |
	 ----------------
*/

export default function headerSearch() {
    const headerSearchPopup = document.querySelector('.js-header-search-popup');
    const widthMobile = 767;

    if (headerSearchPopup) {
        const headerSearchOpen = document.querySelector('.js-header-search-open');
        const searchInput = headerSearchPopup.querySelector('.js-header-search-input');
        const searchClose = headerSearchPopup.querySelector('.js-header-search-close');
        const searchResult = headerSearchPopup.querySelector('.js-header-search-result');

        const openSearch = () => {
            document.body.classList.add('is-search-active');
            headerSearchPopup.classList.add('is-active');

            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 300);
            }
        };

        const closeSearch = () => {
            document.body.classList.remove('is-search-active');
            headerSearchPopup.classList.remove('is-active');

            if (searchResult) {
                searchResult.classList.remove('is-active');
            }
        };

        const openResult = () => {
            if (searchResult) {
                searchResult.classList.add('is-active');
            }
        };

        const closeResult = () => {
            if (searchResult) {
                searchResult.classList.remove('is-active');
            }
        };

        const setPlaceholderInput = () => {
            if (searchInput) {
                const placeholder = searchInput.getAttribute('data-placeholder') || '';
                const placeholderMobile = searchInput.getAttribute('data-placeholder-mobile') || '';

                if (window.innerWidth <= widthMobile) {
                    searchInput.setAttribute('placeholder', placeholderMobile);
                } else {
                    searchInput.setAttribute('placeholder', placeholder);
                }
            }
        };

        setPlaceholderInput();

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                if (searchInput.value.trim() !== '' && searchInput.value.length >= 2) {

                    BX.ajax.runComponentAction('dev:search.title','list',{
                        mode: 'class',
                        data: {q:searchInput.value},
                    }).then(function(response) {
                        if(response.status === 'success' && response.data){
                            $('.js-header-search-result').html(response.data.template);
                            openResult();
                        }
                    });


                } else {
                    closeResult();
                }
            });
        }

        if (headerSearchOpen) {
            headerSearchOpen.addEventListener('click', () => {
                openSearch();
            });
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                closeSearch();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (document.activeElement.closest('.js-header-search-popup') && (e.key === 'Escape' || e.code === 'Escape')) {
                closeSearch();
                if (headerSearchOpen) {
                    headerSearchOpen.focus();
                }
                return;
            }
        });

        document.addEventListener('click', (e) => {
            const target = e.target;

            if (!target.closest('.js-header-search-popup') && !target.classList.contains('js-header-search-popup') &&
            !target.closest('.js-header-search-open') && !target.classList.contains('js-header-search-open')) {
                closeSearch();
            }
        });

        window.addEventListener('resize', setPlaceholderInput);
    }
}
