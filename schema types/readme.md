# Schemas Types

Definen la estructura de los campos o **paths** de un esquema de mongoose. Permiten crear validaciones para las consultas y otras características que provee mongoose.

Por lo tanto un `schema type` permite estructurar y definir los tipos de datos asi como su modelado a la hora de la insercción de datos.



> Los tipos de datos que son usados pos los esquemas son los mismo que usa javascript: String, Number, Float, Object, Mixed, Date, Array, Boolean, Schema, Buffer y Map.



Un ejemplo de esto podría ser el siguiente esquema, haciendo uso de todos los tipos de datos:

```javascript
const schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
})
```

En caso de necesitar una propiedad aninada llamada **type** es necesario especeficiar su tipo, esto es debido a que mongoose detectará que se está definiendo el tipo de dato de una propiedad pero que la misma no sea una propiedad como tal

```javascript
const schema = new Schema({
  name: { type: String }, // la propiedad o path "name" es de tipo cadena
  nested: {
    firstName: { type: String }, // tipo cadena
    lastName: { type: String } // tipo cadena
  }
});
```

Pero ¿qué pasaría si se necesitara una propiedad **type** que no defina el tipo, sino que actue de campo o una propiedad del schema?

Es necesario definirle el tipo a dicha propiedad:

```javascript
const holdingSchema = new Schema({
  asset: {
    // type actua ahora como una propiedad más del esquema
    type: { type: String }, // de tipo cadena
    ticker: String
  }
});
```

## Lista de los tipos de esquemas

Se listara los propiedades más usadas para definir el modelado de los campos o **paths** de los esquemas de mongoose:

**Propiedades génericas**

- `required` define que un **path** o campo es obligatorio, se puede usar un booleano un arreglo para definir el mensaje de error.

- `type` define el tipo de dato para el **path** o propiedad.

- `default` define el valor por defecto que tiene el campo o **path** puede ser una función o un valor literal.

- `select` define que campos deben aparecer a la hora de realizar las consultas, es un booleano.



**Índices**

- `index` define un índice del campo al que se le aplica esta propiedad.

- `unique` define que el campo no debe repetirse, que sea unico de lo contrario arroja una excepción.
  
  

**Cadenas**

- `lowercase` transforma el campo a minúsculas.

- `uppercase` transforma el campo a mayúsculas.

- `trim` remueve los espacios iniciales y finales del campo.

- `macth` validador que permite comprobar si la expresión regular coincide con el valor del campo.

- `enum` un array que permite validar si el valor existe dentro del conjunto del array.

- `minLength` define un validador que establece la cantidad mínima de carácteres permitidos.

- `maxLength`  define un validador que establece la cantidad máxima de carácteres permitidos.



**Números**

- `min` valor mínimo que debe tener el camp.

- `max` valor máximo que debe tener el campo.

- `enum` array que valida si el valor esta entre el grupo del arreglo.



**Fechas**

- `min` fecha mínima

- `max` fecha máxima
