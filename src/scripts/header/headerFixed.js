/*
     ---------------
	|   FIX HEADER   |
	  ---------------
*/

export default function headerFixed() {
    const header = document.querySelector('.js-header');

    if (header) {
        const fixedStartClass = 'is-fixed-start';
        const fixedClass = 'is-fixed';
        const isAddHeight = true;
        let scrollTop = 0;
        let headerHeight;
        let positionTop;
        const fixed = () => {
            scrollTop = window.scrollY;
            headerHeight = header.offsetHeight;
            positionTop = header.getBoundingClientRect().top + scrollTop + headerHeight;

            if (scrollTop > positionTop) {
                header.classList.add(fixedStartClass);
            } else {
                header.classList.remove(fixedStartClass);
            }

            if (scrollTop > positionTop * 1.5) {
                if (isAddHeight) {
                    header.style.height = `${headerHeight}px`;
                }

                header.classList.add(fixedClass);
            } else {
                header.classList.remove(fixedClass);

                if (isAddHeight) {
                    header.style.removeProperty('height');
                }
            }
        };

        fixed();

        window.addEventListener('scroll', fixed);
    }
}
