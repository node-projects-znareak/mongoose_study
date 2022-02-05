# Los esquemas

Los esquemas son un tipo de clase que permite estructurar tu modelo de tabla (colecciones) de mongodb. Los esquemas poseen una sintaxis para ser creados parecidos a los objetos nativos de javascript, opciones de configuración y se complementan con los modelos.

Un ejemplo, un esquema para un blog de una página que contiene los campos más comunes. Un esquema a su vez, en sus keys o campos pueden tener objetos anidados que a su vez podria tener más objetos sucesivamente.

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

La propiedad **meta** y **other** son considerados objetos planos de javascript debido a que no poseen un tipo (type) definido por mongoose, por lo tanto son tomados como campos. 

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

La propiedad `methods` permite anexar nuevos métodos al documento a través de su esquema, como lo comenta el código es importante usar una función clásica de javascript para mantener el contexto de ``this`` dentro de la función.

Para hacer uso del método recien agregado es tan fácil como invocarlo en un documento instanciado, por ejemplo:

```javascript
  import Animal from "../models/AnimalModel"
  
  const dog = new Animal({ type: 'dog' });

  dog.findSimilarTypes((err, dogs) => {
    console.log(dogs); // woof
  });
```


