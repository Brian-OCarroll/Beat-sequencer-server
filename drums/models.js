"use strict";

const mongoose = require("mongoose");

const { User } = require("../users/models");
//Users schema/model referenced by obj id
const listSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  name: { type: String, required: true},
  pads: {type: Array, required:true},
  drums: {type:Array, required: true}
});

listSchema.virtual("user_id").get(function() {
  return `${this.user._id}`.trim();
});

listSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    pads: this.pads,
    drums:this.drums
  };
};
//drums collection in mlab database

const drums = mongoose.model("drums", listSchema);

module.exports = { drums };
