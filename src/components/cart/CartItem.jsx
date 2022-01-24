/* eslint-disable jsx-a11y/alt-text */
import { Card, Typography, Button,  Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";

//components
import GroupButton from "./GroupButton";

const useStyle = makeStyles({
    component: {
        borderTop: '1px solid #f0f0f0',
        borderRadius: 0,
        display: 'flex'
    },
    leftComponent: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        height: 110,
        width: 110
    },
    rightComponent: {
        marginTop: 20
    },
    greyTextColor: {
        color: '#878787'
    },
    smallText: {
        fontSize: 14,
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    },
    remove: {
        marginTop: 10,
        fontSize: 14,
        marginBottom: 20
        
    }
})


const CartItem = ({ item,removeItemFromCart }) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    return (
        <Card className={classes.component}>
            <Box className={classes.leftComponent}>
                <img src={item.url} className={classes.image} />
                <GroupButton/>
            </Box>
            <Box className={classes.rightComponent}>
                <Typography>{item.title.longTitle}</Typography>
                <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{ marginTop: 20 }}>Seller:SuperComNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} /></span>
                </Typography>
                <Typography style={{ margin: '20px 0' }}>
                    <span className={classes.price}>₹{item.price.cost}</span>&nbsp;&nbsp;&nbsp;
                    <span className={classes.greyTextColor}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#388E3C' }}>{item.price.discount} off</span>
                </Typography>
                <Button className={classes.remove} onClick={() => removeItemFromCart(item.id)}>REMOVE</Button>
            </Box>
        </Card>
    )
}

export default CartItem;