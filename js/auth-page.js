import { emailTest, passwordTest } from './options.js';

// Главное меню

const pageNavLinks = document.querySelectorAll('.navigation__nav-button');

function showPaidServicesSection(link) {
    pageNavLinks.forEach(function (pageNavLink) {
        const idElement = pageNavLink.id;
        const blockArr = document.querySelectorAll(`.${idElement}`);
        if (link !== pageNavLink) {
            pageNavLink.classList.remove('navigation__nav-button--active');
            blockArr.forEach(block => {
                block.classList.add('disabled');
            });
        } else {
            pageNavLink.classList.add('navigation__nav-button--active');
            blockArr.forEach(block => {
                block.classList.remove('disabled');
            });
        }
    })
}

pageNavLinks.forEach(function (pageNavLink) {
    pageNavLink.addEventListener('click', () => showPaidServicesSection(pageNavLink))
});

// анимация главного меню

const navButtons = document.querySelectorAll('.navigation__nav-button');
const navButtonsActive = document.querySelector('.navigation__nav-button--active');
const navButtonSlider = document.querySelector('.navigation__nav-slider');

//передвижение фона 

navButtonSlider.style.width = `${navButtons[0].offsetWidth - 4}px`;

navButtons.forEach(function (navButton) {
    navButton.addEventListener('click', () => {
        navButtonSlider.style.width = `${navButton.offsetWidth - 4}px`;
        navButtonSlider.style.left = `${navButton.offsetLeft + 2}px`;
        navButtonSlider.style.transition = '0.5s all';
        emailInput.value = '';
        mask.value = '';
        activateDefault();
    })
})

window.addEventListener('resize', function () {
    navButtons.forEach(function (navButton) {
        if (navButton.classList.contains('navigation__nav-button--active')) {
            navButtonSlider.style.width = `${navButton.offsetWidth - 4}px`;
            navButtonSlider.style.left = `${navButton.offsetLeft + 2}px`;
        }
    })
});

// действия с меню

const overlayBlock = document.querySelector('.overlay');
const authSection = document.querySelector('.authorization-page');
const regRestoreWrapper = document.querySelector('.registration-restore-page');
const regSection = document.querySelector('.registration-page');
const regExistSection = document.querySelector('.registration-exist-page');
const regRestoreSection = document.querySelector('.restore-page');
const emailInput = document.querySelector('.authorization__type-item-input--email');
const emailInputLabel = document.querySelector('.email-authorization-wrapper');
const buttonClearInputArr = document.querySelectorAll('.authorization__input-button--clear-input');
let phoneInput = document.querySelector('.authorization__type-item-input--phone');
const phoneInputWrapper = document.querySelector('.phone-authorization-wrapper');
const phoneInputLabel = document.querySelector('.authorization__type-label--phone');
const authButtonContinue = document.querySelector('.authorization__button--continue');
const authButtonGoToStart = document.querySelector('.authorization-page__navigation-link-go-back');
const authTitleWrapper = document.querySelector('.authorization-page__type-title-wrapper');
const authTitle = document.querySelector('.authorization-page__title');
const authInputTypeArr = document.querySelectorAll('.authorization__type-item-input');
const authPasswordFieldArr = document.querySelectorAll('.password-authorization');
const authPasswordInput = document.querySelector('.authorization__password-input--password');
const authPasswordButtonShowPW = document.querySelector('.authorization__input-button--show-pw');
const authAdditionalLogin = document.querySelector('.authorization-page__additional-login');
const authAlertWrongLogin = document.querySelector('.authorization__alert--wrong-pass');
const authAlertIncorrectPW = document.querySelector('.authorization__alert--incorrect-pass');
const authButtonRegistration = document.querySelector('.authorization-page__button-go-to-registration');
const authButtonEnter = document.querySelector('.authorization__button--enter');
const buttonChooseCountry = authSection.querySelector('.country-selector__button');
let countryList = authSection.querySelector('.country-selector__country-list');
let countryItem = authSection.querySelector('.country-selector__item');
const authFooterWrapper = document.querySelector('.authorization-footer__wrapper');

// восстановление пароля
const buttonRestoreAccount = document.querySelector('.authorization__link-password-restore');
const restoreSection = document.querySelector('.restore-page');
const buttonAuthSuccessToMain = document.querySelector('.registration__button--popup-auth');
const popupAuthSuccess = document.querySelector('.auth-success-banner');

// проверка почты на ввод
// запуск маски номера телефона

let maskOptions = { mask: '+{7} 000 000-00-00', lazy: false };
var mask = IMask(phoneInput, maskOptions);

// 123@mail.ru
// проверки полей  почты

let checkEmailInput = () => {

    if (emailInput.value.length > 0) {
        if (!(emailTest.test(emailInput.value))) {
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }
    } else {
        emailInput.classList.add('error');
    }


};

emailInput.addEventListener('input', function () {
    let parent = emailInput.closest('.authorization__type-label');
    let buttonClearInput = parent.querySelector('.authorization__input-button--clear-input')
    if (emailInput.value != '') {
        buttonClearInput.classList.remove('input-empty');
    } else {
        buttonClearInput.classList.add('input-empty');
    }

    checkEmailInput();
});

buttonClearInputArr.forEach(button => {
    button.addEventListener('click', function () {
        let parent = button.closest('.authorization__type-label');
        let input = parent.querySelector('.authorization__type-item-input');
        input.value = '';
        input.classList.remove('error');
        button.classList.add('input-empty');


        if (parent.classList.contains('email-input')) {
            checkEmailInput();
        }

    })
});

;

// проверки полей ввод телефона
let checkPhoneInput = () => {
    let maskdata = mask.mask;
    let maskdataArr = maskdata.split(/[- : ' ' { } + ( ) _ ]/);
    maskdataArr.splice(0, 1);
    let clearMaskArr = maskdataArr.join("").split('');
    let inputData = mask.value;
    let inputDataArr = inputData.split(/[- : ' ' { } + ( ) _ ]/);
    inputDataArr.splice(0, 1);
    let clearinputDataArr = inputDataArr.join("").split('');

    if (clearinputDataArr.length != clearMaskArr.length) {
        phoneInputLabel.classList.add('error');
    } else {
        phoneInputLabel.classList.remove('error');
    }
};

phoneInput.addEventListener('input', function () {
    checkPhoneInput();
});

//
let checkPWInput = () => {
    authAlertWrongLogin.classList.add('disabled');
    authAlertIncorrectPW.classList.add('disabled');
    if (authPasswordInput.value.length < 8) {
        authPasswordInput.classList.add('error');
    } else {
        authPasswordInput.classList.remove('error');
    }
};

authPasswordInput.addEventListener('input', function () {
    checkPWInput();
});

// подготовка к вводу пароля
let activatePWInput = () => {
    authButtonGoToStart.classList.remove('disabled');
    authInputTypeArr.forEach(type => {
        type.setAttribute('readonly', true);
        type.classList.add('input-blocked');
    });
    authTitleWrapper.classList.add('disabled');
    authPasswordFieldArr.forEach(item => {
        item.classList.remove('disabled');
    });
    authAdditionalLogin.classList.add('disabled');
    authButtonRegistration.classList.add('disabled');
    authButtonContinue.classList.add('disabled');
    authButtonEnter.classList.remove('disabled');
    buttonChooseCountry.classList.add('button-blocked');
    phoneInputLabel.classList.add('input-blocked');
    authFooterWrapper.classList.add('pw-activated');

    buttonClearInputArr.forEach(button => {
        button.classList.add('input-empty');
    });

};

let resetInputs = () => {
    mask.value = '';
    emailInput.value = '';
};

let activateDefault = () => {
    authButtonGoToStart.classList.add('disabled');
    authInputTypeArr.forEach(type => {
        type.removeAttribute('readonly');
        type.classList.remove('input-blocked');
        type.classList.remove('error');
    });
    authTitleWrapper.classList.remove('disabled');
    authPasswordFieldArr.forEach(item => {
        item.classList.add('disabled');
    });
    authAdditionalLogin.classList.remove('disabled');
    authButtonRegistration.classList.remove('disabled');
    authButtonContinue.classList.remove('disabled');
    authButtonEnter.classList.add('disabled');
    countryList.classList.remove('active');
    authPasswordInput.classList.remove('error');
    authPasswordInput.value = '';
    phoneInputLabel.classList.remove('error');
    //
    buttonChooseCountry.classList.remove('button-blocked');
    phoneInputLabel.classList.remove('input-blocked');
    authFooterWrapper.classList.remove('pw-activated');
    authAlertIncorrectPW.classList.add('disabled');
};

// показать пароль

authPasswordButtonShowPW.addEventListener('click', function (evt) {
    authPasswordButtonShowPW.classList.toggle('password-visible');
    if (authPasswordButtonShowPW.classList.contains('password-visible')) {
        authPasswordInput.setAttribute('type', 'text');

    } else {
        authPasswordInput.setAttribute('type', 'password');
    }
});

// кнопка назад
authButtonGoToStart.addEventListener('click', function (evt) {
    evt.preventDefault();
    activateDefault();
});

// смена региона для поля телефона

let setCountryData = (label) => {
    let phoneInput = document.querySelector('.authorization__type-item-input--phone');
    let buttonChooseCountry = document.querySelector('.country-selector__button');
    let parent = label.closest('.phone-authorization__country-selector-wrapper');
    let parentlist = parent.querySelector('.country-selector__country-list');
    let countryName = label.getAttribute('country-data');
    let countryMaskData = label.getAttribute('mask-data');
    let countryPlaceholderData = label.getAttribute('placeholder-data');
    let codeData = label.querySelector('.country-selector__data');
    phoneInput.value = '';
    buttonChooseCountry.className = '';
    buttonChooseCountry.classList.add('country-selector__button');
    buttonChooseCountry.classList.add(String(`country-selector__button--${countryName}`));
    phoneInput.setAttribute('placeholder', countryPlaceholderData)
    mask.value = '';
    mask.typedValue = codeData.textContent;
    mask.updateOptions({ mask: countryMaskData });
    parentlist.classList.remove('active');
    overlayBlock.classList.remove('overlay--active');
    buttonChooseCountry.classList.remove('active');
    phoneInputLabel.classList.remove('error');
    phoneInput.focus();
};

const openCloseMenu = () => {
    overlayBlock.classList.add('overlay--active');
    let buttonChooseCountry = document.querySelector('.country-selector__button');
    let countryList = document.querySelector('.country-selector__country-list');
    countryList.classList.toggle('active');
    buttonChooseCountry.classList.add('active')
    let countryItemArr = document.querySelectorAll('.country-selector__item');
    countryItemArr[0].focus();
    countryItemArr.forEach(item => {
        item.onkeydown = (evt) => {
            if (evt.code == 'Enter') {
                setCountryData(item);
                phoneInput.focus();
                item.onkeydown = '';
            }
            if (evt.code == 'Space') {
                setCountryData(item);
                phoneInput.focus();
                item.onkeydown = '';
            }
            if (evt.code == 'Escape') {
                closeCountryList();
                item.onkeydown = '';
            }
            if (evt.code == 'Tab') {
                evt.preventDefault();
                closeCountryList();
                phoneInput.focus();
                item.onkeydown = '';
            }
        }
        item.onmousedown = (evt) => {
            phoneInput.focus();
            if (evt.button == '0') {
                setCountryData(item);
                phoneInput.focus();
            }
        };
    });
    if (countryList.classList.contains('active')) {
        buttonChooseCountry.classList.add('active');
    } else {
        buttonChooseCountry.classList.remove('active');
        overlayBlock.classList.remove('overlay--active');
    }
};

let closeCountryList = () => {
    countryList.classList.remove('active');
    overlayBlock.classList.remove('overlay--active');
    buttonChooseCountry.classList.remove('active');
};

buttonChooseCountry.addEventListener('click', function () {
    if (!buttonChooseCountry.classList.contains('button-blocked')) {
        openCloseMenu();
        overlayBlock.onclick = () => {
            closeCountryList();
            overlayBlock.onclick = "";
        }
    }
});

// кнопка продолжить
phoneInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        authButtonContinue.click();
    }
})

emailInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        authButtonContinue.click();
    }
})

authButtonContinue.addEventListener('click', function () {
    // checkEmailInput();

    if (emailInputLabel.classList.contains('disabled')) {
    } else {
        checkEmailInput();
        if (emailInput.classList.contains('error')) {
        } else {
            activatePWInput();
        }
    }

    if (phoneInputWrapper.classList.contains('disabled')) {
    } else {
        checkPhoneInput();
        if (phoneInputLabel.classList.contains('error')) {
        } else {
            activatePWInput();
        }
    }
});

// переключение страниц на вход
const authHeader = document.querySelector('.authorization-header');
const authFooterMain = document.querySelector('.authorization-footer');
const authMain = document.querySelector('.main');
const authFooterRegRestore = document.querySelector('.authorization-footer--reg-restore');

authPasswordInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        authButtonEnter.click();
    }
})

authButtonEnter.addEventListener('click', function () {
    checkPWInput();
    if (authPasswordInput.classList.contains('error')) {
        authAlertIncorrectPW.classList.remove('disabled');
    } else {
        activatePWInput();



        if (authPasswordInput.value === '22222222') {
            // пароль верный - баннер входа
            popupAuthSuccess.classList.remove('disabled');
            overlayBlock.classList.add('overlay--active');
            buttonAuthSuccessToMain.onclick = () => {
                popupAuthSuccess.classList.add('disabled');
                activateDefault();
                resetInputs();
                emailInput.value = '';
            }
            overlayBlock.onclick = () => {
                overlayBlock.classList.remove('overlay--active');
                overlayBlock.onclick = "";
                popupAuthSuccess.classList.add('disabled');
                activateDefault();
                resetInputs();
            }
        } else {
            authAlertWrongLogin.classList.remove('disabled');
            authPasswordInput.classList.add('error');
        }
    }
});

authButtonRegistration.addEventListener('click', function () {
    authSection.classList.add('disabled');
    authHeader.classList.remove('disabled');
    authFooterRegRestore.classList.remove('disabled');
    authFooterMain.classList.add('reg-restore-active');
    authMain.classList.add('reg-restore-active');
    activateDefault();
    regRestoreWrapper.classList.remove('disabled');
    regExistSection.classList.add('disabled');
    regSection.classList.remove('disabled');
    regRestoreSection.classList.add('disabled');
});

// восстановление пароля
buttonRestoreAccount.addEventListener('click', function (evt) {
    evt.preventDefault;
    authSection.classList.add('disabled');
    authHeader.classList.remove('disabled');
    authFooterRegRestore.classList.remove('disabled');
    authFooterMain.classList.add('reg-restore-active');
    authMain.classList.add('reg-restore-active');
    activateDefault();
    regRestoreWrapper.classList.remove('disabled');
    restoreSection.classList.remove('disabled');
});
