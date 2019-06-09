import { connect } from "react-redux";
import HomeComponent from "../components/views/Home/HomeComponent";
import { setProductData,setSearchList,fetchProductListing,
    setData,unsetData, unsetProductData,unsetSearchList } from '../actions/productActions'

const mapStateToProps = state => {
    console.log('state',state);
    return {
     productList : state.productReducer.productList,
     searchList  : state.productReducer.searchList,
     selected : state.productReducer.selected
    };
};

const mapDispatchToProps = dispatch => ({
    setProductData : data => dispatch(setProductData(data)),
    setSearchList : data => dispatch(setSearchList(data)),
    setData : data => dispatch(setData(data)),
    fetchProductListing : () => dispatch(fetchProductListing()),
    unsetProductData : () => dispatch(unsetProductData()),
    unsetSearchList : () => dispatch(unsetSearchList()),
    unsetData : data => dispatch(unsetData(data)),

    
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);

export default Home;
