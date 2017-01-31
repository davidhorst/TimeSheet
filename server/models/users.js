// require mongoose and dependents
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// Set schema
var UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "An username is required"],
    unique: true,
    minlength: 1,
    },
  }, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);