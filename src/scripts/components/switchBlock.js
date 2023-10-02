export default function switchBlock() {
	const switchBlocks = document.querySelectorAll('[data-switch]');

	for (let i = 0; i < switchBlocks.length; i += 1) {
		setTimeout(() => {
            const switchBlock = switchBlocks[i];
            const switchId = Date.now();
            const switchType = switchBlock.getAttribute('[data-switch-type]');
            const switchBackground = switchBlock.querySelector('[data-switch-background]');
            const switchMenu = switchBlock.querySelector('[data-switch-menu]')
                || switchBlock.querySelector('[data-switch-fieldset]');
            const switchItems = switchBlock.querySelectorAll('[data-switch-item]');
            const switchFieldset = switchBlock.querySelector('[data-switch-fieldset]');
            const switchRadioElements = switchBlock.querySelectorAll('[data-switch-radio]');

            const getSwitchItemActive = () => {
                return switchBlock.querySelector('[data-switch-item].is-active');
            };

            const offsetSwitchBackground = () => {
                const switchItemActive = getSwitchItemActive();

                if (switchMenu && switchItemActive && switchBackground) {
                    const offsetActiveItem = switchItemActive.getBoundingClientRect();
                    const left = Math.floor(switchItemActive.offsetLeft - switchMenu.offsetLeft) +  'px';
                    const width = offsetActiveItem.width + 'px';

                    switchBackground.style.transform = `translate3d(${left}, 0 , 0)`;
                    switchBackground.style.width = width;
                }
            };

            const changeRadio = (target) => {
                const activeItem = getSwitchItemActive();

                if (activeItem) {
                    activeItem.classList.remove('is-active');
                }

                target.closest('[data-switch-item]').classList.add('is-active');

                if (switchFieldset) {
                    switchFieldset.setAttribute('aria-activedescendant', target.id);
                }

                offsetSwitchBackground();
            };

            if (switchMenu) {
                offsetSwitchBackground();
            }

            for (let i = 0; i < switchRadioElements.length; i++) {
                const switchRadio = switchRadioElements[i];

                switchRadio.id = `switch-radio-${switchId}-${i + 1}`;

                switchRadio.addEventListener('change', (event) => {
                    changeRadio(event.target);
                });
            }

            if (switchType === 'menu') {
                for (let j = 0; j < switchItems.length; j += 1) {
                    const switchButton = switchItems[j];

                    switchButton.addEventListener('click', () => {
                        if (getSwitchItemActive()) {
                            getSwitchItemActive().classList.remove('is-active');
                        }

                        switchButton.classList.add('is-active');

                        offsetSwitchBackground();
                    });
                }
            }

            window.addEventListener("resize", () => {
                if (switchMenu) {
                    offsetSwitchBackground();
                }
            });

            document.addEventListener("scroll", () => {
                if (switchMenu) {
                    offsetSwitchBackground();
                }
            });
        }, 5);
	}
}
