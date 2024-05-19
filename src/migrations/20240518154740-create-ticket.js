'use strict';

const { Enums } = require("../utils/common");
const { PENDING, SUCCESS, FAILED } = Enums.BOOKING_STATUS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      recipientEmail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [PENDING, SUCCESS, FAILED],
        defaultValue: PENDING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};