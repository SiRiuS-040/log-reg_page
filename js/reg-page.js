import { emailTest, passwordTest, nameTest, TIMER_DATA } from './options.js';

// действия с меню

const authSection = document.querySelector('.authorization-page');
const regSection = document.querySelector('.registration-restore-page');
const regSectionWrapper = document.querySelector('.registration-page');
const authMain = document.querySelector('.main');
const authHeader = document.querySelector('.authorization-header');
const authFooterRegRestore = document.querySelector('.authorization-footer--reg-restore');
const authFooterMain = document.querySelector('.authorization-footer');
const regButtonAuthorizationArr = document.querySelectorAll('.registration-page__button-go-to-auth');
const regButtonAuthorizationMobile = document.querySelector('.registration-page__button-go-to-auth--mobile');

const overlayBlock = document.querySelector('.overlay');
const nameInput = document.querySelector('.registration__name-item-input--name');
const surnameInput = document.querySelector('.registration__name-item-input--surname');
const phoneInput = document.querySelector('.registration__type-item-input--phone');
const phoneInputMaskArr = document.querySelectorAll('.registration__input-phone-mask');
const phoneInputWrapper = document.querySelector('.phone-registration-wrapper');
const phoneInputLabel = document.querySelector('.registration__type-label--phone');
const nameRegistration = document.querySelector('.name-registration-wrapper');
const phoneConfirmation = document.querySelector('.phone-confirmation');
const passwordRegistration = document.querySelector('.password-registration');
const regButtonContinue = document.querySelector('.registration__button--continue');
const regButtonGoToStart = document.querySelector('.registration-page__navigation-link-go-back');
const regNameInputTypeArr = document.querySelectorAll('.registration__name-item-input');
const regPhoneCodeInput = document.querySelector('.registration__code-input--password');
const regPhoneCodeInputError = document.querySelector('.registration__confirm-code-alert--wrong-code');
const regPhoneCodeResendTimer = document.querySelector('.registration__confirm-code-alert--resend-timer');
const regPhoneCodeResendButton = document.querySelector('.registration__button-resend-code');
const emailInput = document.querySelector('.registration__type-item-input--email');
const regPasswordInputArr = document.querySelectorAll('.registration__password-input');
const regPasswordInputMain = document.querySelector('.registration__password-input--password-main');
const regPasswordInputRepeat = document.querySelector('.registration__password-input--password-repeat');
const regPasswordButtonShowPWArr = document.querySelectorAll('.registration__input-button--show-pw');
let countryList = regSection.querySelector('.country-selector__country-list');
const buttonChooseCountry = regSection.querySelector('.country-selector__button');
const buttonRegSuccessToMain = document.querySelector('.registration__button--popup-reg');
const popupRegSuccess = document.querySelector('.reg-success-banner');
const buttonClearInputArr = document.querySelectorAll('.registration__input-button--clear-input');
const regInputArr = document.querySelectorAll('.registration__input');
const regPasswordPrompt = document.querySelector('.registration__password-prompt');
const regTerms = document.querySelector('.registration__terms');

// аккаунт существует
const regExistSection = document.querySelector('.registration-exist-page');
const regExistAccountName = document.querySelector('.registration-exist__account-name');
const regExistPasswordButtonShowPWArr = document.querySelectorAll('.registration-exist__input-button--show-pw');
const regExistPWInput = document.querySelector('.registration-exist__password-input--password');
const regExistLogin = document.querySelector('.registration-exist__button--enter');
const regExistPWAlertWrongLogin = document.querySelector('.registration-exist__alert--wrong-pass');

const regExistPWAlertIncorrectPW = document.querySelector('.registration-exist__alert--incorrect-pass');
const regExistGoBack = document.querySelector('.registration-exist-page__navigation-link-go-back');

// восстановление пароля
const buttonRestoreAccount = document.querySelector('.registration-exist__link-password-restore');
const restoreSection = document.querySelector('.restore-page');
const buttonAuthSuccessToMain = document.querySelector('.registration__button--popup-auth');
const popupAuthSuccess = document.querySelector('.auth-success-banner');

// проверки правописания

// запуск маски номера телефона
let maskOptions = { mask: '+{7} 000 000-00-00', lazy: false };
let maskTemplateArr = [];

phoneInputMaskArr.forEach(phoneInputTemplate => {
    let maskTemplate = IMask(phoneInputTemplate, maskOptions);
    maskTemplateArr.push(maskTemplate);
});

let checkNameInput = (inputType) => {
    if (!(nameTest.test(inputType.value))) {
        inputType.classList.add('error');
    } else {
        inputType.classList.remove('error');
    }
};

let checkPhoneInput = () => {
    let maskdata = maskTemplateArr[0].mask;
    let maskdataArr = maskdata.split(/[- : ' ' { } + ( ) _ ]/);
    maskdataArr.splice(0, 1);
    let clearMaskArr = maskdataArr.join("").split('');
    let inputData = maskTemplateArr[0].value;
    let inputDataArr = inputData.split(/[- : ' ' { } + ( ) _ ]/);
    inputDataArr.splice(0, 1);
    let clearinputDataArr = inputDataArr.join("").split('');

    if (clearinputDataArr.length != clearMaskArr.length) {
        phoneInputLabel.classList.add('error');
    } else {
        phoneInputLabel.classList.remove('error');
    }
};

surnameInput.addEventListener('input', function () {
    checkNameInput(surnameInput);
});

nameInput.addEventListener('input', function () {
    checkNameInput(nameInput);
});

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
    }
    //
    if (confirm) {
        regPhoneCodeResendButton.classList.add('disabled');
        regPhoneCodeInput.classList.remove('error');
        regPhoneCodeInputError.classList.add('disabled');
        regButtonContinue.classList.add('button-blocked');

        regPhoneCodeResendButton.classList.add('disabled');
        regPhoneCodeResendTimer.classList.add('disabled');
        stopCounters();
        activatePWInput();

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
    regNameInputTypeArr.forEach(type => {
        let parent = type.closest('.name-input');
        let clearButton = parent.querySelector('.registration__input-button--clear-input');
        clearButton.classList.add('input-blocked');
        type.setAttribute('readonly', true);
        type.classList.add('input-blocked');
    });
    phoneInput.setAttribute('readonly', true);
    phoneInput.classList.add('input-blocked');
    buttonChooseCountry.classList.add('button-blocked');
    phoneInputLabel.classList.add('input-blocked');
    phoneConfirmation.classList.remove('disabled');
    regButtonContinue.classList.add('button-blocked');
};

let sendPhoneConfirmationCode = () => {
};

// таймер 
let timerText = document.querySelector('.registration__code-resend-timer-data');
let timerId = null;
let timeRemaining = TIMER_DATA;

let updateClock = () => {
    timeRemaining--
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


let blockContinueButton = () => {
    regButtonContinue.classList.add('button-blocked');
};

// подготовка к вводу пароля
let activatePWInput = () => {
    passwordRegistration.classList.remove('disabled');
    regPhoneCodeInput.classList.remove('code-await');
    nameRegistration.classList.add('disabled');
    phoneConfirmation.classList.add('disabled');
    phoneInputWrapper.classList.add('disabled');
    passwordRegistration.classList.add('ready-to-check');
};

// проверка почты

let checkEmailInput = () => {
    emailInput.classList.add('error');
    emailInput.classList.remove('email-checked');
    regButtonContinue.classList.add('button-blocked');

    if (emailInput.value.length > 0) {
        if (!(emailTest.test(emailInput.value))) {
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('email-checked');
        }
    } else {
        emailInput.classList.add('error');
    }

    if (emailInput.classList.contains('email-checked') && regPasswordInputRepeat.classList.contains('passwords-similar') && regPasswordInputMain.classList.contains('passwords-similar')) {
        regButtonContinue.classList.remove('button-blocked');
    }
};

emailInput.addEventListener('input', function () {
    checkEmailInput();
});

// проверка пароля

let checkPWInput = (input) => {
    input.classList.remove('error');
    regButtonContinue.classList.add('button-blocked');
    passwordRegistration.classList.remove('ready-to-check');

    if (passwordTest.test(input.value) == true) {
        input.classList.remove('error');

        if (regPasswordInputRepeat.value == regPasswordInputMain.value) {
            regPasswordInputArr.forEach(pwInput => {
                pwInput.classList.add('passwords-similar');
            });

            regPasswordPrompt.classList.add('disabled');
            passwordRegistration.classList.add('ready-to-check');
            // regButtonContinue.classList.remove('button-blocked');
            regTerms.classList.remove('disabled');

            checkEmailInput();
        }

        if (emailInput.classList.contains('email-checked') && regPasswordInputRepeat.classList.contains('passwords-similar') && regPasswordInputMain.classList.contains('passwords-similar')) {
            regButtonContinue.classList.remove('button-blocked');
        }
    } else {
        input.classList.add('error');
    }
};

regPasswordButtonShowPWArr.forEach(button => {
    button.addEventListener('click', function (evt) {
        let parent = button.closest('.reg-password');
        let targetInput = parent.querySelector('.registration__password-input');
        button.classList.toggle('password-visible');
        if (button.classList.contains('password-visible')) {
            targetInput.setAttribute('type', 'text');
        } else {
            targetInput.setAttribute('type', 'password');
        }
    });
});

//
let activateDefault = () => {
    regButtonGoToStart.classList.add('disabled');
    regNameInputTypeArr.forEach(type => {
        type.removeAttribute('readonly', true);
        type.classList.remove('input-blocked');
        type.classList.remove('error');
    });
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
    nameRegistration.classList.remove('disabled');
    phoneInputWrapper.classList.remove('disabled');
    passwordRegistration.classList.add('disabled');
    stopCounters();
    regPasswordInputArr.forEach(pwInput => {
        pwInput.classList.remove('passwords-similar');
        pwInput.classList.remove('error');
    });

    regPhoneCodeInput.value = "";
    passwordRegistration.classList.remove('ready-to-check');
    buttonClearInputArr.forEach(clearButton => {
        clearButton.classList.remove('input-blocked');
        clearButton.classList.add('input-empty');
    });
    regButtonContinue.textContent = 'Продолжить';
    regButtonAuthorizationMobile.classList.remove('disabled');
    regPasswordPrompt.classList.remove('disabled');
    regTerms.classList.add('disabled');
};

let resetInputs = () => {
    regNameInputTypeArr.forEach(type => {
        type.value = '';
    });
    maskTemplateArr.forEach(maskTemplate => {
        maskTemplate.value = '';
    });
    regPhoneCodeInput.value = "";
    emailInput.value = '';
    regPasswordInputArr.forEach(pwInput => {
        pwInput.value = '';
    });
};

let collectRegistrtationData = () => {
    let newUser = [];
    let inputData = maskTemplateArr[0].value;
    let inputDataArr = inputData.split(/[- : ' ' { } + ( ) _ ]/);
    inputDataArr.splice(0, 1);
    let cleariPhoneData = inputDataArr.join("");
    newUser.name = nameInput.value;
    newUser.surname = surnameInput.value;
    newUser.phone = cleariPhoneData;
    newUser.email = emailInput.value;
    newUser.password = regPasswordInputMain.value;
};

let openRegExist = () => {
    phoneInputMaskArr[1].value = phoneInputMaskArr[0].value;
    regExistAccountName.textContent = 'Дмитрий';
    regSectionWrapper.classList.add('disabled');
    regExistSection.classList.remove('disabled');
};

regNameInputTypeArr.forEach(input => {
    input.addEventListener('keydown', function (evt) {
        if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
            regButtonContinue.click();
        }
    })
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

emailInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        regButtonContinue.click();
    }
})

regPasswordInputArr.forEach(pwInput => {
    pwInput.addEventListener('keydown', function (evt) {
        if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
            regButtonContinue.click();
        }
    })
});

regButtonContinue.addEventListener('click', function () {
    checkNameInput(nameInput);
    checkNameInput(surnameInput);
    checkPhoneInput();
    if (!(nameInput.classList.contains('error')) && !(surnameInput.classList.contains('error')) && !(phoneInputLabel.classList.contains('error'))) {
        if (maskTemplateArr[0].unmaskedValue == 72222222222) {
            openRegExist();
        } else {
            activatePhoneConfirmation();
            sendPhoneConfirmationCode();
        }
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

    // посдедний этап

    if (passwordRegistration.classList.contains('ready-to-check')) {
        regButtonContinue.textContent = 'Зарегистрироваться';
        regButtonAuthorizationMobile.classList.add('disabled');

        emailInput.addEventListener('input', function () {
            checkEmailInput();
        });

        regPasswordInputArr.forEach(pwInput => {
            pwInput.addEventListener('input', function () {

                regPasswordInputArr.forEach(pwInput => {
                    pwInput.classList.remove('passwords-similar')
                    // pwInput.classList.remove('error')
                });
                // checkEmailInput();
                checkPWInput(pwInput);
            });
        });




        if (emailInput.classList.contains('email-checked') && regPasswordInputRepeat.classList.contains('passwords-similar') && regPasswordInputMain.classList.contains('passwords-similar')) {
            collectRegistrtationData();
            regButtonContinue.classList.remove('button-blocked');
            popupRegSuccess.classList.remove('disabled');
            overlayBlock.classList.add('overlay--active');
            buttonRegSuccessToMain.onclick = () => {
                popupRegSuccess.classList.add('disabled');
                activateDefault();
                resetInputs();
            }
            overlayBlock.onclick = () => {
                overlayBlock.classList.remove('overlay--active');
                overlayBlock.onclick = "";
                popupRegSuccess.classList.add('disabled');
                activateDefault();
                resetInputs();
            }
        } else {

        };
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
    let phoneInput = document.querySelector('.registration__type-item-input--phone');
    let buttonChooseCountry = regSection.querySelector('.country-selector__button');
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
    // mask.value = '';

    maskTemplateArr.forEach(maskTemplate => {
        maskTemplate.value = '';
    });

    maskTemplateArr.forEach(maskTemplate => {
        maskTemplate.typedValue = codeData.textContent;
    });

    maskTemplateArr.forEach(maskTemplate => {
        maskTemplate.updateOptions({ mask: countryMaskData });
    });

    parentlist.classList.remove('active');
    overlayBlock.classList.remove('overlay--active');
    buttonChooseCountry.classList.remove('active');
    phoneInputLabel.classList.remove('error');
};

const openCloseMenu = () => {
    overlayBlock.classList.add('overlay--active');
    let buttonChooseCountry = regSection.querySelector('.country-selector__button');
    let countryList = regSection.querySelector('.country-selector__country-list');
    countryList.classList.toggle('active');
    buttonChooseCountry.classList.add('active')
    let countryItemArr = regSection.querySelectorAll('.country-selector__item');

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
        regSectionWrapper.classList.add('disabled');
        authHeader.classList.add('disabled');
        authFooterRegRestore.classList.add('disabled');
        authFooterMain.classList.remove('reg-restore-active');
        authMain.classList.remove('reg-restore-active');
        activateDefault();
        resetInputs();
    });
});
buttonClearInputArr.forEach(button => {
    button.addEventListener('click', function () {
        let parent = button.closest('.registration__label');
        let input = parent.querySelector('.registration__input');
        input.value = '';
        input.classList.remove('error');
        button.classList.add('input-empty');

        if (parent.classList.contains('name-input')) {
            checkNameInput(input);
        }

        if (parent.classList.contains('email-input')) {
            checkEmailInput();
        }
    });
});
regInputArr.forEach(input => {
    input.addEventListener('input', function () {
        let parent = input.closest('.registration__label');
        let buttonClearInput = parent.querySelector('.registration__input-button--clear-input')
        if (input.value != '') {
            buttonClearInput.classList.remove('input-empty');
        } else {
            buttonClearInput.classList.add('input-empty');
        }
    });
});


// аккаунт существует
regExistPasswordButtonShowPWArr.forEach(button => {
    button.addEventListener('click', function (evt) {
        let parent = button.closest('.reg-exist-password');
        let targetInput = parent.querySelector('.registration-exist__password-input');
        button.classList.toggle('password-visible');
        if (button.classList.contains('password-visible')) {
            targetInput.setAttribute('type', 'text');
        } else {
            targetInput.setAttribute('type', 'password');
        }
    });
});

let checkLoginPWInput = () => {
    regExistPWAlertWrongLogin.classList.add('disabled');
    regExistPWAlertIncorrectPW.classList.add('disabled');
    if (regExistPWInput.value.length < 8) {
        regExistPWInput.classList.add('error');

    } else {
        regExistPWInput.classList.remove('error');
    }
};

let resetRegExistInputs = () => {
    regExistAccountName.textContent = '';
    phoneInputMaskArr[1].value = '';
    regExistPWInput.value = '';
    regExistSection.classList.add('disabled');
    regSectionWrapper.classList.remove('disabled');
    activateDefault();
    resetInputs();
};

regExistPWInput.addEventListener('input', function () {
    checkLoginPWInput();
});

regExistPWInput.addEventListener('keydown', function (evt) {
    if (evt.code == 'Enter' || evt.code == 'NumpadEnter') {
        regExistLogin.click();
    }
})

regExistLogin.addEventListener('click', function () {
    checkLoginPWInput();
    if (regExistPWInput.classList.contains('error')) {

        regExistPWAlertIncorrectPW.classList.remove('disabled');
    } else {
        if (regExistPWInput.value == '11111111') {
            resetRegExistInputs();
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
            regExistPWInput.classList.remove('error');
            regExistPWAlertWrongLogin.classList.remove('disabled');
        }
    }
});


regExistGoBack.addEventListener('click', function () {
    resetRegExistInputs();
})

// восстановление пароля
buttonRestoreAccount.addEventListener('click', function () {
    regExistSection.classList.add('disabled');
    restoreSection.classList.remove('disabled');
});
