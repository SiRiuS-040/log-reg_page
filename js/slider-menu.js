const menuLinks = document.querySelectorAll('.menu__item-link');
const menuSlider = document.querySelector('.menu-slider');

//передвижение подчеркивания
menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener('click', () => {
        menuSlider.style.width = `${menuLink.offsetWidth}px`
        menuSlider.style.left = `${menuLink.offsetLeft}px`
        menuSlider.style.transition = '0.5s all';
    })
})

window.addEventListener('resize', function () {
    menuLinks.forEach(function (menuLink) {
        menuLink.addEventListener('click', () => {
            menuSlider.style.width = `${menuLink.offsetWidth}px`
            menuSlider.style.left = `${menuLink.offsetLeft}px`
        })
    })
});

menuSlider.style.width = `${menuLinks[0].offsetWidth - 4}px`;

//адаптив для подчеркивания
function handleResize() {
    const menuLinkActive = document.querySelector('.menu__item--active');
    menuSlider.style.width = `${menuLinkActive.offsetWidth}px`
    menuSlider.style.left = `${menuLinkActive.offsetLeft}px`
    menuSlider.style.transition = '0s all';

}

let timeOutFunctionId;
window.addEventListener('resize', () => {
    clearTimeout(timeOutFunctionId);
    timeOutFunctionId = setTimeout(handleResize, 0);
})


const pageNavLinks = document.querySelectorAll('.menu__item-link');
// const menuSlider = document.querySelector('.menu-slider');

function showPaidServicesSection(link) {
    pageNavLinks.forEach(function (pageNavLink) {
        const idElement = pageNavLink.id;
        const block = document.querySelector(`.${idElement}`);

        if (link !== pageNavLink) {
            pageNavLink.classList.remove('menu__item--active');
            block.classList.add('disabled');
        } else {
            pageNavLink.classList.add('menu__item--active');
            block.classList.remove('disabled');
        }
    })
}

pageNavLinks.forEach(function (pageNavLink) {
    pageNavLink.addEventListener('click', () => showPaidServicesSection(pageNavLink))
});