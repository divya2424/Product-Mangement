const Product = require("../models/product");
const messages =  require("../utility/Messages");
const Response = require('../utility/Response');


exports.SearchData = function (req, res) {
    let regex = RegExp(req.params.id);
   
    Product.find({
        name: {$regex: req.params.id, $options: 'i'}
    }, function (err, data) {
        if (err) {
            return res.json(Response.faliureRes(messages.error));
        }
        else if ((data || []).length === 0){
            return res.json(Response.successRes(messages.noData,''));
        }
        else{
            return res.json(Response.successRes(messages.success,data));
        }
       
    });
};


exports.postProduct = function (req, res) { 
    if(!req.body.productId || !req.body.name  || !req.body.description  || !req.body.price ){
        return res.json(Response.faliureRes(messages.missing));
    }
    let product = new Product({ 
        productId : req.body.productId,
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        updated_at : new Date()

    });
    Product.find({productId : req.body.productId},function(err,data){
        if(err){
            return res.json(Response.faliureRes(messages.error));

        }
        else if ((data || []).length === 0){
            product.save(function (err, response) { 
                if (err) {
                    return res.json(Response.faliureRes(messages.error));
                }
                else{
                    return res.json(Response.successRes(messages.save,response));
                }
            });
        }
        else{
           return res.json(Response.successRes(messages.existingData,data));

        }
    });

};


exports.getProducts = function (req, res) { 
    Product.find({},function(err,data){
        if(err){
            return res.json(Response.faliureRes(messages.error));
        }
        else if ((data || []).length === 0){
            return res.json(Response.successRes(messages.noData,data));
        }
        else{
           return res.json(Response.successRes(messages.success,data));

        }
    });
};


exports.updateProduct=function(req,res){
    let query = {productId: req.body.productId}
    Product.findOne(query, function(err, product){
        if(err){
            return res.json(Response.faliureRes(messages.error));
        }
        else if(product){
            let updateQuery = {
                name: req.body.name,
                description: req.body.description,
                price:req.body.price,
                updated_at : new Date()
            }
            Product.findOneAndUpdate(query,{$set : updateQuery},{upsert : true,new: true},function(err,data){
                if(err){
                        return res.json(Response.faliureRes(messages.error));
                    }
                else{
                    res.json(Response.successRes(messages.updated,data));
                }
            });
       }else{
        return res.json(Response.faliureRes(messages.invalid));
       }
                      
    });
} ;




exports.removeProduct=function(req,res){
    let id = req.params.id;
    Product.findOne({productId: id}, function(err, product){
        if(err){
            return res.json(Response.faliureRes(messages.error));
        }
        else if(product){
           Product.deleteOne({productId: id}, function(err,removedData){
                if(err){
                    return res.json(Response.faliureRes(messages.error));
                }
                else{
                    res.json(Response.successRes(messages.removed,removedData));
                }
            });  
       }else{
        return res.json(Response.successRes(messages.noData,product));
    }
                      
    });
};


exports.sortProduct = async function(req,res){
    let sortBy = req.body.sortBy;
    let orderBy = req.body.orderBy;
    try {
        var product = await Product.find({}).sort({[sortBy] : orderBy })
        if((product|| []).length === 0){
                return res.json(Response.successRes(messages.noData,product));
        }else{
                return res.json(Response.successRes(messages.success,product)); 
            }        
    } catch (err) {
        return res.json(Response.faliureRes(messages.error));
    }
};
