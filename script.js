const form = document.querySelector('form');

const firstName = document.getElementById('first-name');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function showMessage(input) {
    const validationMessage = input.nextElementSibling;
    const validationMap = {
        'first-name': 'Name is required, only letters please!',
        'last-name': 'Last name is required, only letters please!',
        'email': 'A valid email address is required',
        'phone-number': 'An 8 digit phone number is required',
    }

    if (input.validity.valid) {
        validationMessage.textContent = '';
    } else {
        validationMessage.textContent = validationMap[input.id];
    }
}

function checkPasswordMatch() {
    if (password.validity.valid) {
        if (confirmPassword.value === password.value) {
            toggleValidity(confirmPassword, true)
        } else {
            toggleValidity(confirmPassword, false);
        }
        return
    }
}

form.addEventListener('focusout', event => {
    const input = event.target;
    const validity = input.validity.valid;

    if (input === confirmPassword) {
        checkPasswordMatch();
    }

    toggleValidity(input, validity);
    showMessage(input);
})

form.addEventListener('input', event => {
    const input = event.target;
    const validity = input.validity.valid;
    const classValid = !input.className;

    if (!classValid) {
        if (input === confirmPassword) {
            checkPasswordMatch();
        } 
        toggleValidity(input, validity);
        showMessage(input);
    } 
});

function toggleValidity(input, bool) {
    if (bool) {
        input.className = 'valid'
    } else {
        input.className = 'invalid'
    }
}

