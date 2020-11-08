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

module.exports.comment_not_found = {
    status: 'Comment_Not_Found',
    message: 'No comment was found for the requested ID'
}

module.exports.duplicate_email = {
    status: 'Duplicate_Email',
    message: 'This email address already belongs to a registered user'
}

module.exports.login_user_not_found = {
    status: 'Login_Failed',
    message: 'Email is not registered'
}

module.exports.login_wrong_password = {
    status: 'Login_Failed',
    message: 'Wrong password'
}

module.exports.admin_auth_failed = {
    status: 'Admin_Auth_Failed',
    message: 'Provide admin field with admin password'
}

module.exports.validationErrors = {

    // for user and editor model
    no_first_name: 'First name cannot be empty',
    no_last_name: 'Last name cannot be empty',
    no_username: 'Username cannot be empty',
    numeric_first_name: 'First name cannot be numeric',
    invalid_email: 'Invalid Email',
    no_password: 'Passwords should have a minimum length of 5',
    numeric_last_name: 'Last name cannot be numeric',

    // for post model
    no_title: 'Posts must have a title',
    no_body_text: 'Post must have some text',
    published_flag_wrong_format: 'isPublished can only be true or false',
    date_wrong_format: 'Invalid date',

    // for comment model
    no_comment_text: 'Comment must have non-empty text'
}