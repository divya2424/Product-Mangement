import { connect } from "react-redux";
import SearchComponent from "../components/views/search/SearchComponent";
import { setProductData,setSearchList,setData,fetchProductListing,unsetProductData,unsetSearchList,searchProduct } from '../actions/productActions'

const mapStateToProps = state => {
    console.log('state',state);
    return {
     productList : state.productReducer.productList,
     searchList  : state.productReducer.searchList,
     selected : state.productReducer.selected
    };
};

const mapDispatchToProps = dispatch => ({
    setData : data => dispatch(setData(data)),
    searchProduct : id => dispatch(searchProduct(id)),
    setProductData : data => dispatch(setProductData(data)),
    setSearchList : data => dispatch(setSearchList(data)),
    fetchProductListing : () => dispatch(fetchProductListing()),
    unsetProductData : () => dispatch(unsetProductData()),
    unsetSearchList : () => dispatch(unsetSearchList()),

    
});

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComponent);

export default Search;
