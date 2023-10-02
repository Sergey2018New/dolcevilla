
export default function detailGallery() {
	const detailGallery = document.querySelector('.js-detail-gallery');
    const gallerySwitchRadioItems = document.querySelectorAll('.js-detail-gallery-switch [type="radio"]');
    const galleryShowAll = document.querySelector('.js-detail-gallery-all');
    const galleryFirstImage = document.querySelector('.js-detail-gallery-link:first-child');

    if (detailGallery) {
        for (let i = 0; i < gallerySwitchRadioItems.length; i++) {
            const gallerySwitchRadio = gallerySwitchRadioItems[i];

            gallerySwitchRadio.addEventListener('change', () => {
                if (gallerySwitchRadio.value === 'gallery') {
                    detailGallery.classList.add('is-gallery');
                } else {
                    detailGallery.classList.remove('is-gallery');
                }
            });
        }

        if (galleryShowAll) {
            galleryShowAll.addEventListener('click', () => {
                if (galleryFirstImage) {
                    galleryFirstImage.click();
                }
            });
        }
    }
}
