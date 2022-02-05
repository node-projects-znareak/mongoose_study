const { Schema, model } = require("mongoose");

const options = {
  // fecha de creacion y ultima modificacion
  timestamps: true,
  // establecer explicitamente el nombre de la tabla (coleccion)
  collection: "users",
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must have at least 3 characters"],
      maxlength: [20, "Name must have at most 20 characters"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      minlength: [3, "Name must have at least 3 characters"],
      maxlength: [60, "Name must have at most 20 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },

    adddress: {
      street: String,
      country: String,
      city: String,
      postal_code: Number,
    },
  },
  options
);

module.exports = {
  User: model("User", UserSchema),
  UserSchema,
};
 