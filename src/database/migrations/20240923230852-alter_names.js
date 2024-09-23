'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.renameTable('usuarios', 'usuario');
    await queryInterface.renameTable('times', 'time');
    await queryInterface.renameTable('campeonatos', 'campeonato');
    await queryInterface.renameTable('jogadores', 'jogador');
    await queryInterface.renameTable('partidas', 'partida');
    await queryInterface.renameTable('times_campeonatos', 'time_campeonato');
  },

  async down (queryInterface) {
    await queryInterface.renameTable('usuario', 'usuarios');
    await queryInterface.renameTable('time', 'times');
    await queryInterface.renameTable('campeonato', 'campeonatos');
    await queryInterface.renameTable('jogador', 'jogadores');
    await queryInterface.renameTable('partida', 'partidas');
    await queryInterface.renameTable('time_campeonato', 'times_campeonatos');
  }
};
