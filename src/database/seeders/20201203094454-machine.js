'use strict';

/**
 * Insert data in "Machine" table
 */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Machine', [{
			id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
			name: 'Machine 1',
			priceId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: '4111947a-6c58-4977-90fa-2caaaef88648',
			name: 'Machine 2',
			priceId: null,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: '57342663-909c-4adf-9829-6dd1a3aa9143',
			name: 'Machine 3',
			priceId: '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: '5632e1ec-46cb-4895-bc8b-a91644568cd5',
			name: 'Machine 4',
			priceId: '4d40de8f-68f8-4160-a83a-665dbc92d154',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Machine', null, {});
	}
};
