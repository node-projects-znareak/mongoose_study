# Los modelos

Los modelos son el resultado de compilar los esquemas (``schema``) a un constructor que permite crear e instanciar documentos, los mismos permiten ejecutar consultas como son: busquedas, lecturas, escritura y actualización de documentos en las colecciones.



Para crear un modelo, primera se necesita ser compilado con una función que trae mongoose, llamada ``model(name, schema)``, es necesario tener el schema creado y saber el nombre de nuestro modelo:

```javascript
const schema = new mongoose.Schema(
    { 
       name: 'string', 
       size: 'string' 
     }
);
// se compila el schema a un modelo, para luego usar consultas y
// instanciar nuevos documentos y guardarlos en las colecciones
const Tank = mongoose.model('Tank', schema);
export default Tank;
```

> Mongoose por defecto crear colecciones si no existen, el nombre de dichas colecciones es el plural del nombre del modelo, por ejemplo: ``Tank`` será una colección llamada: ``Tanks``, es posible cambiar este comportamiento en las configuraciones del schema.



## Creación de documentos

Como se menciono anteriormente, despues de compilar el schema a un modelo es posible crear nuevos documentos y guardarlo en las colecciones de nuestras bases de datos, para ello solo falta requerir el modelo y crear un nuevo documento, siguiendo el ejemplo anterior:

```javascript
const Tank = require("../models/TankModel")

// instanciar el documento
const tank1 = new Tank({
    name: "T-34",
    size: "9,5m x 4,8m"
})

// tambien es posible usar callbacks al guardar el documento
await tank1.save();
```

También existe otra forma de guardar documentos con la función estática ``create()``:

```javascript
Tank.create(name:"T-34", size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // el documento fue guardado!
});
```

> Los modelos no seran creados ni elminados si no existe una conexión a la base de datos de mongodb, todas estas consultas son almacenadas hasta que la conexión sea estable y pueda ejecutar cada consulta. Cada modelo por defecto usa la conexión por defecta de mongoose.



## Consultas en los modelos

Los modelos permiten ademas de crear otros documentos, ejecutar consultas directas a las colecciones de nuestra base de datos, esto es porque mongoose añade métodos útiles a los modelos con los que es posible hacer consultas de nuestras colecciones.

Ejemplos de algunos métodos de consultas pueden ser:



**Buscar un documento**

```javascript
Tank.find({ size: 'small' })
```

**Eliminar documentos**

```javascript
Tank.deleteOne({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});
```

**Actualizar documentos**

```javascript
Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
  // comprobar errores
});
```

Estos son algunos de los muchos métodos que existen en los modelos para gestionar la información, cada uno posee su parámetros para cambiar sus opciones de como trabajan.
