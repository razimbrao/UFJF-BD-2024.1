'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn('jogadores', 'team_id', 'time_id');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn('jogadores', 'time_id', 'team_id');
  }
};
