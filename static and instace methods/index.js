const { User } = require("../models/User");

async function app() {
  const libardo = new User({
    name: "Libardo",
    surname: "Rengifo",
    email: "libardojesusrengifo128@gmail.com",
    password: "libardo28001320.",
    address: {
      street: "Calle 4",
      country: "Venezuela",
      city: "Valle de la pascua",
      postal_code: 2350,
    },
  });

  //   console.log(libardo.fullname())
  //   console.log(libardo.getPassword());

  console.log("Usuarios:");
  const users = await User.find({}).byCountry("Venezuela");

  // Equivalencia en queries nativas
  // const users = await User.find({})
  //   .where({ "address.country": "Venezuela" })
  //   .select("-address"); 
  
  // no es posible combinar inclusión y exclusión de campos en una misma query
  // https://www.mongodb.com/community/forums/t/projection-does-not-allow-exclusion-inclusion-together/31756

  console.log(users);
}

module.exports = app;
