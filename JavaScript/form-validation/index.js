const setConfirmPasswordError = msg => {
    const confirmPasswordErrorMsg = document.getElementById('pwd-confirm-err-msg');
    confirmPasswordErrorMsg.classList.add('active');
    confirmPasswordErrorMsg.textContent = msg;
}

const resetConfirmPasswordError = () => {
    const confirmPasswordErrorMsg = document.getElementById('pwd-confirm-err-msg');
    confirmPasswordErrorMsg.classList.remove('active');
    confirmPasswordErrorMsg.textContent = '';
}

const setPasswordError = msg => {
    const passwordErrorMsg = document.getElementById('pwd-err-msg');
    passwordErrorMsg.classList.add('active');
    passwordErrorMsg.textContent = msg;
}

const resetPasswordError = () => {
    const passwordErrorMsg = document.getElementById('pwd-err-msg');
    passwordErrorMsg.classList.remove('active');
    passwordErrorMsg.textContent = '';
}

const validatePassword = () => {
    const password = document.getElementsByName('password')[0];
    const confirmedPassword = document.getElementsByName('confirm-password')[0];

    if (!password.validity.valid || !confirmedPassword.validity.valid) {
        if (password.validity.tooShort) setConfirmPasswordError('Password must have atleast 8 characters');
        if (confirmedPassword.validity.tooShort) setPasswordError('Password must have atleast 8 characters');
        return false;
    }
    if (password.value !== confirmedPassword.value) {
        setConfirmPasswordError('Confirmation Password does not match');
        return false;
    }
    return true;
}

const validateCountry = () => {
    const countryValidator = /[0-9]+/;
    const country = document.getElementsByName('country')[0].value;
    const countryErrorMsg = document.getElementById('country-err-msg');
    if(country.match(countryValidator)) {
        countryErrorMsg.classList.add('active');
        countryErrorMsg.textContent = 'Please enter a valid country name';
        return false;
    } else {
        countryErrorMsg.textContent = '';
        countryErrorMsg.classList.remove('active');
    }
    return true;
}

const validateForm = e => {
    let dataIsValid = true;
    dataIsValid = validatePassword();
    dataIsValid = validateCountry() && dataIsValid;
    if (!dataIsValid) {
        document.getElementById('form-err').textContent = 'Please fill up all the fields correctly';
    } else {
        document.getElementById('form-err').textContent = 'Submitted. High Five!';
    }
    e.preventDefault();
}

document.getElementById('input-form').addEventListener('submit', validateForm);

document.getElementsByName('country')[0].addEventListener('change', validateCountry);

document.getElementsByName('password')[0].addEventListener('input', e => {
    resetPasswordError()
    if (e.target.validity.tooShort) setPasswordError('Password must have atleast 8 characters');
});

document.getElementsByName('confirm-password')[0].addEventListener('input', e => {
    resetConfirmPasswordError();
    if (e.target.validity.tooShort) setConfirmPasswordError('Password must have atleast 8 characters');
});
