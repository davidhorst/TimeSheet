// require mongoose and dependents
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// Set schema
var EventSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _category: {type: Schema.Types.ObjectId, ref: 'Category'},
  date: {type: Date},
  hours: {type: Number},
  minutes: {type: Number},
  description: {
      type: String,
      required: true,
      minlength:5},
  logged: {type: Boolean},
  }, {timestamps: true});

module.exports = mongoose.model('Event', EventSchema);