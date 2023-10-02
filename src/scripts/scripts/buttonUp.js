
export default function buttonUp() {
    const buttonUpEl = document.querySelector('.js-button-up');

    if (buttonUpEl) {
        buttonUpEl.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;

            if (scrollTop > 100) {
                buttonUpEl.classList.add('is-active');
            } else {
                buttonUpEl.classList.remove('is-active');
            }
        });
    }
}
