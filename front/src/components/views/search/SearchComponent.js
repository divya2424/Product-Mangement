import React, { Component } from "react";
import {  MDBBtn } from 'mdbreact';
import Grid from "../../common/Grid";


class SearchComponent extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    
    goBack = () => {
        this.props.history.goBack();
    };

    componentDidMount(){
        const { searchProduct,location } = this.props;
        let query = location && location.state.query ? location.state.query : ''
        searchProduct(query);
    }   

    render() {
        const {searchList,location,setData,selected,searchProduct,unsetSearchList} = this.props;
        let query = location && location.state.query ? location.state.query : ''
        return (
         
            <div className="App">
               <MDBBtn color="cyan" onClick={this.goBack} >
                    Go Back
                </MDBBtn>
                <h1>Search Results .....</h1>
                {
                    searchList && searchList.length > 0 ?  <Grid lists={searchList} searchProduct={searchProduct} selected={selected} query={query} setData={setData}/> : <div>"No Results Found</div>
                }
               
           </div>
        );
    }
}

export default SearchComponent;



