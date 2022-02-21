# Opciones de los esquemas

Los schemas tiene varias opciones de configuración, sólo se mostrarán las más importantes y útiles propiedades para configurar los esquemas.

El segundo parametro del esquema son las configuraciones del mismo:

```javascript
const { Schema, model } = require("mongoose");
const schema = new Schema({}, options);
```

Las propiedades más importantes se listan a continuación:

- ``collection`` permirte especificar explicitamente el nombre de una colección
  
  ```javascript
  const schema = new Schema({..}, { collection: 'data' });
  ```

- ``_id`` permite especificar si mongoose agregará un campo ``_id`` en el documento, si es **falso** no agregará un campo ``_id``, sin embargo no será posible guardar el documento, debido a que es requerido un identificador único por documento, mongoose arrojará un error en su lugar
  
  ```javascript
  const schema = new Schema({ name: String }, { _id: false });
  ```

- ``timestamps`` permite especificar la fecha de creación y última actualización del documento al ser creado, es una opción muy útil ya que nos ahorra hacer esta lógica manualmente, puede ser un booleano o un objeto especificando el nombre de las propiedades
  
  ```javascript
  const schema= new Schema({..}, { 
    timestamps: { 
       createdAt: 'created_at' // tambien puede ser true
    }
  });
  ```

```

```
