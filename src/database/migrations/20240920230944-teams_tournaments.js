'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams_tournaments', {
      team_id: {
        type: Sequelize.UUID, // Mudar para UUID
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        primaryKey: true
      },
      tournament_id: {
        type: Sequelize.UUID, // Mudar para UUID
        allowNull: false,
        references: {
          model: 'tournaments',
          key: 'id'
        },
        primaryKey: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('teams_tournaments');
  }
};
