import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBIcon,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Service from '../../actions/api';
import _ from 'lodash'
class ModalPage extends Component {
state = {
  modal: false,
  form : {
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

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

static getDerivedStateFromProps(nextProps, prevState) {
  let stateData = { ...prevState };
  // let isFormSet = false
  if (nextProps.selected && !_.isEqual((prevState.form.description.value || ''),(nextProps.selected.description || '') )) {
      let form = {
          ...stateData.form
      };
      form.price.value = nextProps.selected.price;
      form.description.value = nextProps.selected.description ;
      form.name.value = nextProps.selected.name;
      stateData = {
        ...stateData,
        form: form,
        // isFormSet: true
    };
  }
  return stateData;
}

componentDidMount(){
  console.log('selected',this.props.selected)
}

saveChanges=()=>{
  const { edit,selected ,fetchProductListing,searchProduct ,query} = this.props;
  console.log('selected.',selected.productId)
  const productId = parseInt(selected.productId);
  if(this.handleValidation()){
    if(!edit){
      Service.removeProducts(productId)
      .then(response => {
          return response.json();
      })
      .then(products =>{
        if(products.statusCode == 200){
          if(query  && query.length > 0){
            searchProduct(query)
          }
          else{
            fetchProductListing();
          }
         
          this.toggle()
        }
          else{
            alert(products.message);
          }
      })
      .catch(err => {
          console.log("There is an error in getting product data from server",err)
      });
    }
    else{
      let params = {
        productId : productId,
        name : this.state.form.name.value,
        price : this.state.form.price.value,
        description : this.state.form.description.value
      }
      Service.updateProducts(params)
      .then(response => {
          return response.json();
      })
      .then(products =>{
        if(products.statusCode == 200){
          if(query  && query.length > 0){
            searchProduct(query)
          }
          else{
            fetchProductListing();
          }
          this.toggle();
        }else{
            alert(products.message);
          }
      })
      .catch(err => {
          console.log("There is an error in getting product data from server",err)
      });
    }
  }

}



handleValidation() {
  const form = this.state.form;
  let formIsValid = true;

  if (!form.name.value) {
      formIsValid = false;
      form.name.error = true;
      form.name.errorMessage = "Title cannot be empty";
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

handleInputChange = e =>{
 
  let form = {...this.state.form}
  console.log('handleinpuc', form[e.target.name].value, e.target.value)
    form[e.target.name].value = e.target.value;
    form[e.target.name].error = false;
    form[e.target.name].errorMessage = "";
    this.setState({ form });
}



render() {
    const { edit } = this.props;
    const { form } = this.state;
  return (
      
    <MDBContainer>
        {
            edit ?  <MDBIcon far icon="edit" onClick={this.toggle}>✎</MDBIcon> : 
            <MDBIcon icon="skull-crossbones" onClick={this.toggle} >☸</MDBIcon>
        }
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Confirm Your Changes</MDBModalHeader>
        <MDBModalBody>
        {
          edit ? 
      <div className="modal-dialog modal-notify modal-warning" role="document">
            <div className="modal-content">

                      <div className="modal-body">
                      {
                        form.name.error ? <div> { form.name.errorMessage }</div> : ''
                      }
                        <div className="md-form">
                          <input type="text" name="name" value = {form.name.value} onChange={this.handleInputChange} className="form-control validate" />
                          <label data-error="wrong" data-success="right" for="form1">Title</label>
                        </div>
                        {
                        form.description.error ? <div> { form.description.errorMessage }</div> : ''
                      }
                      <div className="md-form">
                        <input type="text"  name="description" value = {form.description.value} onChange={this.handleInputChange} className="form-control validate" />
                        <label data-error="wrong" data-success="right" for="form2">Description</label>
                      </div>
                      {
                        form.price.error ? <div> { form.price.errorMessage }</div> : ''
                      }
                      <div className="md-form">
                        <input type="text"  name="price" value = {form.price.value} onChange={this.handleInputChange} className="form-control validate" />
                        <label data-error="wrong" data-success="right" for="form3">Price</label>
                      </div>

                </div>
        </div>
  </div>
:  <div> Are You Sure you want to delete this?</div>
        }
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={this.saveChanges} >Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;