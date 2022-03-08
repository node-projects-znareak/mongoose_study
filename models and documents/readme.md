# Los modelos y documentos

Los modelos y los documentos son clases diferentes, sin embargo la clase modelo es una subclase de la clase documento, en pocas palabras, cuando se hace uso del constructor de un modelo se está creando un documento nuevo. Ejemplo:

```javascript
const Model = require("../models/MyModel")

const doc = new Model({/*...*/});

doc instanceof MyModel; // true
doc instanceof mongoose.Model; // true
doc instanceof mongoose.Document; // true
```

> La creación de un nuevo documento basicamente es la instanciación de un modelo ya compilado, por ejemplo `MyModel` es un modelo y la variable `doc` es un documento para ser insertado en una colección.

## Actualizar usando `save()`

Es posible actualizar un documento utilizando la misma instancia y guardándolo como si se fuese a insertar de nuevo, por ejemplo:

```javascript
doc.name = 'foo';
// mongoose envia una update automaticamente al modelo
// el cual se reflerará en la base de datos
await doc.save();
```

Mongoose hace un seguimiento de los cambios de un documento, por lo tanto al detectar estos cambios automaticamente llamará a los métodos de actualización a través de los operadores de actualización para ejecutar los cambios del modelo.

Por lo tanto un ejemplo completo sencillo sería:

```javascript
Boleta.findOne({
  serie: req.params.id
})
.then((boleta) => {
  boleta.firma = req.params.firma;
  boleta
    .save()
    .then(() => {
      console.log("updated!")
    });
});
```

Se busca un registro para después editarlo directamente por medio del documento.

Con el método `save()` se tiene una validación completa de mongoose a través de los middlewares y las validaciones dadas en el esquema. Métodos como: *`update()`, `updateMany()`, `findOneAndUpdate()`* no poseen dichas validaciones.



## Eliminar un documento

Si mongoose no encuentra el documento con el `id` dado, este lanzará un error:

```javascript
const doc = await MyModel.findOne();

// Eliminar el documento, al tratar de actualizarlo, la referecia
// del mismo no existe, arroja un error
await MyModel.deleteOne({ _id: doc._id });

doc.name = 'foo';
await doc.save(); // Throws DocumentNotFoundError
```

## Reemplazar todo un documento

Reemplazar un documento es agregar y eliminar varios campos del mismo, se realiza por medio del método `replaceOne(filter, newFields)`, ejemplo de esto eso:

```javascript
await User.replaceOne(
    { _id: "621d68378e1b77ab38b7c464" },
    { name: "Editado!" } // el usuario sólo tendrá un campo "name"
);
console.log(user);
```

Eliminará todas los campos de dicho documento a excepción de los campos con valores por defecto, agregará los nuevos campos del segundo parámetro.
