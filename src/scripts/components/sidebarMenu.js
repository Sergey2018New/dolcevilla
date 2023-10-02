export default function sidebarMenu() {
	const sidebarMenuElements = document.querySelectorAll('.js-sidebar-menu');

	if (sidebarMenuElements.length) {
        for (let i = 0; i < sidebarMenuElements.length; i += 1) {
            const sidebarMenuEl = sidebarMenuElements[i];
            const sidebarMenuButton = sidebarMenuEl.querySelector('.js-sidebar-menu-button');

            sidebarMenuButton.addEventListener('click', () => {
                sidebarMenuEl.classList.toggle('is-active');
            });
        }

        document.addEventListener('click', (event) => {
            const activeSidebarMenu = document.querySelector('.js-sidebar-menu.is-active');

            if (activeSidebarMenu && !event.target.classList.contains('.js-sidebar-menu')
            && !event.target.closest('.js-sidebar-menu')) {
                activeSidebarMenu.classList.remove('is-active');
            }
        });
    }
}
