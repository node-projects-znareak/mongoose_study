const { Product, ProductSchema } = require("../models/Product");
const { Schema } = require("mongoose");
async function app() {
  const product = new Product({
    name: "Vino blanco",
    price: 4.9,
    image:
      "https://s1.eestatic.com/2021/08/26/cocinillas/vinos/607200602_201480356_854x640.jpg",
  });

  //await product.save();
  //   const products = await Product.find({}).select(
  //     "-image -createdAt -updatedAt"
  //   );

  console.log(product.id);
}

module.exports = app;

const thingSchema = new Schema({}, { timestamps: { createdAt: "created_at" } });
