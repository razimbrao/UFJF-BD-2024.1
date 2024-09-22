'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('partidas', {
      partida_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        allowNull: false
      },
      time_a: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'times',
          key: 'time_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      time_b: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'times',
          key: 'time_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      camp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'campeonatos',
          key: 'camp_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      resultado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('partidas');
  }
};
