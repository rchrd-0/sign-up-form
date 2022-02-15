const form = document.querySelector('form');

const firstName = document.getElementById('first-name');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const passwordRequirement = document.querySelectorAll('.password-requirement')

function showMessage(input) {
    const validationErrors = {
        'first-name': 'Name is required, only letters please!',
        'last-name': 'Last name is required, only letters please!',
        'email': 'A valid email address is required',
        'phone-number': 'An 8 digit phone number is required',
    }
    const validationMessage = input.nextElementSibling;
    const messageText = validationErrors[input.id];
    const valid = input.validity.valid;

    if (input === confirmPassword) return;
    if (input === password) {
        constrainPassword(valid);
        return;
    }

    
    validationMessage.textContent = (valid) ? '' : messageText;
}

function constrainPassword (valid) {
    const length = password.validity.tooShort;
    const containsUppercase = password.value.match(/[A-Z]/);
    const containsNumber = password.value.match(/[0-9]/);

    const lengthRequirement = document.querySelector('#pwd-length');
    const uppercaseRequirement = document.querySelector('#pwd-uppercase');
    const numRequirement = document.querySelector('#pwd-num');

    if (!valid) {
        passwordRequirement.forEach(msg => msg.classList.remove('hidden'));
        if (!password.value) {
            passwordRequirement.forEach(msg => msg.classList.remove('valid-text'))
        }
    }

    if (password.value && [...passwordRequirement].some(msg => !msg.classList.contains('hidden'))) {
        if (!containsUppercase) {
            uppercaseRequirement.classList.remove('valid-text');
        } else {
            uppercaseRequirement.classList.add('valid-text');
        }

        if (!containsNumber) {
            numRequirement.classList.remove('valid-text');
        } else {
            numRequirement.classList.add('valid-text');
        }

        if (length) {
            lengthRequirement.classList.remove('valid-text');
        } else {
            lengthRequirement.classList.add('valid-text');
        }
    }
}

function checkPasswordMatch() {
    if (password.validity.valid) {
        if (confirmPassword.value === password.value) {
            toggleValidity(confirmPassword, true);
            confirmPassword.nextElementSibling.textContent = '';
        } else {
            toggleValidity(confirmPassword, false);
            confirmPassword.nextElementSibling.textContent = 'Passwords must match';
        }
    }
}

form.addEventListener('focusout', event => {
    const input = event.target;
    const validity = input.validity.valid;

    if (input === confirmPassword) {
        checkPasswordMatch();
    } else {
        toggleValidity(input, validity);
        showMessage(input);
    }

})

form.addEventListener('input', event => {
    const input = event.target;
    const validity = input.validity.valid;
    const classValid = !input.className;

    if (!classValid) {
        if (input === confirmPassword) {
            checkPasswordMatch();
        } else {
            toggleValidity(input, validity);
            showMessage(input);
        }
    } 
});

const toggleValidity = (input, bool) => input.className = (bool) ? 'valid' : 'invalid';

