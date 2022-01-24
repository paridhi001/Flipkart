/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, Grid, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { LocalOffer as Badge } from '@material-ui/icons';


//component
import ActionItems from "./ActionItems";

const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 55,
        background: '#F2F2F2'


    },
    container: {
        //margin: '0 80px',
        background: '#fff',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    smallText: {
        fontSize: 14,
        marginLeft:20
    },
    greyTextColor: {
        color: '#878787',
        marginLeft:20
    },
    price: {
        fontSize: 28,
        marginLeft:20
    },
    badge: {
        marginRight: 10,
        color: '#00CC00',
        fontSize: 15,
        marginLeft:20,
        [theme.breakpoints.down('md')]: {
            marginLeft:'auto'
         }
    },
    offers:{
        [theme.breakpoints.down('md')]: {
           fontSize:11,
           marginLeft:0
        }
    }
}));

const DetailView = ({ match }) => {
    const classes = useStyle();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

    const { product } = useSelector(state => state.getProductDetails);


    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getProductDetails(match.params.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Box className={classes.component}>
            {product && Object.keys(product).length &&
                <Grid container className={classes.container}>

                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItems product={product} />
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12} className={classes.rightContainer}>
                        <Typography style={{marginLeft: 20}}>{product.title.longTitle}</Typography>
                        <Typography className={clsx(classes.smallText, classes.greyTextColor)}>
                            8 Ratings and 1 review
                            <span><img src={fassured} style={{ width: 77 }} /></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.cost}</span> &nbsp;&nbsp;&nbsp;
                            <span className={classes.greyTextColor}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                        </Typography>
                        <Typography style={{marginLeft: 20}}>Available offers</Typography>
                        <Box className={classes.smallText}>
                            <Typography className={classes.offers}><Badge className={classes.badge} />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
                            <Typography className={classes.offers}><Badge className={classes.badge} />Bank Offer 10% Off on Bank of Baroda debit card first time transaction, T&C apply</Typography>
                            <Typography className={classes.offers}><Badge className={classes.badge} />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</Typography>
                            <Typography className={classes.offers} ><Badge className={classes.badge} />Partner OfferExtra 10% off upto ₹500 on next furniture purchase</Typography>
                        </Box>

                        <Table>
                            <TableBody>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Delivery</TableCell>
                                    <TableCell style={{ fontWeight: 600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Warranty</TableCell>
                                    <TableCell>No Warranty</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Seller</TableCell>
                                    <TableCell className={classes.smallText}>
                                        <span style={{ color: '#2874f0' }}>SuperComNet</span>
                                        <Typography>GST invoice available</Typography>
                                        <Typography>View more sellers starting from ₹329</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <img src={adURL} style={{ width: 390 }} />
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                </Grid>
            }
        </Box>

    )
}

export default DetailView;