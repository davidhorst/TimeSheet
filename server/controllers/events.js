//  require mongoose
var mongoose = require('mongoose');
// require models
var Category = mongoose.model('Category');
var Event = mongoose.model('Event');

function CategoryController(){

  // this.getCategories = function(req, res){
  //   console.log("params id:", req.params.id)
  //   Category.find({_user: req.params.id}, function(err, categories){
  //     if ( err ){
  //       res.json({err: err, success: null});
  //     } else {
  //       res.json({err: null, success: categories});
  //     };
  //   });
  // }; //End this.index

  // this.getCategory = function(req, res){
  //   Category.findOne( req.body , function(err, user){
  //     console.log(err, user);
  //     if ( err ){
  //       res.json({err: err, success: null});
  //     } else {
  //       res.json({err: null, success: users});
  //     };
  //   });
  // }; //End this.index

  this.addEvent = function(req, res){
    console.log("add event body", req.body)
    if (req.body._id){
      console.log("starting update process");
      Event.findById(req.body._id, function(err, event){
        if (err){
          console.log(err)
          return res.json({err: err, success: null})
        } else {
          event.description = req.body.description;
          event.date = req.body.date;
          event.hours = req.body.hours;
          event.minutes = req.body.minutes;
          event.save(function(err, updatedEvent){
            if (err){
              console.log(err)
              return res.json({err:err, success: null})
            } else {
              return res.json({err:null, success: event})
            }
          })
        }
      })
    } else {

      Category.findOne({_id: req.body._category }, function(err, category){
        var event = new Event(req.body);
        event.save(function(err, newEvent){
          if (err) {
            return res.json({err: err, success: null});
          } else {
            category._events.push(event._id);
            category.save(function(err, updatedCategory){
              if (err){
                return res.json({err: err, success: null});
              } else {
                return res.json({err: null, success: newEvent});
              }; // end question save error catch
            }); //end question save
          };// end answer save error catch
        }); // end answer save
      }); // end find question process
    }; // End 
  }// end add event

  this.deleteEvent = function(req, res){
    var eventID = req.params.id;
    console.log("delete event ID at server: ", eventID);

    Event.findById(eventID, function(err, event) {
      if (err) {
        res.json({err:err, success: null})
      } else {
        var categoryID = event._category
        event.remove(function(err){
          if (err) throw err;
          Category.findById(categoryID, function(err, category){
            if (err) throw err;
            var index = category._events.indexOf(eventID)
            if (index > -1){
              category._events.splice(index, 1);
              category.save(err)
                if (err){
                  return res.json({err:err, success: null})
                } else {
                  return res.json({err:null, success:true})
                };
            }
          })
        })
      }

      // we have deleted the user
      console.log('User deleted!');
    });
      }
}; // End AccountsController

module.exports = new CategoryController();