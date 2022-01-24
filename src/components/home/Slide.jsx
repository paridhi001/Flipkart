/* eslint-disable jsx-a11y/alt-text */
import {Box,  makeStyles, Typography, Button, Divider} from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import React from 'react';
import { Link } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

 const useStyle = makeStyles({
        image: {
            width: 'auto',
            height: 150
        },
        text: {
            fontSize: 14,
            marginTop: 5
        },
        component: {
            marginTop: 12,
            background: '#FFFFFF'
        }, 
        deal: {
            display: 'flex',
            padding: '15px 20px'
        },
        dealText: {
            fontSize: 22,
            fontWeight: 600,
            lineHeight: '32px',
            marginRight: 25
        },
        button: {
            marginLeft: 'auto',
            backgroundColor: '#2874f0',
            borderRadius: 2,
            fontSize: 13
        },
        wrapper: {
            padding: '25px 15px'
        },
        timer: {
             color:'#7f7f7f',
             marginLeft:10,
             display:'flex',
             alignItems:'center'
        }
});

const Slide = ({timer, title, products}) => {
     const classes = useStyle();
     const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    
     const renderer = ({ hours, minutes, seconds }) => {
          // Render a countdown
          return <span className={classes.timer}>{hours}:{minutes}:{seconds} Left</span>;
      }

    return (
        <Box className={classes.component}>
            <Box className={classes.deal}>
            <Typography className={classes.dealText}>{title}</Typography>
            {
                timer &&
                <React.Fragment>
                    <img src = {timerURL} style ={{width:24}}/>
                    <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                 
                </React.Fragment>   
            }
               <Button variant="contained" color="primary" className={classes.button}>View All</Button>
            </Box>
            <Divider />
            <Carousel
                responsive={responsive}
                infinite={true}
                draggable={false}
                swipeable={false}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                containerClass="carousel-container"
               // removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-40-px"
            >
            {
                (products||[]).map((product,i) => (
                <Link key={i} to={`product/${product.id}`} style={{textDecoration: 'none'}}>
                    <Box textAlign="center" className={classes.wrapper} key={i}>
                    <img src = {product.url} className={classes.image}/>
                    <Typography className={classes.text} style={{ fontWeight: 600, color: '#212121' }}>{product.title.shortTitle}</Typography>
                    <Typography className={classes.text} style={{ color: 'green' }}>{product.discount}</Typography>
                    <Typography className={classes.text} style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Typography>
                    </Box>
                </Link>
                ))
            }
            </Carousel>
        </Box>
    )
}


export default Slide;