const db = require('./app/models')
const userController = require('./app/controllers/user.controller.js')
const bootcampController = require('./app/controllers/bootcamp.controller.js')

const run = async () => {
  // crear Usuarios
  const user1 = await userController.createUser({
    firstName: 'Mateo',
    lastName: 'Díaz',
    email: 'mateo.diaz@correo.com'
  })

  const user2 = await userController.createUser({
    firstName: 'Santiago',
    lastName: 'Mejías',
    email: 'santiago.mejias@correo.com'
  })

  const user3 = await userController.createUser({
    firstName: 'Lucas',
    lastName: 'Rojas',
    email: 'lucas.rojas@correo.com'
  })

  const user4 = await userController.createUser({
    firstName: 'Facundo',
    lastName: 'Fernandez',
    email: 'facundo.fernandez@correo.com'
  })

  // crear bootcamps

  const bootcamp1 = await bootcampController.createBootcamp({
    title: 'Introduciendo El Bootcamp De React',
    cue: 10,
    description:
      'React es la librería más usada en JavaScript para el desarrollo de interfaces.'
  })

  const bootcamp2 = await bootcampController.createBootcamp({
    title: 'Bootcamp Desarrollo Web Full Stack',
    cue: 12,
    description:
      'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, NodeJS, Angular, MongoDB, ExpressJS.'
  })

  const bootcamp3 = await bootcampController.createBootcamp({
    title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
    cue: 18,
    description:
      'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning .'
  })

  // añadir usuario a bootcamp
  await bootcampController.addUser(bootcamp1.id, user1.id)
  await bootcampController.addUser(bootcamp1.id, user2.id)
  await bootcampController.addUser(bootcamp2.id, user1.id)
  await bootcampController.addUser(bootcamp3.id, user1.id)
  await bootcampController.addUser(bootcamp3.id, user2.id)
  await bootcampController.addUser(bootcamp3.id, user3.id)

  // encontrar por id los bootcamps
  const _bootcamp1 = await bootcampController.findById(bootcamp1.id)
  console.log('bootcamp', JSON.stringify(_bootcamp1, null, 2))

  // encontrar todos los bootcamps
  const bootcamps = await bootcampController.findAll()
  console.log(' Bootcamps ', JSON.stringify(bootcamps, null, 2))

  // encontrar ususario por id
  const _user = await userController.findUserById(user3.id)
  console.log(' user1 ', JSON.stringify(_user, null, 2))

  // encontrar todos los usuarios
  const users = await userController.findAll()
  console.log('usuarios', JSON.stringify(users, null, 2))

  // eliminar usuario por id
  const deletedUser = await userController.eliminateUserById(user4.id)
  console.log('eliminado usuario', JSON.stringify(deletedUser, null, 2))
}

db.sequelize.sync({ force: true }).then(() => {
  console.log('Sincronizando base de datos')
  run()
})
