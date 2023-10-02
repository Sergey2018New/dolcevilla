import { Fancybox } from "@fancyapps/ui";

Fancybox.defaults.dragToClose = false;
Fancybox.defaults.template = {
	closeButton: `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" width="24" height="1" transform="rotate(45 1 0)" fill="white"/>
    <rect y="17" width="24" height="1" transform="rotate(-45 0 17)" fill="white"/>
    </svg>`,
};

export default function fancybox() {
    Fancybox.bind('[data-fancybox]', {
        idle: false,
        Thumbs: {
            type: "classic",
        },
        Toolbar: {
            display: {
              left: [],
              right: ['close'],
            },
        },
        Images: {
            zoom: false,
        },
    });
}
