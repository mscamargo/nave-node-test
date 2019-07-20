module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: DataTypes.STRING
  })

  Post.associate = models => {
    Post.belongsTo(models.User, { as: 'owner', foreignKey: 'user_id' })
    Post.hasMany(models.Comment, { as: 'comments' })
  }

  return Post
}
