const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  propertyType: {
    type: String,
    required: true,
  },
  bath: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  rooms: {
    type: String,
    required: true,
  },
  favorite: { type: Boolean },
  img: { type: String },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Properties = mongoose.model("properties", PropertySchema);

module.exports = Properties;
