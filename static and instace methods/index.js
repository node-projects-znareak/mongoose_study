const { User } = require("../models/User");

function app() {
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

  console.log(libardo.fullname())
  console.log(libardo.getPassword());
}

module.exports = app;
