'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('players', 'team_id');
    await queryInterface.addColumn('players', 'team_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('players', 'team_id');
    await queryInterface.addColumn('players', 'team_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
