const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "The product name must have at least 5 characters"],
      maxlength: [200, "Name must have at most 200 characters"],
      validate: {
        validator: function (value) {
          return /^(?![\s.]+$)[a-zA-Z\s.]*$/.test(value);
        },
        message: (props) => `${props.value} is not a valid name`,
      },
    },

    price: {
      type: Number,
      required: true,
      min: [1, "The product price must be at least 1"],
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
            value
          );
        },
        message: (props) => `${props.value} is not a valid image URL`,
      },
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

ProductSchema.virtual("price_iva").set(function (v) {
  const IVA = (v * 20) / 100; // 20% de IVA
  const totalPrice = v + 0.98;
  this.price = totalPrice.toFixed(2);

  console.log(`IVA: ${IVA}$`);
});

ProductSchema.virtual("get_price_iva").get(function () {
  const IVA = (this.price * 20) / 100; // 20% de IVA
  const totalPrice = this.price + 0.98;
  return totalPrice.toFixed(2);
});

module.exports = {
  Product: model("Product", ProductSchema),
  ProductSchema,
};
