import React, { useState} from "react";
import { Box, makeStyles, Typography, TextField, Button } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { authenticateLogin, authenticateSignup } from "../../service/api";


const useStyle = makeStyles({
    component: {
        height: '85vh',
        width: '100vh',
        maxWidth: 'unset !important'
    },
    image: {
        backgroundImage: `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        background: '#2874f0',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '85vh',
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
    createText: {
        margin: 'auto 0 3px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer'

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
    username: '',
    password: ''
};

const Login = ({ open, setOpen, setAccount}) => {
    const classes = useStyle();

    const [account, toggleAccount] = useState(initialValue.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);


   
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
        console.log(signup);
    }

  
    const handleClose = () => {
        setOpen(false);
        toggleAccount(initialValue.login);
    }



    const toggleUserAccount = () => {
        toggleAccount(initialValue.signup);
    }


    const signupUser = async () => {
    
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.username);
    }

    const loginUser = async() => {
        
        let response = await authenticateLogin(login);
        if(!response) 
            return;
            handleClose();
            setAccount(login.username);
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

                        <TextField onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                        <Typography className={classes.text}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                        <Button onClick={() => loginUser()} className={classes.loginbtn} >Login</Button>
                        <Typography className={classes.text} style={{ textAlign: 'center' }}>OR</Typography>
                        <Button className={classes.requestbtn}>Request OTP</Button>
                        <Typography className={classes.createText} onClick={() => toggleUserAccount()}>New to Flipkart? Create an account</Typography>
                    </Box> :
                    <Box className={classes.login}>
                        <TextField onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                        <TextField onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                        <TextField onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                        <TextField onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                        <TextField onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                        <TextField onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                        <Button className={classes.loginbtn} onClick={() => signupUser()} >Continue</Button>
                    </Box>
                    }

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Login;
