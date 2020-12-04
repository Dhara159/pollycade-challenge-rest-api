import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import server from './../../../index';

const PREFIX = '/machines';

describe('Machine endpoints testing', () => {
	/**
	 * GET /machines/:machine-id/prices
   */
	describe('Get price model and configurations for given machine', () => {
		let machineId = '99ade105-dee1-49eb-8ac4-e4d272f89fba';
		let invalidMachineId = uuidv4();

		it('Should get price model and configurations', async (done) => {
			const response = await request(server.listen()).get(
				`${PREFIX}/${machineId}/prices`
			);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toBeTruthy();

			expect.assertions(3);
			done();
		});

		it('Should return machine not found', async (done) => {
			const response = await request(server.listen()).get(
				`${PREFIX}/${invalidMachineId}/prices`
			);
			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Machine not found for given Id');

			expect.assertions(3);
			done();

		});
	});

	/**
	 * PUT /machines/:machine-id/prices/:pm-id
	 */
	describe('Set price model for given machine', () => {
		const machineId = '4111947a-6c58-4977-90fa-2caaaef88648';
		const priceId = '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e';
		const invalidMachineId = uuidv4();
		const invalidPriceId = uuidv4();

		it('Should set price model', async (done) => {
			const response = await request(server.listen()).put(
				`${PREFIX}/${machineId}/prices/${priceId}`
			);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toEqual('Price model Id set successfully for given machine');

			expect.assertions(3);
			done();
		});

		it('Should return machine not found', async (done) => {
			const response = await request(server.listen()).put(
				`${PREFIX}/${invalidMachineId}/prices/${priceId}`
			);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Machine not found for given Id');

			expect.assertions(3);
			done();
		});

		it('Should return machine not found', async (done) => {
			const response = await request(server.listen()).put(
				`${PREFIX}/${machineId}/prices/${invalidPriceId}`
			);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Pricing Model not found for given Id');

			expect.assertions(3);
			done();
		});
	});

	/**
	 * DELETE /machines/:machine-id/prices/:pm-id
   */
	describe('Unset price model for given machine', () => {
		const machineId = '4111947a-6c58-4977-90fa-2caaaef88648';
		const priceId = '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e';
		const invalidMachineId = uuidv4();

		it('Should unset price model', async (done) => {
			const response = await request(server.listen()).delete(
				`${PREFIX}/${machineId}/prices/${priceId}`
			);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toEqual('Price model Id removed successfully for given machine');

			expect.assertions(3);
			done();
		});

		it('Should return machine not found', async (done) => {
			const response = await request(server.listen()).delete(
				`${PREFIX}/${invalidMachineId}/prices/${priceId}`
			);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Machine not found for given Id');

			expect.assertions(3);
			done();
		});
	});

	afterAll(async () => {
		await server.close();
	});

});
