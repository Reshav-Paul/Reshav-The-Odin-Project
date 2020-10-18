module.exports.mongoIdParameterError = {
    status: 'Invalid_ID_Paramter',
    message: 'The ID parameter provided is not valid.'
}

module.exports.mongoIdError = {
    status: 'Invalid_ID',
    message: 'The ID provided is not valid.'
}

module.exports.user_not_found = {
    status: 'User_Not_Found',
    message: 'No user was found for the requested ID'
}

module.exports.post_not_found = {
    status: 'Post_Not_Found',
    message: 'No post was found for the requested ID'
}

module.exports.editor_not_found = {
    status: 'Editor_Not_Found',
    message: 'No editor was found for the requested ID'
}

module.exports.duplicate_email = {
    status: 'Duplicate_Email',
    message: 'This email address already belongs to a registered user'
}

module.exports.validationErrors = {

    // for user model
    no_first_name: 'First name cannot be empty',
    numeric_first_name: 'First name cannot be numeric',
    invalid_email: 'Invalid Email',
    no_password: 'Passwords should have a minimum length of 5',
    numeric_last_name: 'Last name cannot be numeric',

    // for post model
    no_title: 'Posts must have a title',
    no_body_text: 'Post must have some text',
    published_flag_wrong_format: 'isPublished can only be true or false',
    date_wrong_format: 'Invalid date'
}