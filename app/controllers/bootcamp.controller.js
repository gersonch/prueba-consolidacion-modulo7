const { users, bootcamps } = require('../models')
const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

exports.createBootcamp = bootcamp => {
  return Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description
  })
    .then(bootcamp => {
      console.log(`Creando el bootcamp`)
      return bootcamp
    })
    .catch(err => {
      console.error(err)
    })
}

// agregar usuario a bootcamp

exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then(bootcamp => {
      if (!bootcamp) {
        console.log('no se encontro el bootcamp')
        return null
      }
      return User.findByPk(userId).then(user => {
        if (!user) {
          console.log('usuario no encontrado')
          return null
        }
        bootcamp.addUser(user)
        console.log('*****************')
        console.log(
          `>> Agregado el usuario ${user.firstName} al bootcamp ${bootcamp.title}`
        )
        console.log('*****************')
        return bootcamp
      })
    })
    .catch(err => {
      console.error(err)
    })
}

exports.findById = Id => {
  return Bootcamp.findByPk(Id, {
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'firstName'],
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(bootcamp => {
      return bootcamp
    })
    .catch(err => {
      console.error(err)
    })
}

exports.findAll = () => {
  return Bootcamp.findAll({
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'firstName'],
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(bootcamps => {
      return bootcamps
    })
    .catch(err => {
      console.error(err)
    })
}
