import Swiper, {
    FreeMode,
    Keyboard,
    Navigation,
    Pagination,
    Thumbs,
    Scrollbar,
} from 'swiper';

/*
	Swiper
	https://swiperjs.com/swiper-api
*/

export default function swiper() {
    const sliderCompare = () => {
        const sliderCompareEl = document.querySelector('.js-slider-compare');
        let swiperCompare;

        if (sliderCompareEl) {
            swiperCompare = new Swiper(sliderCompareEl, {
                modules: [Keyboard, Scrollbar, FreeMode],
                speed: 500,
                grabCursor: true,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                scrollbar: {
                    el: '.js-slider-compare-scrollbar',
                    draggable: true,
                    snapOnRelease: false,
                },
                slidesPerView:'auto',
                spaceBetween: 0,
                loop: false,
                freeMode: {
                    enabled: true,
                },
            });

            const observer = new MutationObserver((mutationRecords) => {
                swiperCompare.update()
            });

            observer.observe(sliderCompareEl, {
                childList: true, // наблюдать за непосредственными детьми
                subtree: true, // и более глубокими потомками
                characterDataOldValue: true // передавать старое значение в колбэк
            });
        }
    };

    sliderCompare();

	new Swiper('.js-latest-articles', {
		modules: [Keyboard, Navigation],
		speed: 500,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 1,
		spaceBetween: 40,
		loop: false,
		navigation: {
		  prevEl: '.js-latest-articles-prev',
		  nextEl: '.js-latest-articles-next',
		},
		breakpoints: {
			576: {
			  spaceBetween: 20,
			},
		},
	});

	new Swiper('.js-popular-resorts', {
		modules: [Keyboard, Navigation, FreeMode],
		speed: 500,
		freeMode: {
			enabled: true,
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 'auto',
		spaceBetween: 15,
		loop: false,
		navigation: {
		  prevEl: '.js-popular-resorts-prev',
		  nextEl: '.js-popular-resorts-next',
		},
		breakpoints: {
			768: {
                slidesPerView: 'auto',
				spaceBetween: 20,
			},
			1101: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
			1200: {
				slidesPerView: 1,
				spaceBetween: 40,
			},
		},
	});

	new Swiper('.js-slider-chalet', {
		modules: [Keyboard, Navigation, Pagination],
		speed: 500,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		navigation: {
		  prevEl: '.js-slider-chalet-prev',
		  nextEl: '.js-slider-chalet-next',
		},
		pagination: {
			el: '.js-slider-chalet-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
			  spaceBetween: 0,
			},
		},
	});

    const resortGalleryThumbs = new Swiper('.js-resort-thumbs', {
		modules: [Keyboard, Navigation, FreeMode],
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
        freeMode: true,
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        slidesPerGroup: 2,
		spaceBetween: 10,
		loop: false,
		navigation: {
		  prevEl: '.js-resort-thumbs-prev',
		  nextEl: '.js-resort-thumbs-next',
		},
		breakpoints: {
            768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
			    spaceBetween: 20,
			},
			1300: {
                slidesPerView: 'auto',
                slidesPerGroup: 4,
			    spaceBetween: 20,
			},
		},
	});

	new Swiper('.js-resort-gallery', {
		modules: [Keyboard, Thumbs],
		speed: 500,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 1,
		spaceBetween: 0,
		loop: false,
        thumbs: {
            swiper: resortGalleryThumbs,
        },
	});

    new Swiper('.js-detail-slider', {
        modules: [Keyboard, Navigation, Pagination],
        speed: 500,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            prevEl: '.js-detail-slider-prev',
            nextEl: '.js-detail-slider-next',
        },
        pagination: {
            el: '.js-detail-slider-pagination',
            type: 'bullets',
            clickable: true,
        },
        slidesPerView: 3,
        spaceBetween: 15,
        loop: true,
        centeredSlides: true,
        breakpoints: {
            768: {
                spaceBetween: 20,
            },
            1101: {
                spaceBetween: 40,
            },
        },
    });

	new Swiper('.js-similar-chalets', {
		modules: [Keyboard, Navigation, FreeMode],
		speed: 500,
        freeMode: {
			enabled: true,
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 2,
        slidesPerGroup: 2,
		spaceBetween: 15,
		loop: false,
		navigation: {
		  prevEl: '.js-similar-chalets-prev',
		  nextEl: '.js-similar-chalets-next',
		},

		breakpoints: {
            768: {
                slidesPerView: 2,
			    spaceBetween: 20,
                slidesPerGroup: 2,
			},
            1101: {
                slidesPerView: 2,
			    spaceBetween: 40,
                slidesPerGroup: 2,
			},
			1200: {
                slidesPerView: 'auto',
			    spaceBetween: 40,
                slidesPerGroup: 3,
			},
		},
	});

	new Swiper('.js-tabs-slider', {
		modules: [Keyboard, Navigation, Pagination],
		speed: 500,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 1,
		spaceBetween: 15,
		loop: true,
		navigation: {
		  prevEl: '.js-tabs-slider-prev',
		  nextEl: '.js-tabs-slider-next',
		},
        pagination: {
			el: '.js-tabs-slider-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
            768: {
			    spaceBetween: 20,
			},
            1101: {
			    spaceBetween: 40,
			},
		},
	});

	new Swiper('.js-slider-availability', {
		modules: [Keyboard, Navigation],
		speed: 500,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 1,
		spaceBetween: 15,
		loop: false,
		navigation: {
		  prevEl: '.js-slider-availability-prev',
		  nextEl: '.js-slider-availability-next',
		},
		breakpoints: {
            768: {
			    spaceBetween: 20,
			},
            1101: {
			    spaceBetween: 40,
			},
		},
	});

    new Swiper('.js-other-articles', {
		modules: [Keyboard, Navigation],
		speed: 500,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 30,
		loop: false,
		navigation: {
		  prevEl: '.js-other-articles-prev',
		  nextEl: '.js-other-articles-next',
		},
		breakpoints: {
			576: {
                slidesPerView: 1,
                slidesPerGroup: 1,
			  spaceBetween: 30,
			},
            768: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
            },
            992: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
            },
		},
	});
}
