import React, { useContext, useState ,useEffect} from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import Profile from "./Profile";
//component
import LoginDialog from "../login/Login";
import { LoginContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";
import { auth } from '../../firebase';
import {authenticateLogin} from "../../service/api"

const useStyle = makeStyles(theme => ({
    login: {
        color: '#2874f0',
        background: '#fff',
        textTransform: 'none',
        fontWeight: 550,
        borderRadius: 2,
        // padding: '5px 30px',
        height: 32,
         marginTop: 9,
        marginBottom: 5,
        marginLeft: 50,
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            background: '#2874f0',
            color: '#FFFFFF',
            marginLeft:-5
        }
    },
    wrapper: {
        margin: '0 5% 0 auto',
        display: 'flex',
        '& > *': {
            marginRight: 50,
            alignItems: 'center',
            textDecoration: 'none',
            color: '#fff',
            [theme.breakpoints.down('sm')]: {
                color: '#2874f0',

            }

        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginLeft:50
        }
    },
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    }


}));



const reauth=async (setAccount)=>{
    
    let unsubscribe = auth.onAuthStateChanged(async user=> {
        try{
            if(user && user.uid){
                let response=await authenticateLogin({googleid:user.uid})
                if(response && response.data && response.data.username){
                    setAccount(response.data.username);
                }
            }
        }
        catch(e){
            // console.log(e)
        }
    });
    unsubscribe()
}


const HeaderButton = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    useEffect(()=>{
        if(!account){
            reauth(setAccount)
        }
    },[account,setAccount])

    const { cartItems } = useSelector(state => state.cart);

    const openLoginDialog = () => {
        setOpen(true);
    }
    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <Link to='/#'>
                        <Button variant="contained" onClick={(e) => {e.preventDefault(); openLoginDialog()}} className={classes.login}>LogIn</Button>
                    </Link>
            }
            <Typography style={{ marginTop: 15, marginBottom: 10 }}>More</Typography>
            <Link to='/cart' className={classes.container}>
                <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{marginTop: 5}}>Cart</Typography>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    )
}

export default HeaderButton;