import "isomorphic-fetch";

import URLS from "./url";

export default {
    searchProducts : id =>{
        let option = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };
        return fetch(URLS.searchProducts.replace("%s", id), option);
    },
    postProducts: params => {
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        };
        return fetch(URLS.postProducts, option);
    },
    removeProducts : id =>{
        let option = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };
        return fetch(URLS.removeProducts.replace("%s", id), option);
    },
    updateProducts: params => {
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        };
        return fetch(URLS.updateProducts, option);
    },
    sortData: params => {
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        };
        return fetch(URLS.sortProduct, option);
    },

   
};