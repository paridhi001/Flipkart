 const SignupValidation = (signupInitialValues) => {
    let errors = {};
    
    if(!signupInitialValues.username){
        errors.username = "Username is required";
    }
    else if(signupInitialValues.username.length< 3 || signupInitialValues.username.length > 20){
        errors.username = "Length of username should be between 3-20";
    }
    if(!signupInitialValues.firstname){
        errors.firstname = "firstname is required";
    }
    else if(signupInitialValues.firstname.length< 3 || signupInitialValues.firstname.length > 20){
        errors.firstname = "Length of firstname should be between 3-20";
    }
    if(!signupInitialValues.lastname){
        errors.lastname = "lastname is required";
    }
    else if(signupInitialValues.lastname.length< 3 || signupInitialValues.lastname.length > 20){
        errors.lastname = "Length of lastname should be between 3-20";
    }
    if(!signupInitialValues.email){
        errors.email = "Email is required";
    }
    else if(!/\S+@\S+\.\S+/.test(signupInitialValues.email)){
        errors.email = "Invalid Email";
    }
    if(!signupInitialValues.password){
        errors.password = "Password is required";
    }
    else if(signupInitialValues.password.length < 5 || signupInitialValues.password.length > 20){
        errors.password = "Password is too small or too big";
    }
    if(!signupInitialValues.phone){
        errors.phone="Phone number is required"
    }

    return errors;
};


export default SignupValidation;