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

  const users = await User.find({})
  console.log(users)
}

module.exports = app;
