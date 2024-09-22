'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // Primeiro, remova a chave estrangeira existente
    await queryInterface.removeConstraint('times_campeonatos', 'times_campeonatos_time_id_fkey');

    // Em seguida, adicione a chave estrangeira novamente com a exclusão em cascata
    await queryInterface.addConstraint('times_campeonatos', {
      fields: ['time_id'],
      type: 'foreign key',
      name: 'times_campeonatos_time_id_fkey', // Nome da chave estrangeira
      references: {
        table: 'times',
        field: 'time_id'
      },
      onDelete: 'CASCADE', // Adiciona a exclusão em cascata
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface) {
    // Para desfazer a migração, remova a chave estrangeira novamente
    await queryInterface.removeConstraint('times_campeonatos', 'times_campeonatos_time_id_fkey');

    // E adicione a chave estrangeira sem a exclusão em cascata
    await queryInterface.addConstraint('times_campeonatos', {
      fields: ['time_id'],
      type: 'foreign key',
      name: 'times_campeonatos_time_id_fkey',
      references: {
        table: 'times',
        field: 'time_id'
      },
      onDelete: 'RESTRICT', // Comportamento padrão sem exclusão em cascata
      onUpdate: 'CASCADE'
    });
  }
};
