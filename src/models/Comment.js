module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING
  })

  Comment.associate = models => {
    Comment.belongsTo(models.Post, { as: 'post', foreignKey: 'post_id' })
    Comment.belongsTo(models.User, { as: 'owner', foreignKey: 'user_id' })
  }

  return Comment
}
