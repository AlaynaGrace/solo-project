var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
  name: {type: String, required: true},
  breed: String,
  color: String,
  age: Number,
  care: String,
  owner: {type: String, required: true},
  feed: Boolean,
  water: Boolean,
  walk: Boolean,
  bathe: Boolean,
  treats: Boolean,
  litter: Boolean,
  household: {type: String, required: true}
});

module.exports = mongoose.model('pets', petSchema);
