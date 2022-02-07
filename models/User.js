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
      select: false,
    },

    address: {
      street: String,
      country: String,
      city: String,
      postal_code: Number,
    },
  },
  options
);

//agregar metodos al esquema, es necesario instanciar un documento
UserSchema.methods.getPassword = function () {
  // `this` hace referencia al esquema y no a la funciones query del modelo
  // un esquema no puede acceder a la base de datos
  return this.password;
};

UserSchema.methods.fullname = function () {
  return this.name + " " + this.surname;
};

//agregar metodos estaticos, no es necesario instanciar un documento
UserSchema.statics.findUsersByCity = async function (city) {
  console.log(this);
  // los objetos anidados deben de especificarse su path (su ruta)
  const users = await this.find({ "address.city": city });
  return users;
};

module.exports = {
  User: model("User", UserSchema),
  UserSchema,
};
