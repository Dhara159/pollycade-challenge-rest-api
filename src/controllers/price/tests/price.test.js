import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import server from './../../../index';

const PREFIX = '/pricing-models';

describe('Machine endpoints testing', () => {
	/**
	 * GET /pricing-models
	 */
	describe('Get all price models', () => {
		it('Should get all price models and configurations', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/`);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toBeTruthy();

			expect.assertions(3);
			done();

		});

		it('Should include default pricing in data', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/`);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data[response.body.data.length - 1].defaultPriceConfigs).toBeTruthy();

			expect.assertions(3);
			done();

		});
	});

	/**
	 * POST /pricing-models
	 */
	describe('Create new pricing model', () => {
		it('Should create new pricing model', async (done) => {
			const newPriceId = uuidv4();
			const pricingModel = {
				name: 'New price model',
				priceId: newPriceId,
				pricing: {
					price: 2,
					name: 'New price configuration',
					value: 2
				}
			};

			const response = await request(server.listen()).post(`${PREFIX}/`).send(pricingModel);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data.priceModelId).toEqual(newPriceId);

			expect.assertions(3);
			done();
		});
	});

	/**
	* GET /pricing-models/:pm-id
  */
	describe('Get pricing model for given Id', () => {
		const priceId = '3ba92095-3203-4888-a464-3c7d5d9acd7e';
		const invalidPriceId = uuidv4();

		it('Should get pricing model and configuration', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/${priceId}`);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toBeTruthy();

			expect.assertions(3);
			done();
		});

		it('Should return pricing model not found', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/${invalidPriceId}`);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.data).toBeFalsy();
			expect(response.body.message).toEqual('Pricing Model not found for given Id');

			expect.assertions(4);
			done();
		});
	});

	/**
	* PUT /pricing-models/:pm-id
  */
	describe('Update pricing modal', () => {
		const priceId = '3ba92095-3203-4888-a464-3c7d5d9acd7e';
		const invalidPriceId = uuidv4();
		const name = 'Super Value Option Updated';

		it('Should update pricing model name', async (done) => {
			const response = await request(server.listen()).put(`${PREFIX}/${priceId}`).send({ name });

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toEqual('Pricing model updated successfully');

			expect.assertions(3);
			done();
		});

		it('Should return pricing model not found', async (done) => {
			const response = await request(server.listen()).put(`${PREFIX}/${invalidPriceId}`).send({ name });

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Pricing Model not found for given Id');

			expect.assertions(3);
			done();
		});
	});

	afterAll(async () => {
		await server.close();
		console.log('server closed!');
	});
});
