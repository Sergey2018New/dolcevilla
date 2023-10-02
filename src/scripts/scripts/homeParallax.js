export default function homeParallax() {
    const homeParallaxElements = document.querySelectorAll('.js-home-parallax');

    homeParallaxElements.forEach((homeParallaxEl) => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const heightParallax = homeParallaxEl.getBoundingClientRect().height;
            const percent = scrollTop / heightParallax;
            const offset = 1 - percent * 0.1;

            if (offset > 0.9) {
                homeParallaxEl.style.transform = ` scale(${offset})`;
            }
        });
    });
}
