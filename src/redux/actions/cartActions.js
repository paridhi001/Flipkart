import * as actionTypes from '../constants/cartConstants'
import axios from "axios";


const url = 'https://flipkart-backend-2pir.herokuapp.com';
//const url = 'http://localhost:8000';

export const addToCart = (id) => async(dispatch) => {
    try {
    const {data} =  await axios.get(`${url}/product/${id}`);

    dispatch({ type: actionTypes.ADD_TO_CART, payload: data  });

    } catch (error) {
        console.log('Error while calling addtoCart api');
    }
}

export const  removeFromCart  = (id) => (dispatch) => {
    console.log(id);
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })
}