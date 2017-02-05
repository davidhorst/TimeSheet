//  require mongoose
var mongoose = require('mongoose');
// require models
var Category = mongoose.model('Category');
var Event = mongoose.model('Event');

function EventsController(){

  this.addEvent = function(req, res){
    // If req.body._id exists, start the update process
    if (req.body._id){
      Event.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, updatedEvent){
        if (err){ return res.json({err:err, success: null})}
        return res.json({err:null, success:updatedEvent})
      })
    } else {
      // Create a new event if exisiting ID isnt in req.body
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
              }; // end category save error catch
            }); //end category save
          };// end  add event to category
        }); // end event save
      }); // end find category process
    }; // End create new event process 
  }// end addEvent function

  this.deleteEvent = function(req, res){
    
    var eventID = req.params.id;

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
    });
  }
}; // End EventsController

module.exports = new EventsController();