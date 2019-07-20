module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      text: {
        allowNull: false,
        type: Sequelize.STRING(140)
      },

      user_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,

        references: {
          model: 'users',
          key: 'id'
        }
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

  down: queryInterface => queryInterface.dropTable('posts')
}
