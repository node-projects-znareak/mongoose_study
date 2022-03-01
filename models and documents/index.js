const { User } = require("../models/User");
const mongoose = require("mongoose");
const MyModel = mongoose.model("Test", new mongoose.Schema({ name: String }));
const doc = new MyModel();

const user1 = new User({
  name: "Juan",
  surname: "Perez",
  email: "jperez@hotmail.com",
  password: "123456",
  address: {
    city: "Mérida",
    country: "Venezuela",
    postal_code: 2350,
  },
});

async function app() {
  console.log(doc instanceof MyModel);
  console.log(doc instanceof mongoose.Model);
  console.log(doc instanceof mongoose.Document);

  //const data = await user1.save();
  //console.log(data);

  const user = await User.findById("621d68378e1b77ab38b7c464", "name surname email");
  user.name = "JUAN ALEJANDRO"
  await user.save();
  console.log(user)
}
 
module.exports = app;
