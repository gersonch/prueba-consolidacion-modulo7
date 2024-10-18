const { users } = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

exports.createUser = user => {
  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })
    .then(user => {
      console.log(
        `>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`
      )
      return user
    })
    .catch(err => {
      console.error(err)
    })
}

exports.findUserById = userId => {
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamp,
        as: 'bootcamps',
        attributes: ['id', 'title'],
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(users => {
      return users
    })
    .catch(err => {
      console.error(err)
    })
}

exports.findAll = () => {
  return User.findAll({
    include: [
      {
        model: Bootcamp,
        as: 'bootcamps',
        attributes: ['id', 'title'],
        through: {
          attributes: []
        }
      }
    ]
  })
    .then(users => {
      return users
    })
    .catch(err => {
      console.error(err)
    })
}

exports.eliminateUserById = id => {
  return User.destroy({
    where: {
      id
    }
  })
    .then(users => {
      return users
    })
    .catch(err => {
      console.error(err)
    })
}
