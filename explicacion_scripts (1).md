
# Explicación de los Scripts

## 1. authenticateDB.js
Este archivo establece la conexión a la base de datos utilizando Sequelize.

```javascript
// Importamos Sequelize desde el paquete sequelize
const { Sequelize } = require('sequelize');

// Configuramos la instancia de Sequelize con los detalles de la base de datos
const sequelize = new Sequelize('db_node', 'postgres', '157015', {
  host: 'localhost',  // Dirección del servidor de la base de datos
  port: 5432,         // Puerto estándar de PostgreSQL
  dialect: 'postgres', // Especificamos que usamos PostgreSQL como dialecto
  pool: {
    max: 5,           // Número máximo de conexiones
    min: 0,           // Número mínimo de conexiones
    acquire: 30000,   // Tiempo máximo en milisegundos para obtener una conexión
    idle: 10000       // Tiempo que una conexión debe estar inactiva antes de ser liberada
  }
});

// Exportamos la instancia de sequelize para usarla en otros archivos
module.exports = sequelize;
```

## 2. User.js
Define el modelo de usuario para la base de datos.

```javascript
// Importamos Sequelize y la instancia de sequelize
const Sequelize = require('sequelize');
const db = require('./authenticateDB');

// Definimos el modelo User
const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false // El nombre no puede ser nulo
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false // La edad no puede ser nula
  }
});

// Exportamos el modelo User para usarlo en otros archivos
module.exports = User;
```

## 3. createUsers.js
Crea la tabla `users` en la base de datos.

```javascript
// Requerimos el modelo User y la instancia de sequelize
const sequelize = require('./authenticateDB');
const User = require('./User');

// Procedemos a crear la tabla users
User.sync()
  .then(() => {
    console.log('Nueva tabla users ha sido creada');
  })
  .catch(error => {
    console.error('Error al crear la tabla users:', error);
  })
  .finally(() => {
    sequelize.close()
      .then(() => console.log('Conexión cerrada'))
      .catch(error => console.error('Error al cerrar la conexión:', error));
  });
```

## 4. queryUser.js
Consulta información de los usuarios en la base de datos.

```javascript
const sequelize = require('./authenticateDB');
const User = require('./User');

// Función para encontrar y mostrar todos los usuarios
async function findAllRows() {
  const users = await User.findAll({
    raw: true // Devuelve solo los datos sin instancias de modelo
  });
  console.table(users); // Muestra los datos en forma de tabla
  sequelize.close();
}

// Llamamos a la función para ejecutar la consulta
findAllRows();
```

## 5. createInstance.js
Crea instancias de usuarios en la base de datos.

```javascript
const sequelize = require('./authenticateDB');
const User = require('./User');

// Crear varios usuarios
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 22 },
  { name: 'Diana', age: 28 },
  { name: 'Eve', age: 35 }
];

// Usamos bulkCreate para crear múltiples instancias de usuarios
User.bulkCreate(users, {
  validate: true // Validar las instancias antes de guardarlas
})
  .then(() => {
    console.log('Usuarios creados');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });
```

## Resumen de la estructura
- **authenticateDB.js**: Configuración de la conexión a la base de datos.
- **User.js**: Definición del modelo de datos de usuario.
- **createUsers.js**: Creación de la tabla `users`.
- **queryUser.js**: Consulta para obtener y mostrar datos de usuarios.
- **createInstance.js**: Creación de uno o varios usuarios en la base de datos.

## Buenas prácticas y recomendaciones
- **Manejo de errores**: Asegúrate de manejar los errores en cada paso, como lo haces en tus scripts, para evitar que el programa se detenga inesperadamente.
- **Comentarios**: Continúa usando comentarios para aclarar cada parte del código, como lo has hecho, para que sea más fácil de entender.
- **Modularidad**: Mantén los archivos separados por funcionalidad, como lo has hecho, para facilitar el mantenimiento y la legibilidad.

## Estructura de Archivos

Para organizar tu aplicación de manera modular, puedes dividir los archivos en las siguientes carpetas y crear un archivo `server.js`:

```
/mi-proyecto
│
├── /config
│   └── authenticateDB.js     // Configuración de la conexión a la base de datos
│
├── /models
│   └── User.js               // Definición del modelo de usuario
│
├── /controllers
│   ├── createUsers.js        // Lógica para crear la tabla de usuarios
│   ├── queryUser.js          // Lógica para consultar usuarios
│   └── createInstance.js     // Lógica para crear instancias de usuarios
│
└── server.js                 // Punto de entrada de la aplicación
```

### Descripción de cada archivo

1. **/config/authenticateDB.js**: Este archivo contiene la configuración de la conexión a la base de datos utilizando Sequelize. No hay cambios necesarios en su contenido.

2. **/models/User.js**: Define el modelo de datos de usuario. Este archivo tampoco requiere cambios.

3. **/controllers/createUsers.js**: Contiene la lógica para crear la tabla de usuarios en la base de datos.

   ```javascript
   const sequelize = require('../config/authenticateDB');
   const User = require('../models/User');

   User.sync()
     .then(() => {
       console.log('Nueva tabla users ha sido creada');
     })
     .catch(error => {
       console.error('Error al crear la tabla users:', error);
     })
     .finally(() => {
       sequelize.close()
         .then(() => console.log('Conexión cerrada'))
         .catch(error => console.error('Error al cerrar la conexión:', error));
     });
   ```

4. **/controllers/queryUser.js**: Contiene la lógica para consultar información de usuarios en la base de datos.

   ```javascript
   const sequelize = require('../config/authenticateDB');
   const User = require('../models/User');

   async function findAllRows() {
     const users = await User.findAll({
       raw: true
     });
     console.table(users);
     sequelize.close();
   }

   findAllRows();
   ```

5. **/controllers/createInstance.js**: Contiene la lógica para crear instancias de usuarios en la base de datos.

   ```javascript
   const sequelize = require('../config/authenticateDB');
   const User = require('../models/User');

   const users = [
     { name: 'Alice', age: 25 },
     { name: 'Bob', age: 30 },
     { name: 'Charlie', age: 22 },
     { name: 'Diana', age: 28 },
     { name: 'Eve', age: 35 }
   ];

   User.bulkCreate(users, {
     validate: true
   })
     .then(() => {
       console.log('Usuarios creados');
     })
     .catch(err => {
       console.error(err);
     })
     .finally(() => {
       sequelize.close();
     });
   ```

6. **server.js**: Este archivo actúa como punto de entrada de la aplicación. Aquí puedes importar y ejecutar los scripts de los controladores.

   ```javascript
   const createUsers = require('./controllers/createUsers');
   const queryUser = require('./controllers/queryUser');
   const createInstance = require('./controllers/createInstance');

   // Aquí puedes llamar a las funciones de los controladores
   // createUsers(); // Descomentar para crear la tabla de usuarios
   // queryUser(); // Descomentar para consultar los usuarios
   // createInstance(); // Descomentar para crear instancias de usuarios
   ```
