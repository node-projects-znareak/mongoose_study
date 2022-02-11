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

Usualmente estos métodos en lo personal no los suelo usar debido a que trabajan de forma local al documento que se esté creando. Sirven para gestionar los campos y comportamientos de una determinada instancia de un modelo, un ejemplo de los métodos de instancia sería las funciones que encapsulan datos privados o sensibles del modelo, ejemplo:

```javascript
UserSchema.methods.fullname = function () {
  return this.name + " " + this.surname;
};
```

Un esquema de un usuario con campos como nombre, apellido, correo y clave, se crea un método para obtener el nombre completo del usuario que se vaya a guardar o editar en la base de datos. Importante destacar que `this` hace referencia al objeto del esquema, de esta forma es posible obtener los valores de los campos del nuevo registro, para hacer uso del método tan solo es invocarlo:

```javascript
const libardo = new User({ /*valores de los campos*/});

console.log(libardo.fullname())
console.log(libardo.getPassword()); // ejemplo de obtener la contraseña
```

Ambos métodos se ejecutan desde el contexto del documento que se esta creando (en este caso el objeto **libardo**) y ejecuta la lógica de la función.

## Las queries

Las queries son funciones que pertenecen a la API de mongoose, permite gestionar los datos de la base de datos (ver, modificar, eliminar y actualizar) por medio de un gran conjunto de métodos, de eso se trata las queries, permiten ejecutar una lógica hacia los datos dependiendo de que tipo de acción se quiera realizar.

Ejemplo de una querie más usual para traer todos los registro de una colección:

```javascript
const users = User.find({ });
```

De este modo es posible encadenar más consultas, permitiendo ser más flexible a la hora de seleccionar los registros:

```javascript
 const users = await User.find({})
    .where({ "address.country": "Venezuela" })
    .select("-address");
```

En el ejemplo dado, se muestra como se puede encadenar consultas de forma muy flexible y clara al programador.

Se busca todos los registros de usuarios, se filtran por el país de origen y se remueven aquellos campos que no se deseen mostrar. Ahora bien, para transformar aquella lógica en una **query** de mongoose solo hace falta usar la propiedad ``query`` de los esquemas y agregarle la nueva query:

```javascript
//una query que es posible encadenarla con otras
UserSchema.query.byCountry = function (country) {
  return this.where({ "address.country": country }).select("-address");
};
```

Ahora al tratar de usar alguna consulta de la API de mongoose, tambien tendra disponible la nueva query agregada al esquema:

```javascript
const users = await User.find({}).byCountry("Venezuela");
```

De tal forma se puede extender la funcionalidad de las consultas en mongoose de forma flexbile y encapsulada. Lo mejor de esta característica es la capacidad de crear tus propios métodos y lógica separada abstrayendo el código de forma que el programador sea capaz de entender el objetivo de la consulta.
