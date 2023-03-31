import Swiper from 'swiper/bundle';
import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', () => {
    // slider reviews-slider
    const swiper = new Swiper('#reviews-slider', {
        enabled: true, ///когда отключен слайдер
        slidesPerView: 'auto',
        spaceBetween: 10,
        autoHeight: true,

        breakpoints: {
            768: {
                slidesPerView: 1, //когда отключен слайдер
                autoHeight: false,
            },
            1200: {
                enabled: false, //свайпер отключен, так как нет еще отзывовов (как появятся - удалить строку)
                slidesPerView: 2, //когда отключен слайдер
            },
        },

        navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
        },
    });

    // popup open
    let openButtons = document.querySelectorAll('.js-popup-open');
    let closeButtons = document.querySelectorAll('.js-popup-close');
    let popup = document.querySelector('.js-popup');
    let popupWrap = document.querySelector('.js-popup-wrap');
    let page = document.querySelector('html');

    openButtons.forEach((button) => {
        button.addEventListener('click', function () {
            popup.style.display = 'flex';
            page.style.overflow = 'hidden';

            for (let tel of inputTel) {
                tel.value = '';
            }
        });
    });

    popupWrap.addEventListener('click', (e) => {
        e._unclick = true;
    });

    popup.addEventListener('click', (e) => {
        if (e._unclick) return;

        popup.style.display = 'none';
        page.style.overflow = 'unset';
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', function () {
            popup.style.display = 'none';
            page.style.overflow = 'unset';
        });
    });

    // validate form
    const generateError = function (text) {
        let error = document.createElement('span');
        error.classList.add('field-error');
        error.innerHTML = text;

        return error;
    };

    let inputTel = document.querySelectorAll('input[type="tel"]');
    let masc = new Inputmask('+7 (999) 999-99-99', {
        onincomplete: function () {
            let error = generateError('Номер телефона введен не полностью');
            this.parentElement.insertBefore(error, this);
            this.classList.add('is-invalid');

            forMusc(this);
        },
        oncomplete: function () {
            this.parentElement.querySelector('.field-error').remove();
            this.classList.remove('is-invalid');
        },
    });
    inputTel.forEach((tel) => {
        masc.mask(tel);
    });

    function forMusc(el) {
        let allTarget = el.parentElement.querySelectorAll('.field-error');

        if (allTarget.length > 1) {
            el.parentElement.querySelector('.field-error').remove();
            el.classList.remove('is-invalid');
        }
    }
    let forms = document.querySelectorAll('.js-form');

    forms.forEach((form) => {
        let inputName = form.querySelector('input[data-validate-field="name"]');
        let inputFamily = form.querySelector(
            'input[data-validate-field="family"]'
        );
        let inputCompany = form.querySelector(
            'input[data-validate-field="company"]'
        );
        let inputJob = form.querySelector('input[data-validate-field="job"]');
        let inputEmail = form.querySelector(
            'input[data-validate-field="email"]'
        );
        // let inputTel = form.querySelector('input[data-validate-field="tel"]');
        let fields = form.querySelectorAll('.field');
        let arry3Length = [inputName, inputFamily, inputCompany, inputJob];
        const EMAIL_REGEXP =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        for (let input of arry3Length) {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/^\s+|[0-9]/g, '');
            });
        }

        inputEmail.addEventListener('input', () => {
            inputEmail.value = inputEmail.value.replace(/[А-Яа-яЁё]/g, '');
            onInput();
        });

        function onInput() {
            if (isEmailValid(inputEmail.value)) {
                removeValidation();
            } else {
                removeValidation();
                let error = generateError('Не корректный Email');
                inputEmail.parentElement.insertBefore(error, inputEmail);
                inputEmail.classList.add('is-invalid');
            }
        }

        function isEmailValid(value) {
            return EMAIL_REGEXP.test(value);
        }

        // let checkLength = function () {
        //     for (let input of arry3Length) {
        //         input.addEventListener('input', (e) => {
        //             if (e.target.value.length < 3) {
        //                 removeValidation();
        //                 let error = generateError('Минимум 3 буквы');
        //                 input.parentElement.insertBefore(error, input);
        //                 input.classList.add('is-invalid');
        //             } else {
        //                 removeValidation();
        //             }
        //         });
        //     }
        // };

        let removeValidation = function () {
            let errors = form.querySelectorAll('.field-error');
            let errorsBorder = form.querySelectorAll('.is-invalid');

            for (let i = 0; i < errors.length; i++) {
                errors[i].remove();
            }

            for (let i = 0; i < errorsBorder.length; i++) {
                errorsBorder[i].classList.remove('is-invalid');
            }
        };

        let checkFieldsPresons = function () {
            if (
                inputEmail.value !== '' &&
                isEmailValid(inputEmail.value) === false
            ) {
                let error = generateError('Не корректный Email');
                inputEmail.parentElement.insertBefore(error, inputEmail);
                inputEmail.classList.add('is-invalid');
            }

            for (let field of fields) {
                if (!field.value) {
                    let error = generateError('Необходимо заполнить поле');
                    field.parentElement.insertBefore(error, field);
                    field.classList.add('is-invalid');
                }
            }

            inputTel.forEach((tel) => {
                if (tel.value.includes('_')) {
                    let error = generateError(
                        'Номер телефона введен не полностью'
                    );
                    tel.parentElement.insertBefore(error, tel);
                    tel.classList.add('is-invalid');

                    // forMusc(tel);
                }
            });
        };

        function thanksPopup(open) {
            if (form.parentElement.querySelector('.start-right-thanks')) {
                form.style.opacity = open ? '0' : '1';
                form.parentElement.querySelector(
                    '.start-right-thanks'
                ).style.display = open ? 'flex' : 'none';
            }

            if (
                form.parentElement.parentElement.querySelector(
                    '.popup-wrap-thanks'
                )
            ) {
                form.parentElement.style.display = open ? 'none' : 'block';
                popupWrap.classList.add('position-bottom');
                form.parentElement.parentElement.querySelector(
                    '.popup-wrap-thanks'
                ).style.display = open ? 'block' : 'none';
            }
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            removeValidation();
            checkFieldsPresons();
            // checkLength();

            let errors = form.querySelectorAll('.field-error');
            if (errors.length === 0) {
                let URL = 'https://test.creativesoldiers.ru/sailpay/send.php';
                let preloader =
                    form.parentElement.querySelector('.post-preloader');

                let formData = new FormData(form);

                let xhr = new XMLHttpRequest();
                preloader.style.display = 'block';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);

                            if (response.status === 'ok') {
                                preloader.style.display = 'none';
                                console.log('Отправлено');
                                thanksPopup(true);
                                setTimeout(function () {
                                    thanksPopup(false);
                                    popupWrap.classList.remove(
                                        'position-bottom'
                                    );
                                }, 10000);
                            } else {
                                alert('Заявка не отправлена');
                            }
                        }
                    }
                };

                xhr.open('POST', URL, true);
                xhr.send(formData);
                form.reset();
            }
        });
    });

    // определение Сафари и добавление CSS свойства на БГ
    let userBrowser = navigator.userAgent.toLowerCase();
    let browserSafari = /safari/.test(userBrowser);

    if (browserSafari && userBrowser.includes('version')) {
        let bgs = document.querySelectorAll('.js-bg');
        for (let bg of bgs) {
            bg.style.webkitBackdropFilter = 'blur()';
        }
    }
});
