const { Schema, model } = require("mongoose");

const Coords = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
  },
});

module.exports = model("Coord", Coords, "Coords");
