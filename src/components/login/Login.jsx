import React, { useState } from "react";
import { Box, makeStyles, Typography, TextField, Button } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { authenticateLogin, authenticateSignup } from "../../service/api";
import { auth } from "../../firebase";
import SignupValidation from "./SignupValidation";
import LoginValidation from "./LoginValidation";

const useStyle = makeStyles({
    component: {
        height: '89.5vh',
        width: '100vh',
        maxWidth: 'unset !important'
    },
    image: {
        backgroundImage: `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        background: '#2874f0',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '89.5vh',
        width: '40%',
        padding: '45px 35px',
        '& > *': {
            color: '#FFFFFF',
            fontWeight: 600,
        }
    },
    login: {
        padding: '25px 35px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }
    },
    loginbtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
    requestbtn: {
        textTransform: 'none',
        background: '#fff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'


    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    smallText: {
        color: '#878787',
        fontSize: 10
    },
    createText: {
        margin: 'auto 0 3px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer'

    },
    error: {
        fontSize: 10,
        color: '#ff6161',
        lineHeight: 0,
        marginTop: 10,
        fontWeight: 600
    }
})

const initialValue = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: 'Signup with your mobile number to get started'
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const loginInitialValues = {
    email: '',
    password: ''
};

const Login = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();

    const [account, toggleAccount] = useState(initialValue.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [errors, setErrors] = useState({});



    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    const handleClose = () => {
        setOpen(false);
        toggleAccount(initialValue.login);
    }



    const toggleUserAccount = () => {
        toggleAccount(initialValue.signup);
    }



    const signupUser = async () => {

        setErrors(SignupValidation(signupInitialValues));
        try {

            let res = await auth.createUserWithEmailAndPassword(signup.email, signup.password);

            let finalsignup = {
                googleid: res.user.uid,
                email: signup.email,
                firstname: signup.firstname,
                lastname: signup.lastname,
                username: signup.username,
                phone: signup.phone
            }

            let response = await authenticateSignup(finalsignup);

            await res.user.sendEmailVerification();
            await auth.signOut();

            if (!response) return;
            handleClose();
            console.log("Please verify you email first then login back to system")

        }
        catch (e) {
            // console.log(e)
        }
    }

    const loginUser = async () => {
        setErrors(LoginValidation(loginInitialValues));
        try {
            let res = await auth.signInWithEmailAndPassword(login.username, login.password)
            if (!res.user.emailVerified) {
                await auth.signOut()
                console.log("please verify your email first then try to login")
                return;
            }

            let response = await authenticateLogin({ googleid: res.user.uid });
            if (response && response.data && response.data.username) {
                handleClose();
                setAccount(response.data.username);
            }
            else {
                return;
            }

        }
        catch (e) {
            console.log(e)
        }

    }

    const forgotPasswordClicked = async (e) => {
        e.preventDefault();
        try {
            let email = login.username;
            await auth.sendPasswordResetEmail(email)
        }
        catch (e) {
            // console.log(e)
        }

    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent className={classes.component}>
                <Box style={{ display: 'flex' }}>
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ?
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onValueChange(e)} name='username' label='Enter Email/Mobile number' />
                                {errors.Email && <p className={classes.error}>{errors.Email}</p>}
                                <TextField onChange={(e) => onValueChange(e)} name='password' label='Enter Password' type="password" />
                                {errors.Password && <p className={classes.error}>{errors.Password}</p>}
                                <Typography className={classes.text}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <Button onClick={() => loginUser()} className={classes.loginbtn} >Login</Button>
                                <Typography className={classes.text} style={{ textAlign: 'center' }}>OR</Typography>
                                <Button className={classes.requestbtn} onClick={forgotPasswordClicked}>Forgot Password?</Button>
                                <Typography className={classes.text} onClick={() => toggleUserAccount()}>To reset your password, type your email and click on Forgot Password</Typography>
                                <Typography className={classes.createText} onClick={() => toggleUserAccount()}>New to Flipkart? Create an account</Typography>
                            </Box> :
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                                {errors.firstname && <p className={classes.error}>{errors.firstname}</p>}
                                <TextField onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                                {errors.lastname && <p className={classes.error}>{errors.lastname}</p>}
                                <TextField onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                                {errors.username && <p className={classes.error}>{errors.username}</p>}
                                <TextField onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                                {errors.email && <p className={classes.error}>{errors.email}</p>}
                                <TextField onChange={(e) => onInputChange(e)} name='password' label='Enter Password' type="password"/>
                                {errors.password && <p className={classes.error}>{errors.password}</p>}
                                <TextField onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                                {errors.phone && <p className={classes.error}>{errors.phone}</p>}
                                <Button className={classes.loginbtn} onClick={() => signupUser()} >Continue</Button>
                            </Box>
                    }

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Login;
