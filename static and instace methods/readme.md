# Métodos de instancia, estático y las queries

Como se menciono en la documentación de los esquemas estos métodos son muy utiles para ahorrarnos logíca y código en controladores o evitar crear helpers. Sin embargo no necesariamente son requeridos en tu proyecto, son más que opciones que mongoose te brinda para dividir y juntar tu lógica en el sitio correcto.

Se mostrará un par de ejemplos de dichos métodos y a su vez, el uso de las consultas (queries) que son en parte muy parecidos a estos métodos en cuanto a la forma de como trabajan y se invocan.

Primeramente todo se empieza creando un esquema para estrucurar nuestra colección y de tal forma, poder gestionar las operaciones en la misma:

```javascript
const { model, Schema } = require("mongoose");s
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

// colocar los métodos

module.exports = {
  Category: model("Category", CategorySchema),
  CategorySchema,
};
```

## Estáticos

Estos métodos se sulen usar más a menudo debido a su flexibilidad y facilidad de entenderlos y de creearlos para realizar consultas a las bases de datos. Para agregar un método estático se usa la propiedad ``statics`` seguido del nombre de la función. Como se menciono anteriormente, estos métodos están disponible solo a través del modelo (una véz compilado con la función `model("Model", Schema)`.

El ejemplo a continuación se crea un método estático que permite buscar todas las subcategorías, aquellos registros que esten vinculados con la categoría a la cual se le invoca el método:

```javascript
CategorySchema.statics.findSubCategory = function () {
  // buscamos todas las subcategorías que pertenezcan
  // a la categoría principal
  const subCategories = this.find({
    // convertirmos el string en un ObjectId de mongoose
    // Se recoge todos los documentos que tengan una relación a si misma
    category_id: Types.ObjectId(this._id),
  });

  return subCategories;
};
```

De esta forma es posible crear pequeños y útiles métodos con lógica que se quiera rehusar en varias partes del código de tu proyecto.

> El contexto de `this` cambia dependiendo si es un método estático o de instancia, si es de tipo estático `this` tiene el contexto de un modelo, por lo tanto es posible acceder a la API de consultas de las colecciones. Pero si es de instancia, `this` apunta al documento que se está creando, de forma que no es posible hacer consultas directas a la base de datos.

## De instancia

Usualmente estos métodos en lo personal no los suelo usar debido a que trabajando de forma local al documento que se esté creando. Sirven para gestionar los campos y comportamientos de una determinada instancia de un modelo.




