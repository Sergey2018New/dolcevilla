export default function detailedDescription() {
    const detailedDescriptionElements = document.querySelectorAll('[data-detailed-description]');

    if (detailedDescriptionElements.length) {
        const setDescriptionHeight = (description, descriptionText) => {
            const descriptionTextNew = descriptionText;
            let descriptionHeight = 0;

            if (descriptionTextNew) {
                descriptionTextNew.style.maxHeight = null;
                descriptionTextNew.style.transitionDuration = '0s';
                descriptionHeight = descriptionTextNew.getBoundingClientRect().height;

                if (descriptionTextNew.scrollHeight > descriptionHeight) {
                    description.classList.add('is-visible-more');
                } else {
                    description.classList.remove('is-visible-more');
                }

                if (description.classList.contains('is-active')) {
                    descriptionTextNew.style.maxHeight = `${descriptionTextNew.scrollHeight}px`;
                }
            }
        };

        for (let i = 0; i < detailedDescriptionElements.length; i += 1) {
            const description = detailedDescriptionElements[i];
            const descriptionText = description.querySelector('[data-detailed-text]');
            const descriptionMore = description.querySelector('[data-detailed-more]');
            const descriptionMoreText = description.querySelector('[data-detailed-more-text]');

            if (descriptionMore) {
                descriptionMore.addEventListener('click', () => {
                    if (descriptionMoreText) {
                        const text = descriptionMoreText.textContent;
                        const toggleText = descriptionMoreText.getAttribute('data-toggle-text');

                        descriptionMoreText.setAttribute('data-toggle-text', text);
                        descriptionMoreText.textContent = toggleText;
                    }

                    if (descriptionText) {
                        descriptionText.style.removeProperty('transition-duration');

                        if (descriptionText.style.maxHeight) {
                            descriptionText.style.maxHeight = null;
                        } else {
                            descriptionText.style.maxHeight = `${descriptionText.scrollHeight}px`;
                        }
                    }

                    description.classList.toggle('is-active');
                });
            }

            setDescriptionHeight(description, descriptionText);

            window.addEventListener('resize', () => {
                setDescriptionHeight(description, descriptionText);
            });
        }
    }
}
