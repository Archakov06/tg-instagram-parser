const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  caption: String,
  images: Array,
  user: Object,
  id: { type: String, unique: true, required: true, dropDups: true },
});

const MediaModel = mongoose.model('Media', MediaSchema);

exports.MediaModel = MediaModel;
