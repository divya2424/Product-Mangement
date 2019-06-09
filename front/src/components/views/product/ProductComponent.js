import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Service from '../../../actions/api';
class ProductComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            form : {
              productId : {
                value: '',
                error: false,
                errorMessage: ''
              },
              name : {
                value: '',
                error: false,
                errorMessage: ''
              },
              description : {
                value: '',
                error: false,
                errorMessage: ''
              },
              price  : {
                value: '',
                error: false,
                errorMessage: ''
              }
            }
        }
    }
    
    goToHome = event => {
      const { form } = this.state;
      if(this.handleValidation()){
        
        let params = {
          productId: form.productId.value,
          price : form.price.value,
          description: form.description.value,
          name : form.name.value
        };
        Service.postProducts(params)
        .then(response => {
            return response.json();
        })
        .then(products =>{
          if(products.statusCode == 200){
            this.props.history.push("/");
          }
          else{
            if(products.data == ''){
              alert('Please enter the valid ProductID / Price');
            }
            else{
              alert(products.message);
            }
          
          }
          
        })
        .catch(err => {
            console.log("There is an error in getting product data from server",err)
        });
        
      } 
    };

    handleValidation() {
      const form = this.state.form;
      let formIsValid = true;

      if (!form.name.value) {
          formIsValid = false;
          form.name.error = true;
          form.name.errorMessage = "Title cannot be empty";
      } 

      if (!form.productId.value) {
          formIsValid = false;
          form.productId.error = true;
          form.productId.errorMessage = "Product ID cannot be empty";
      } 

      if (!form.price.value) {
        formIsValid = false;
        form.price.error = true;
        form.price.errorMessage = "Price cannot be empty";
    } 
    if (!form.description.value) {
        formIsValid = false;
        form.description.error = true;
        form.description.errorMessage = "Description cannot be empty";
    } 
      this.setState({ form });
      return formIsValid;
  }

    onhandleChange = e =>{
      const { form } = this.state;
        form[e.target.name].value = e.target.value;
        form[e.target.name].error = false;
        form[e.target.name].errorMessage = "";
        this.setState({ form });
    }


    goBack = ()=>{
      this.props.history.goBack();
    }

    render() {
      const  { form } = this.state;
        return (
          <div className="center">
          <MDBBtn color="cyan" onClick={this.goBack}>
                          Go Back
                        </MDBBtn>
                        <br />
       
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">Add Your Product</p>
                      <div className="grey-text">
                      {
                        form.productId.error ? <div> {form.productId.errorMessage}</div> : ''
                      }
                      <MDBInput
                          label="Product ID"
                          icon="align-justify"
                          group
                          type="text"
                          name="productId"
                          value={form.productId.value}
                          onChange={this.onhandleChange}
                          validate
                          error="wrong"
                          success="right"
                        />
                     {
                        form.name.error ? <div> { form.name.errorMessage }</div> : ''
                      }
                        <MDBInput
                          label="Title"
                          icon="align-justify"
                          group
                          type="text"
                          name="name"
                          value={form.name.value}
                          onChange={this.onhandleChange}
                          validate
                          error="wrong"
                          success="right"
                        />
                     {
                        form.description.error ? <div> {form.description.errorMessage } </div> : ''
                      }
                        <MDBInput
                          label="Description"
                          icon="grin-alt"
                          group
                          type="email"
                          name="description"
                          value={form.description.value}
                          onChange={this.onhandleChange}
                          validate
                          error="wrong"
                          success="right"
                        />
                    {
                        form.price.error ? <div> {form.price.errorMessage }</div> : ''
                      }
                        <MDBInput
                          label="Price"
                          icon="dollar-sign"
                          group
                          type="text"
                          name="price"
                          value={form.price.value}
                          onChange={this.onhandleChange}
                          validate
                          error="wrong"
                          success="right"
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn color="cyan" onClick={this.goToHome}>
                          Add Me
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </div>
        );
    }
}

export default ProductComponent;



