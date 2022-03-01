# Los modelos y documentos

Los modelos y los documentos son clases diferentes, sin embargo la clase modelo es una subclase de la clase documento, en pocas palabras, cuando se hace uso del constructor de un modelo se está creando un documento nuevo. Ejemplo:

```javascript
const model = require("../models/MyModel")

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
