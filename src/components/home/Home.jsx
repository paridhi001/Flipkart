
import { Box, makeStyles } from "@material-ui/core";
//components
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from './MidSlide';
import MidSection from "./MidSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts as listProducts } from '../../redux/actions/productActions';


const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2',

    },
    rightwrapper: {
        background: '#ffffff',
        padding: 5,
        margin: '12px 0 0 10px',
        width: ''
    }
})

const Home = () => {
    const classes = useStyle();


    const getProducts = useSelector(state => state.getProducts)

    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <Box className={classes.component}>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                <Slide timer={false}
                    title="Discounts for You"
                    products={products}

                />
                <Slide timer={false}
                    title="Suggested Items"
                    products={products}
                />


            </Box>
        </div>


    )
}


export default Home;