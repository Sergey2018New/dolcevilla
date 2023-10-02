export default function switchSeason() {
    const switchSeasonElements = document.querySelectorAll('.js-switch-season');
    const setSeason = (seasonValue) => {
        for (let i = 0; i < switchSeasonElements.length; i += 1) {
            const currentSwitch = switchSeasonElements[i];
            const currentRadioElements = currentSwitch.querySelectorAll('input[type="radio"]');

            currentRadioElements.forEach((currentRadio) => {
                if (currentRadio.value === seasonValue) {
                    currentRadio.click();
                }
            });
        }
    };

    for (let i = 0; i < switchSeasonElements.length; i += 1) {
        const switchSeasonEl = switchSeasonElements[i];
        const switchRadioElements = switchSeasonEl.querySelectorAll('input[type="radio"]');

        switchRadioElements.forEach((switchRadio) => {
            let seasonValue = switchRadio.value;
            let homeBackground;

            switchRadio.addEventListener('change', () => {
                const homeBackgroundActive = document.querySelector(`.js-home-background.is-active`);

                homeBackground = document.querySelector(`.js-home-background[data-season="${seasonValue}"]`);

                if (homeBackground) {
                    if (homeBackgroundActive) {
                        homeBackgroundActive.classList.remove('is-active');
                    }

                    homeBackground.classList.add('is-active');
                }

                setSeason(seasonValue);
            });
        });
    }
}
