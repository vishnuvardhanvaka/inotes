

function LoginValidation(credentials) {
    let errors = {}
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!credentials.email) {
        errors.email = 'Email Required'
    }
    else if (!credentials.email.includes('@')) {
        errors.email = 'Please enter a valid email address'
    }
    else if (!emailPattern.test(credentials.email)) {
        errors.email = 'Please enter a valid email address';
    }
    if (!credentials.password) {
        errors.password = 'Password Required'
    }
    return errors
}

export default LoginValidation;


