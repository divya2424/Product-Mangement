import "isomorphic-fetch";
import {
    SET_PRODUCT_DATA,
    UNSET_PRODUCT_DATA,
    SET_SEARCH_LIST,
    UNSET_SEARCH_LIST,
    SET_DATA,
    UNSET_DATA
} from "./constants";
import URLS from './url';

export const setProductData = data => ({ type: SET_PRODUCT_DATA, payload: data });
export const unsetProductData = () => ({ type: UNSET_PRODUCT_DATA });
export const setSearchList = data => ({ type: SET_SEARCH_LIST, payload: data });
export const unsetSearchList = () => ({ type: UNSET_SEARCH_LIST });
export const setData = data => ({ type: SET_DATA, payload: data });
export const unsetData = () => ({ type: UNSET_DATA });

export const fetchProductListing = () => (
    dispatch,
    getState
) => {
    return (
        fetch(URLS.fetchProducts)
            .then(response => response.json())
            .then(products => {
                if (products && products.data) {
                        dispatch(setProductData(products.data));
                }
            })
            .catch(err => {
                dispatch(unsetProductData());
            })
    );
};


export const searchProduct = (id) => (
    dispatch,
    getState
) => {
    return (
        fetch(URLS.searchProducts.replace("%s", id))
            .then(response => response.json())
            .then(products => {
                
                if (products && products.data) {
                    console.log('products.data',products.data)
                        dispatch(setSearchList(products.data));
                }
            })
            .catch(err => {
                dispatch(unsetSearchList());
            })
    );
};