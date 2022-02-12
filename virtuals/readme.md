# Virtuales

Las propiedades virtuales permiten de forma flexible gestionar la forma en la que se asignan y se leen campos de un esquema, de tal forma es posible controlar los valores que se modifican o se leen del registro a guardar.

Los virtuales no son métodos a los que se invoquen, al contrario, son propiedades de lectura y escritura especificados por el programador.



> Los virtuales también tienen su contexto de ``this`` el cual hace referencia al esquema el cual se está instanceando.



Un ejemplo sencillo de un virtual puede ser colocar el precio de un producto incluído el IVA, la lógica sería que el virtual calcule el precio con el IVA dandonos el total a pagar por el producto. Partiendo del siguiente modelo:

```javascript

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
```

Se creara un virtual para que al ser instanciado un nuevo producto y que por medio del campo ``price_iva`` se encarguen de establecer el precio total incluyendo el IVA:

```javascript
ProductSchema.virtual("price_iva").set(function (v) {
  const IVA = v * 20 / 100; // 20% de IVA
  const totalPrice = v + 0.98;
  this.price = totalPrice.toFixed(2);

  console.log(`IVA: ${IVA}$`);
});
```

Al momento de instanciar un nuevo documento y en vez de asignar el precio por medio de la propiedad ``price``, se asignara por medio de ``price_iva`` :

```javascript
const product = new Product({
    name: "Vino blanco",
    price_iva: 4.9,// propiedad SET del virtual
    image:
      "https://s1.eestatic.com/2021/08/26/cocinillas/vinos/607200602_201480356_854x640.jpg",
  });
```

Al guardar el documento en la base de datos, en el registro se nota que el campo ``price`` ahora marca **5.88**, el virtual automaticamente se ejecuta al asignar un valor en uno de los campos del documento que se instancia y ejecturá la lógica escrita dentro de la función, igual pasa al tratar de leer un campo del mismo:

```javascript
ProductSchema.virtual("get_price_iva").get(function () {
  const IVA = (this.price * 20) / 100; // 20% de IVA
  const totalPrice = this.price + 0.98;
  return totalPrice.toFixed(2);
});
```

El virtual anterior en vez de asignar un precio con IVA incluido, te retorna el precio total de IVA sin modificar el documento dentro de la base de datos:

```javascript
const product = new Product({
    name: "Vino blanco",
    price: 4.9,
    image:
      "https://s1.eestatic.com/2021/08/26/cocinillas/vinos/607200602_201480356_854x640.jpg",
});

// propiedad GET del virtual
console.log(product.get_price_iva); // 5.88
```


