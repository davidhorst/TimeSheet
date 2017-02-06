// require mongoose and dependents
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// Set schema
var CategorySchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  name: {
      type: String,
      required: true,
      minlength:5},
  }, {timestamps: true});

  CategorySchema.pre('remove', function(next) {
    Event.remove({_category: this._id}).exec();
    next();
});

module.exports = mongoose.model('Category', CategorySchema);