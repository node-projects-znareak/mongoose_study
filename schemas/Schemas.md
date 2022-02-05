# Los esquemas

Los esquemas son un tipo de clase que permite estructurar tu modelo de tabla (colecciones) de mongodb. Los esquemas poseen una sintaxis para ser creados parecidos a los objetos nativos de javascript, opciones de configuración y se complementan con los modelos.

Un ejemplo de un esquema sería uno para un blog de una página que contiene los campos más comunes, como los mostrados en el ejemplo de abajo. Un esquema a su vez, puede contener propiedades o campos con objetos anidados lo cual a su vez podría tener más objetos sucesivamente.

```javascript
  import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
      other: {
        prop: String // access: blogSchema.meta.other.prop
      }
    }
  });
```

La propiedad **meta** y **other** son considerados objetos planos de javascript debido a que no poseen un tipo (type) definido por mongoose, por lo tanto son tomados como campos. Puedes ver todos los tipos de datos permitidos [aquí](https://mongoosejs.com/docs/schematypes.html).

El campo anidado **other** puede ser accedido como si fuese un objeto plano de javascript. Ten en cuenta que se está trabando con un documento (un registro) el cual será insertado dentro de una colección, es diferente trabajar con los métodos de los modelos, los mismos tienen métodos y propiedades diferentes a un documento, la instancia de un documento posee diferentes métodos y propiedades que un modelo.

> Los campos anidados como ```other``` y ```meta``` no tendrán validaciones debido a que no poseen un tipo (type) por lo tanto se debe de gestionar las validaciones por otro medio

Si se desea tener validaciones para campos anidados, se recomienda utilizar **sub-documentos**, que son basicamente esquemas anidados dentro de otros esquemas, más adelante se tocará ese tema.

## Usar los documentos

Para crear instancias de los documentos, es necesario convertirlo a un modelo de la siguiente forma:

```js
const model = model("Blog", blogSchema, {collection: "blogs"});
export default model;
```

De tal forma es posible crear nuevas instancias de los documentos, el último parámetro son las configuraciones de nuestro modelo, mongoose por defecto crea las colecciones de manera plural lo cual podría ser ambiguo en muchos casos, por ello se establece explícitamente que la colección se llamará **blogs**.

## Instancias de los documentos

Para crear un documento pero no guardarlo en una colección, basta con solo instanciar el modelo exportado como si fuese una clase nativa de javascript:

```javascript
import Blog from ".../models/BlogModel"
const blog1 = new Blog({
    // los campos establecidos en el esquema
})
```

Mongoose automaticamente asigna un id único a tu documento recien creado, este id será distinto cada vez que se cree el mismo documento.

Para guardar el documento instanciado sólo basta invocar al método ```save()``` incluido en el [prototipo de los documentos]([Mongoose v6.2.0: API docs (mongoosejs.com)](https://mongoosejs.com/docs/api.html#schema_Schema-add))

## Métodos de instancia

Como su nombre lo indica son métodos que se pueden agregar al prototipo de los documentos y que pueden ser invocados al ser instanciados.

```javascript
 import Animal from "../models/AnimalModel"

 const animalSchema = new Schema({ name: String, type: String });

  // se agrega un nuevo método que busca animales similiares al actual
  animalSchema.methods.findSimilarTypes = function(cb) {
     // es importante no usar un arrow function para conservar el contexto
     // de this.type para referirse al actual documento
     const animals = Animal.find({ type: this.type }, cb);
     return animals;
  };
```

La propiedad `methods` permite anexar nuevos métodos al documento a través de su esquema, como lo comenta el código, es importante usar una función clásica de javascript para mantener el contexto de ``this`` dentro del callback.

Para hacer uso del método recien agregado es tan fácil como invocarlo en un documento instanciado, por ejemplo:

```javascript
  import Animal from "../models/AnimalModel"

  const dog = new Animal({ type: 'dog' });

  dog.findSimilarTypes((err, dogs) => {
    console.log(dogs); // woof
  });
```

## Métodos estáticos

Parecidos a los métodos de instancia con la diferencia de que no es necesario instanciar un documento de un esquema para ser invocados, es decir, sólo es necesario importar el modelo del esquema, ejemplo:

```javascript
//agregar metodos estaticos, no es necesario instanciar un documento
UserSchema.statics.findUsersBySameCity = async function (city) {

// los metodos estaticos tampoco pueden acceder al modelo, por lo tanto
// se invoca un modelo que se haya creado anteriormente
const UserModel = model("User");

// los objetos anidados deben de especificarse su path (su ruta)
const users = await UserModel.find({ "address.city": city });
return users;
};
```

> Métodos estáticos y de instancia no son lo mismo a pesar que parezcan muy similar, el primero no necesita ser instanciado y proviene del propio modelo y el segundo es necesario instanciar un nuevo documento, ambos enfoques usan funciones nativas de javascript para permitir el contexto de ```this```.



## Uso de métodos estáticos y de instancia

Diferencias al usar ambos enfoques, de esta forma se aclara mucho mejor el funcionamiento de estas dos herramientas, ambos métodos permite realizar operaciones sin necesidad de crear helpers o más código dentro de los controladores si se usase un parón de diseño como MCV.

Supongamos que se tiene un método de instancia llamado ``getPassword()`` y otro método estático llamado ``findUsersByCity()``, vamos a implementar el primero, algo así:

```javascript
UserSchema.methods.getPassword = function () {
  return this.password;
};
```

Este método se agrega al esquema (schema structure) y cada vez que se cree un nuevo usuario gracias al esquema tendrá disponible el método `getPassword()` para saber la contraseña, para user este método basta con solo invocarlo al crear el documento:

```javascript
// Instanciar el nuevo documento
const usuario1 = new User({
      name: "Juan",
      surname: "Perez",
      email: "juan@gmail.com",
      password: "juan28001320.",
      adddress: {
        street: "Calle de la calle",
        country: "España",
        city: "Madrid",
        postal_code: 28001,
      },
    });

// invocar el método de instancia
const clave = usuario1.getPassword()
console.log(clave); // juan28001320.
```

Por el contrario al tratar de invocar un método estático es muy diferentes, se podría decir que es más corto y más sencillo de hacer, primero creemos uno:

```javascript
//agregar metodos estaticos, no es necesario instanciar un documento
UserSchema.statics.findUsersByCity = async function (city) {
  // los metodos estaticos tampoco pueden acceder al modelo, por lo tanto
  // se invoca un modelo que se haya creado anteriormente
  const UserModel = model("User");
  // los objetos anidados deben de especificarse su path (su ruta)
  const users = await UserModel.find({ "address.city": city });
  return users;
};
```

Muchas cosas suceden aca, enumeremos:

1. Crear el métodos estático, en este caso necesitamos un valor para poder filtrar determinados usuarios por ciudad.

2. Se llama el modelo de ``User`` para poder realizar las consultas necesarias, al invocarse un método estático se tiene por hecho que ya el modelo se compiló y que por ende ya existe en mongoose.

3. Usamos la consulta ``find()`` para buscar y filtrar un usuario que viva en **city**.

4. Se devuelve el documento.

Para hacer uso de este método estático tan solo es necesario importar el modelo compilado y invocar el método:

```javascript
const User = require("../models/User");
// solo basta con usar el modelo
const usersCity = await User.findUsersByCity("Caracas");

console.log(usersCity);
```
