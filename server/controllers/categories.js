//  require mongoose
var mongoose = require('mongoose');
// require models
var Category = mongoose.model('Category')

function CategoryController(){

  this.getCategories = function(req, res){
    console.log("params id:", req.params.id)
    Category.find({_user: req.params.id})
        .populate({
            path: '_events',
            model: 'Event',
        })
        .exec(
            function(err, categories){
            if ( err ){
                res.json({err: err, success: null});
            } else {
                res.json({err: null, success: categories});
            };
        });
  }; //End this.getCategories

  this.getCategory = function(req, res){
    Category.findOne( req.body , function(err, user){
      console.log(err, user);
      if ( err ){
        res.json({err: err, success: null});
      } else {
        res.json({err: null, success: users});
      };
    });
  }; //End this.index

  this.addCategory = function(req, res){
    // req.body === user object
    console.log(req.body)    
    category = new Category(req.body)
    category.save(function(err, success){
        // console.log("User Creation error: ", err);
        // console.log("User creation success: ", success);
        if (err) {
            res.json({err: err, success: null});
        } else {
            res.json({err: null, success: category});
        }; // end user save error catch
    }); // end user save process
  }; // End this.login

}; // End AccountsController

module.exports = new CategoryController();