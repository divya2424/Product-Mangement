import React, { Component,Fragment } from "react";
import Grid from "../../common/Grid";
import { MDBBtn,MDBIcon,MDBCol } from "mdbreact";
import Service from '../../../actions/api';
// import { inject, observer } from "mobx-react";


class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            data: [],
            filteredData: [],
            productDetails : []
        }
    }
  
    goToProduct(){
        this.props.history.push('/product');
    }


    handleInputChange = (e)=>{
        this.setState({
            query : e.target.value
        })
    };

    onSubmit = (e)=>{
        e.preventDefault()
        if(this.state.query.length > 0){
            this.props.unsetSearchList();
            this.props.history.push('/search',{query : this.state.query});
        }
        else{
            alert('Please enter something...')
        }
      
    }


    componentDidMount(){
        const { fetchProductListing } = this.props
        fetchProductListing();

    }


    render() {
        const { productList,setProductData,setData ,selected,fetchProductListing,unsetData} = this.props
        return (
            <div className="App">
            <center>
                <h1>Welcome to Product Management</h1>
                <form onSubmit={this.onSubmit}>
                <MDBCol md="6">
                <div className="input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                    <span className="input-group-text purple lighten-3" id="basic-text1">
                        <MDBIcon className="text-white" icon="search" />
                    </span>
                    </div>
                    <input className="form-control my-0 py-1" 
                            placeholder="Search for..."
                            type="text"
                            value={this.state.query}
                            onChange={this.handleInputChange}/>
                </div>
                </MDBCol>
              
              </form>
              </center>
              <br />
                <div>
                <Grid lists={productList} selected={selected} unsetData = {unsetData} fetchProductListing={fetchProductListing} setProductData={setProductData} setData={setData}/>
                </div>
                <Fragment>
                <center>
                <MDBBtn outline color="primary" onClick={()=>this.goToProduct()}> Add Products</MDBBtn>
                </center>
               </Fragment>
            </div>
        );
    }
}

export default HomeComponent;
