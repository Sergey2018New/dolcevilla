import tippy from 'tippy.js';

export default function tooltip(tooltipContainer) {
	/*
		Tippyjs
		https://atomiks.github.io/tippyjs/
	*/

	let tooltips;

	if (tooltipContainer) {
		if (tooltipContainer instanceof Node) {
			tooltips = tooltipContainer.querySelectorAll('[data-tooltip]');
		}
	} else {
		tooltips = document.querySelectorAll('[data-tooltip]');
	}

	if (tooltips.length) {
        /**
            * Is Mobile
        */
        const isMobile = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
            (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform));
        };

        const tooltipInit = (tooltip) => {
            tooltip.setAttribute('data-tooltip-init', '');

            let tooltipContent = tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '';
            let tooltipTrigger = tooltip.getAttribute('data-tooltip-trigger') || 'mouseenter focus';

            if (tooltipContent) {
                tippy(tooltip, {
                    content: tooltipContent,
                    allowHTML: true,
                    trigger: tooltipTrigger,
                    placement: 'top-start',
                    distance: 14,
                    offset: '-4,0',
                    maxWidth: 270,
                });
            }

            tooltip.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                }
            });
        }

        for (let i = 0; i < tooltips.length; i += 1) {
            const tooltip = tooltips[i];

            if (!tooltip.hasAttribute('data-tooltip-init')) {
                tooltipInit(tooltip);
            }
        }
    }
}
