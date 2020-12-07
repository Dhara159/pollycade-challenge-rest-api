'use strict';

/**
 * Create new "Machine" table
 */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Machine', {
			id: {
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
				type: Sequelize.STRING
			},
			name: {
				type: Sequelize.STRING
			},
			priceId: {
				allowNull: true,
				type: Sequelize.STRING,
				references: {
					model: 'Price',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Machine');
	}
};
