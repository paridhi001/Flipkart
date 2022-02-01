const LoginValidation = (loginInitialValues) => {
    let errors = {};

    if(!/\S+@\S+\.\S+/.test(loginInitialValues.Email)){
        errors.Email = "Email is Invalid";
    }
    if(!loginInitialValues.Password){
        errors.Password = "Password is required";
    }
    else if(loginInitialValues.Password.length < 5 || loginInitialValues.Password.length > 20){
        errors.Password = "Password is too small or too big";
    }

    return errors;
};

export  default LoginValidation;