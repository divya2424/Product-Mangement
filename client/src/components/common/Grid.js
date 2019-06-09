import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ModalPage from "./Modal";
import Service from '../../actions/api';



class Grid extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSorted : false,
       
        }
    }


    onEdit = (e,id)=>{
        this.props.unsetData();
        this.props.setData(id);
    }

    renderListing(){
        const { lists,selected ,fetchProductListing,searchProduct,query} = this.props;
        const { form } = this.state;
        console.log('propsss',this.props);
        return (
            lists && lists.map((val,index)=>{
                return(
                    <MDBTableBody>
                 <tr key={index}> 
                    <td>      
                    {index + 1}
                    </td>
                    <td>      
                    {val.productId}
                    </td>
                    <td>      
                    {val.name}
                    </td>
                    <td>      
                    {val.description}
                    </td>
                    <td>      
                    {val.price}
                    </td>
                    <td onClick={(e)=>this.onEdit(e,val)}>      
                    <ModalPage edit={true} selected={selected} searchProduct= {searchProduct} query={query} fetchProductListing={fetchProductListing} />
                    </td>
                    <td onClick={(e)=>this.onEdit(e,val)}>      
                    <ModalPage edit={false} selected={selected} searchProduct= {searchProduct} query={query} fetchProductListing={fetchProductListing}  />
                    </td>
             
                  </tr>
                      </MDBTableBody>
                    
                )
            })
        )
        }


    sortData=(e,type)=>{
        console.log('yessssssss')
        const { isSorted } = this.state;
        const { setProductData, query } =  this.props;
        let params ={
            "orderBy" : isSorted ? -1 : 1 ,
            "sortBy": type
           }
        if(query && query.length > 0){
            return ;
        }
         Service.sortData(params)
        .then(response => {
            return response.json();
        })
        .then(products =>{
          if(products.statusCode == 200){
              if(products && products.data){
                setProductData(products.data);
                this.setState({
                    isSorted : !isSorted
                })
              }
          }
          else{
            alert(products.message);
          
          }
          
        })
        .catch(err => {
            console.log("There is an error in getting product data from server",err)
        });
    }

    render() {
        const {lists,query} = this.props;
        return (
            <div>
            {lists.length > 0 ? <MDBTable striped>
                <MDBTableHead>
                    <tr>
                    <th>Serial No</th>
                    <th onClick={(e)=>this.sortData(e,'productId')}>Product ID {query && query.length > 0 ? '' : <span> ⇅ </span>}</th>
                    <th onClick={(e)=>this.sortData(e,'name')}>Name {query && query.length > 0 ? '' : <span> ⇅ </span>}</th>
                    <th>Description</th>
                    <th onClick={(e)=>this.sortData(e,'price')}>Price {query && query.length > 0 ? '' : <span> ⇅ </span>}</th>
                    <th>Edit </th>
                    <th>Delete </th>
                    </tr>
                </MDBTableHead>
                {
                    this.renderListing()
       
                }
        </MDBTable> : null }
            </div>
        );
    }
}

export default Grid;
