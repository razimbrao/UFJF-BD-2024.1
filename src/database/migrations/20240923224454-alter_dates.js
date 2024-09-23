'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // Remover createdAt e updatedAt de todas as tabelas
    await queryInterface.removeColumn('usuarios', 'created_at');
    await queryInterface.removeColumn('usuarios', 'updated_at');

    await queryInterface.removeColumn('times', 'created_at');
    await queryInterface.removeColumn('times', 'updated_at');

    await queryInterface.removeColumn('campeonatos', 'created_at');
    await queryInterface.removeColumn('campeonatos', 'updated_at');

    await queryInterface.removeColumn('jogadores', 'created_at');
    await queryInterface.removeColumn('jogadores', 'updated_at');

    await queryInterface.removeColumn('partidas', 'created_at');
    await queryInterface.removeColumn('partidas', 'updated_at');

    await queryInterface.removeColumn('times_campeonatos', 'created_at');
    await queryInterface.removeColumn('times_campeonatos', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
    // Reverter as alterações, adicionando as colunas novamente
    await queryInterface.addColumn('usuarios', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('usuarios', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });

    await queryInterface.addColumn('times', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('times', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });

    await queryInterface.addColumn('campeonatos', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('campeonatos', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });

    await queryInterface.addColumn('jogadores', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('jogadores', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });

    await queryInterface.addColumn('partidas', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('partidas', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });

    await queryInterface.addColumn('times_campeonatos', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
    await queryInterface.addColumn('times_campeonatos', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
  }
};
