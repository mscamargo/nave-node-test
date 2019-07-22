const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username is already in use'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'E-mail is already in use'
      }
    },
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
    title: DataTypes.STRING
  })

  User.addHook('beforeSave', async user => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 10)
    }
  })

  User.associate = models => {
    User.hasMany(models.Post, { as: 'posts' })
  }

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())

    delete values.password
    delete values.password_hash

    return values
  }

  return User
}
