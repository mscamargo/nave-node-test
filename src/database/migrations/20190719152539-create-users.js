module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },

      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },

      title: Sequelize.STRING,

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

  down: queryInterface => queryInterface.dropTable('users')
}
