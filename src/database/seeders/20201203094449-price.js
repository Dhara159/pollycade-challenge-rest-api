'use strict';

/**
 * Insert data in "Price" table
 */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Price',
			[
				{
					id: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
					name: 'Super Value Option',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: '4d40de8f-68f8-4160-a83a-665dbc92d154',
					name: 'Default',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e',
					name: 'Long Play',
					createdAt: new Date(),
					updatedAt: new Date()
				}

			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => (
		await queryInterface.bulkDelete('Price', null, {})
	)
};
