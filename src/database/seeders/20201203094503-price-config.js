'use strict';

/**
 * Insert data in "PriceConfig" table
 */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('PriceConfig', [
			{
				price: 3,
				name: '10 minutes',
				value: 10,
				priceId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				price: 5,
				name: '20 minutes',
				value: 20,
				priceId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				price: 3,
				name: '10 minutes',
				value: 10,
				priceId: '4d40de8f-68f8-4160-a83a-665dbc92d154',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				price: 5,
				name: '20 minutes',
				value: 20,
				priceId: '4d40de8f-68f8-4160-a83a-665dbc92d154',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				price: 15,
				name: '60 minutes',
				value: 60,
				priceId: '4d40de8f-68f8-4160-a83a-665dbc92d154',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				price: 15,
				name: '60 minutes',
				value: 60,
				priceId: '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('', null, {});
	}
};
