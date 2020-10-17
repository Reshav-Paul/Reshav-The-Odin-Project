module.exports.mongoIdError = {
    status: 'Invalid_ID',
    message: 'The ID provided is not valid.'
}

module.exports.user_not_found = {
    status: 'User_Not_Found',
    message: 'No user was found for the requested ID'
}

module.exports.duplicate_email = {
    status: 'Duplicate_Email',
    message: 'This email address already belongs to a registered user'
}

module.exports.validationErrors = {
    no_first_name: 'First name cannot be empty',
    numeric_first_name: 'First name cannot be numeric',
    invalid_email: 'Invalid Email',
    no_password: 'Passwords should have a minimum length of 5',
    numeric_last_name: 'Last name cannot be numeric',
}