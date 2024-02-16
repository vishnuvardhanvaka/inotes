

function SignupValidation(credentials) {
    let errors = {}
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!credentials.username){
        errors.username='Username Required'
    }
    if (!credentials.location){
        errors.location='Location Required'
    }
    
    if (!credentials.phNo){
        errors.phNo='Phone number Required'
    }
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
    if (credentials.votp && !credentials.otp){
        errors.otp='OTP Required'

    }
    else if (credentials.votp!=credentials.otp){
        errors.otp='Incorrect OTP'

    }
    return errors
}

export default SignupValidation;


