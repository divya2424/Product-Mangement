var express = require('express'); // Making Object Of Express
var router = express.Router(); // Using Routing Function of Express
var userController = require('../controllers/product'); //Making Object of Controllers


router 
  .post('/postlist',userController.postProduct)
  .post('/updatelist',userController.updateProduct)
  .post('/sortlist',userController.sortProduct)
  .get('/remove/:id',userController.removeProduct)
  .get('/search/:id',userController.SearchData)
  .get('/getList',userController.getProducts);


module.exports = router; // Exporting router