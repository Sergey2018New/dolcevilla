
export default function detailBooking() {
	const bookingButton = document.querySelector('.js-detail-booking-button');
	const bookingBlockFixed = document.querySelector('.js-detail-booking-fixed');
	const footer = document.querySelector('.js-footer');

	if (bookingBlockFixed && bookingButton) {
        const fixedDetailedBooking = () => {
            const scrollTop = window.scrollY;
            const blockPositionTop = bookingButton.getBoundingClientRect().top + scrollTop + bookingButton.getBoundingClientRect().height;
            const footerPositionTop = footer ? (footer.getBoundingClientRect().top + scrollTop) : 0;

            if (scrollTop > blockPositionTop) {
                bookingBlockFixed.classList.add('is-visible');

                if (scrollTop + window.innerHeight > footerPositionTop) {
                    bookingBlockFixed.classList.remove('is-visible');
                }
            } else {
                bookingBlockFixed.classList.remove('is-visible');
            }


        }

        fixedDetailedBooking();

        window.addEventListener('scroll', fixedDetailedBooking);
    }
}
