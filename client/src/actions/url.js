const baseUrl = "http://localhost:3001/api/";

const URLS = {
    'searchProducts' : `${baseUrl}search/%s`,
    'postProducts' : `${baseUrl}postlist`,
    'removeProducts' : `${baseUrl}remove/%s`,
    'updateProducts' : `${baseUrl}updatelist`,
    'fetchProducts' : `${baseUrl}getList`,
    'sortProduct' : `${baseUrl}sortlist`,
};


export default URLS;