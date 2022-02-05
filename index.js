require("dotenv").config();
const { error } = require("./helpers/messages");
const connectDb = require("./helpers/mongodb");
const { User, UserSchema } = require("./models/User");

UserSchema.add({
  profile_avatar: {
    type: String,
    default: null,
  },
});

async function createDocument() {
  try {
    // crear la instancia de un documento
    const usuario1 = new User({
      name: "Juan",
      surname: "Perez",
      email: "juan@gmail.com",
      password: "juan28001320.",
      adddress: {
        street: "Calle de la calle",
        country: "España",
        city: "Madrid",
        postal_code: "qwe",
      },
    });

    return await usuario1.save();
  } catch (e) {
    error(e.message);
  }
}

async function app() {
  await connectDb();
  console.log("App started! \n\n");
  createDocument();
  //   console.log(usuario1.id);
  //   console.log(usuario1.schema.obj);
}
 
app();
