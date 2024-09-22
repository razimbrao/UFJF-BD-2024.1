'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('times_campeonatos', {
      time_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'times',
          key: 'time_id'
        },
        primaryKey: true
      },
      camp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'campeonatos',
          key: 'camp_id'
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
    await queryInterface.dropTable('times_campeonatos');
  }
};
