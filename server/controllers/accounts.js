//  require mongoose
var mongoose = require('mongoose');
// require models
var User = mongoose.model('User')

function AccountsController(){

  this.index = function(req, res){
    User.find({}, function(err, users){
      if ( err ){
        res.json({err: err, success: null});
      } else {
        res.json({err: null, success: users});
      };
    });
  }; //End this.index

  this.getUser = function(req, res){
    User.findOne( req.body , function(err, user){
      console.log(err, user);
      if ( err ){
        res.json({err: err, success: null});
      } else {
        res.json({err: null, success: users});
      };
    });
  }; //End this.index

  this.login = function(req, res){
    // req.body === user object
    User.findOne( req.body , function(err, user){
      if (err) {
        res.json({err: err, success: null});
      } else {
        if (!user) {
          user = new User(req.body)
          user.save(function(err, success){
            if (err) {
              res.json({err: err, success: null});
            } else {
              res.json({err: null, success: user});
            }; // end user save error catch
          }); // end user save process
        } else {
          res.json({err: null, success: user });
        }; // end no user found error catch
      }; // end find user error catch
    }); // end find exisiting user
  }; // End this.login

}; // End AccountsController

module.exports = new AccountsController();