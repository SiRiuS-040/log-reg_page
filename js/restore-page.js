import { emailTest, passwordTest, TIMER_DATA } from './options.js';

// действия с меню

const restoreSection = document.querySelector('.restore-page');
const buttonRestoreAccount = document.querySelector('.registration-exist__link-password-restore');
const authSection = document.querySelector('.authorization-page');
const regSection = document.querySelector('.registration-restore-page');
const authMain = document.querySelector('.main');
const authHeader = document.querySelector('.authorization-header');
const authFooterRegRestore = document.querySelector('.authorization-footer--reg-restore');
const authFooterMain = document.querySelector('.authorization-footer');
const regButtonAuthorizationArr = document.querySelectorAll('.registration-page__button-go-to-auth');

// действия с меню
const overlayBlock = document.querySelector('.overlay');
const phoneInput = document.querySelector('.restore-account__type-item-input--phone');
const phoneInputWrapper = document.querySelector('.phone-registration-wrapper');
const phoneInputLabel = document.querySelector('.restore-account__type-label--phone');
const phoneConfirmation = restoreSection.querySelector('.phone-confirmation');
const regButtonContinue = restoreSection.querySelector('.restore-account__button--continue');
const regButtonGoToStart = restoreSection.querySelector('.restore-page__navigation-link-go-back');
const regPhoneCodeInput = restoreSection.querySelector('.restore-account__code-input--password');
const regPhoneCodeInputError = restoreSection.querySelector('.restore-account__confirm-code-alert--wrong-code');
const regPhoneCodeResendTimer = restoreSection.querySelector('.restore-account__confirm-code-alert--resend-timer');
const regPhoneCodeResendButton = restoreSection.querySelector('.restore-account__button-resend-code');
const popupRestoreSuccess = document.querySelector('.restore-success-banner');
const buttonRestoreSuccessToMain = document.querySelector('.registration__button--popup-restore');
// 

let countryList = restoreSection.querySelector('.country-selector__country-list');
const buttonChooseCountry = restoreSection.querySelector('.country-selector__button');
const regExistSection = document.querySelector('.registration-exist-page');

// запуск маски номера телефона
let maskOptions = { mask: '+{7} 000 000-00-00' };
let maskTemplateArr = [];
var mask = IMask(phoneInput, maskOptions);

let checkNameInput = (inputType) => {
    if (!(nameTest.test(inputType.value))) {
        inputType.classList.add('error');
    } else {
        inputType.classList.remove('error');
    }
};

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

let checkConfirmCode = () => {
    let confirm = false;
    let inputData = regPhoneCodeInput.value;
    let inputDataArr = inputData.split(/[- : ' ' { } + ( ) _ ]/);
    let clearinputDataArr = inputDataArr.join("").split('');

    // проверка на 4 знака
    if (inputData == 1111) {
        confirm = true;
    } else {
        confirm = false;
        // blockContinueButton();
    }
    //

    if (confirm) {
        regPhoneCodeResendButton.classList.add('disabled');
        regPhoneCodeInput.classList.remove('error');
        regPhoneCodeInputError.classList.add('disabled');
        regButtonContinue.classList.add('button-blocked');
        stopCounters();
        sendRestoreLink();
        activateDefault();
        // открываем попап 
        popupRestoreSuccess.classList.remove('disabled');
        buttonRestoreSuccessToMain.onclick = () => {
            popupRestoreSuccess.classList.add('disabled');
            restoreSection.classList.add('disabled');
        }
        overlayBlock.onclick = () => {
            console.log('клик по фону');
            overlayBlock.classList.remove('overlay--active');
            overlayBlock.onclick = "";
            popupRestoreSuccess.classList.add('disabled');
        }
    } else {
        regPhoneCodeInput.classList.add('error');
        regPhoneCodeInputError.classList.remove('disabled');
        regButtonContinue.classList.add('button-blocked');
        if (regPhoneCodeInput.classList.contains('code-await')) {
        } else {
            regPhoneCodeResendTimer.classList.remove('disabled');
            startCounters();
        }
    }
};


let checkConfirmCodeInput = () => {
    let inputData = regPhoneCodeInput.value;
    let inputDataArr = inputData.split(/[- : ' ' { } + ( ) _ ]/);
    let clearinputDataArr = inputDataArr.join("").split('');

    regPhoneCodeInputError.classList.add('disabled');
    if (clearinputDataArr.length == 4) {
        regButtonContinue.classList.remove('button-blocked');
        regPhoneCodeInput.classList.remove('error')

    } else {
        regPhoneCodeInput.classList.add('error')
    }
};

regPhoneCodeInput.addEventListener('input', function () {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, "");
    };
    checkConfirmCodeInput();
});

let activatePhoneConfirmation = () => {
    regButtonGoToStart.classList.remove('disabled');
    phoneInput.setAttribute('readonly', true);
    phoneInput.classList.add('input-blocked');
    buttonChooseCountry.classList.add('button-blocked');
    phoneInputLabel.classList.add('input-blocked');
    phoneConfirmation.classList.remove('disabled');
    regButtonContinue.classList.add('button-blocked');

    regButtonContinue.textContent = 'Подтвердить';
};

let sendPhoneConfirmationCode = () => {
};
// таймер 
let timerText = document.querySelector('.restore-account__code-resend-timer-data');
let timerId = null;
let timeRemaining = TIMER_DATA;
let updateClock = () => {
    timeRemaining--
    if (timeRemaining <= 86400) {
    }
    if (timeRemaining <= 0) {
        regPhoneCodeResendTimer.classList.add('disabled');
        regPhoneCodeResendButton.classList.remove('disabled');
        regPhoneCodeInput.classList.remove('error');
        clearInterval(timerId);
        timeRemaining = TIMER_DATA;
    }
    let minutes = timeRemaining > 0 ? Math.floor(timeRemaining / 60) % 60 : 0;
    let seconds = timeRemaining > 0 ? Math.floor(timeRemaining) % 60 : 0;
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    timerText.textContent = `${minutes}:${seconds}`;
};

let startCounters = () => {
    timerId = setInterval(updateClock, 1000);
    regPhoneCodeInput.classList.add('code-await');
};

let stopCounters = () => {
    clearInterval(timerId);
    timeRemaining = TIMER_DATA;
};

// отправка ссылки на восстановление
let sendRestoreLink = () => {
    regPhoneCodeInput.classList.remove('code-await');
    phoneConfirmation.classList.add('disabled');
    phoneInputWrapper.classList.add('disabled');
};

//
let activateDefault = () => {
    phoneInput.removeAttribute('readonly', true);
    phoneInput.classList.remove('input-blocked');
    phoneInputLabel.classList.remove('error');
    buttonChooseCountry.classList.remove('button-blocked');
    phoneInputLabel.classList.remove('input-blocked');
    phoneConfirmation.classList.add('disabled');
    phoneConfirmation.classList.remove('ready-to-check');
    regPhoneCodeInput.classList.remove('error');
    regPhoneCodeInputError.classList.add('disabled');
    regPhoneCodeInput.classList.remove('code-await');
    regPhoneCodeResendButton.classList.add('disabled');
    regPhoneCodeResendTimer.classList.add('disabled');
    regButtonContinue.classList.remove('button-blocked');
    phoneInputWrapper.classList.remove('disabled');
    mask.value = '';
    stopCounters();
    regButtonContinue.textContent = 'Далее';
};

let resetInputs = () => {
    mask.value = '';
    regPhoneCodeInput.value = "";
}

regButtonContinue.addEventListener('click', function () {
    checkPhoneInput();

    if (!(phoneInputLabel.classList.contains('error'))) {
        activatePhoneConfirmation();
        sendPhoneConfirmationCode();
    } else {
    };

    if (!phoneConfirmation.classList.contains('disabled')) {

        if (phoneConfirmation.classList.contains('ready-to-check')) {
            checkConfirmCode();
        } else {
        }
        if (!phoneConfirmation.classList.contains('ready-to-check')) {
            phoneConfirmation.classList.add('ready-to-check');
        }
    }
});

regPhoneCodeResendButton.addEventListener('click', function () {
    regPhoneCodeResendTimer.classList.remove('disabled');
    startCounters();
    regPhoneCodeInput.value = '';
    regPhoneCodeResendButton.classList.add('disabled');
    regPhoneCodeInputError.classList.add('disabled');
    sendPhoneConfirmationCode();
})
// кнопка назад
regButtonGoToStart.addEventListener('click', function (evt) {
    evt.preventDefault();
    activateDefault();
});

// выбор номера телефона
let setCountryData = (label) => {
    let parent = label.closest('.phone-registration__country-selector-wrapper');
    let phoneInput = document.querySelector('.restore-account__type-item-input--phone');
    let buttonChooseCountry = restoreSection.querySelector('.country-selector__button');
    let parentlist = parent.querySelector('.country-selector__country-list');
    let countryName = label.getAttribute('country-data');
    let countryMaskData = label.getAttribute('mask-data');
    let countryPlaceholderData = label.getAttribute('placeholder-data');
    let codeData = label.querySelector('.country-selector__data');
    phoneInput.value = '';
    buttonChooseCountry.className = '';
    buttonChooseCountry.classList.add('country-selector__button');
    buttonChooseCountry.classList.add(String(`country-selector__button--${countryName}`));
    phoneInput.setAttribute('placeholder', countryPlaceholderData);
    mask.value = '';
    mask.typedValue = codeData.textContent;
    mask.updateOptions({ mask: countryMaskData });
    parentlist.classList.remove('active');
    overlayBlock.classList.remove('overlay--active');
    buttonChooseCountry.classList.remove('active');
    phoneInputLabel.classList.remove('error');
};

const openCloseMenu = () => {
    overlayBlock.classList.add('overlay--active');
    let buttonChooseCountry = restoreSection.querySelector('.country-selector__button');
    let countryList = restoreSection.querySelector('.country-selector__country-list');
    countryList.classList.toggle('active');
    buttonChooseCountry.classList.add('active')
    let countryItemArr = restoreSection.querySelectorAll('.country-selector__item');

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

//
regButtonAuthorizationArr.forEach(button => {
    button.addEventListener('click', function () {
        authSection.classList.remove('disabled');
        regSection.classList.add('disabled');
        authHeader.classList.add('disabled');
        authFooterRegRestore.classList.add('disabled');
        authFooterMain.classList.remove('reg-restore-active');
        authMain.classList.remove('reg-restore-active');
        activateDefault();
        resetInputs();
    });
});

phoneInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        regButtonContinue.click();
    }
})

regPhoneCodeInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        regButtonContinue.click();
    }
})
// восстановление пароля
buttonRestoreAccount.addEventListener('click', function () {
    regExistSection.classList.add('disabled');
    restoreSection.classList.remove('disabled');
});
