import JustValidate from 'just-validate';
// import IMask from 'imask';
// import { Fancybox } from "@fancyapps/ui";
// import { modal } from "./components/modal.js";

export default function validation() {
    // const maskPhones = document.querySelectorAll('.js-mask-phone');

    // maskPhones.forEach(phone => {
    // 	IMask(phone, {
    // 		mask: '+{7} (000) 000-00-00',
    // 		lazy: false,
    // 	});
    // });

    const options = {
        errorFieldCssClass: 'is-error',
        errorLabelStyle: false,
        errorLabelCssClass: 'is-label-error',
    }

    const defaultFieldOptions = [
        {
            rule: 'required',
            errorMessage: 'Заполните поле',
        }
    ];

    const emailFieldOptions = [
        {
            rule: 'required',
            errorMessage: 'Заполните поле',
        },
        {
            rule: 'email',
            errorMessage: 'Недопустимый формат',
        },
    ]

    const phoneFieldOptions = [
        {
            rule: 'required',
            errorMessage: 'Заполните поле',
        },
        {
            rule: 'minLength',
            value: 18,
            errorMessage: 'Недопустимый формат',
        },
    ];

    // Валидация форм
    const forms = document.querySelectorAll('[data-js-form]');

    forms.forEach(form => {
        const validate = new JustValidate(form, options);
        const formFields = form.querySelectorAll('[data-js-form-field]');

        if (formFields.length) {
            for (let index = 0; index < formFields.length; index += 1) {
                const field = formFields[index];
                const fieldName = field.getAttribute('name');
                let fieldOptions = defaultFieldOptions;

                if (fieldName === "email") {
                    fieldOptions = emailFieldOptions;
                }

                // if (fieldName === "phone") {
                // 	fieldOptions = phoneFieldOptions;
                // }

                validate.addField(`[name="${fieldName}"]`, fieldOptions);
            }
        }

        // validate.onFail((fields) => {
        // 	isErrorFieldBox(fields);
        // });

        validate.onSuccess((event) => {

            document.documentElement.closeModal('[data-modal].is-active');
            BX.ajax.runComponentAction('dev:form','add',{
                mode: 'class',
                data: new FormData(form),
            }).then(function(response) {
                if(response.status === 'success' && response.data){

                }
            });
        });
    });

    // Валидация формы подписки
    const formSubscribe = document.querySelector('.js-subscribe-form');

    if (formSubscribe) {
        const formSubscribeEmail = document.querySelector('.js-subscribe-form-email');
        const formSubscribeSuccess = document.querySelector('.js-subscribe-success');
        const formSubscribeBack = document.querySelector('.js-subscribe-back');
        const formSubscribeValidate = new JustValidate(formSubscribe, options);

        if (formSubscribeEmail) {
            formSubscribeValidate.addField(`[name="${formSubscribeEmail.getAttribute('name')}"]`, emailFieldOptions);
        }

        formSubscribeValidate.onSuccess(() => {
            if (formSubscribeSuccess) {
                formSubscribeSuccess.classList.add('is-visible');

                setTimeout(() => {
                    formSubscribeSuccess.classList.add('is-active');
                }, 300);
            }

            formSubscribe.classList.remove('is-active');
        });

        if (formSubscribeBack) {
            formSubscribeBack.addEventListener('click', () => {
                if (formSubscribeSuccess) {
                    formSubscribeSuccess.classList.remove('is-active', 'is-visible');
                }

                formSubscribe.classList.add('is-active');

                if (formSubscribeEmail) {
                    formSubscribeEmail.focus();
                }
            });
        }
    }
}
