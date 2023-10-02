/* Создание переменной vh для задания высоты */
const setHeightProperty = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

setHeightProperty();

window.addEventListener('resize', () => {
    setHeightProperty();
});

document.addEventListener('DOMContentLoaded', function(){
    document.documentElement.classList.add('html-is-loaded');
});
