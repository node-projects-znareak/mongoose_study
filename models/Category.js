const { model, Schema, Types } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      lowercase: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    category_id: {
      type: Types.ObjectId,
      ref: "Category",
      default: null, // si es diferente a null es una sub-categoria
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

CategorySchema.statics.findSubCategory = function () {
  // buscamos todas las subcategorías que pertenezcan
  // a la categoría principal
  const subCategories = this.find({
    // convertirmos el string en un ObjectId de mongoose
    // se recoge todos los documentos que tengan una
    // relación a si misma (sub-categoría)
    category_id: Types.ObjectId(this._id),
  });

  return subCategories;
};
s

module.exports = {
  Category: model("Category", CategorySchema),
  CategorySchema,
};
