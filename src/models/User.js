module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    title: DataTypes.STRING
  })

  User.associate = models => {
    User.hasMany(models.Post, { as: 'posts' })
  }

  return User
}
