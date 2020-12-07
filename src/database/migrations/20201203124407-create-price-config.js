'use strict';

/**
 * Create new "PriceConfig" table
 */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('PriceConfig', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.INTEGER
			},
			priceId: {
				type: Sequelize.STRING,
				references: {
					model: 'Price',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			value: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable('PriceConfig');
	}
};
