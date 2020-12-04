import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import server from './../../../index';

const PREFIX = '/pricing-models';
const POSTFIX = 'prices';

describe('Price configurations endpoints testing', () => {
	/**
   * GET /pricing-models/:pm-id/price
   */
	describe('Get price config for given price model Id', () => {
		const priceId = '3ba92095-3203-4888-a464-3c7d5d9acd7e';
		const invalidPriceId = uuidv4();

		it('Should get price configurations', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/${priceId}/${POSTFIX}`);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toBeTruthy();
			expect(response.body.data.length).toBe(2);

			expect.assertions(4);
			done();

		});

		it('Should return price model not found', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/${invalidPriceId}/${POSTFIX}`);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Pricing Model not found for given Id');

			expect.assertions(3);
			done();

		});
	});

	/**
   * POST /pricing-models/:pm-id/prices
   */
	describe('Create new price configuration', () => {
		const priceId = '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e';
		const invalidPriceId = uuidv4();

		it('Should create new price configuration', async (done) => {
			const newPriceConfig = {
				name: 'New price configuration',
				value: 10,
				price: 10
			};

			const response = await request(server.listen()).post(`${PREFIX}/${priceId}/${POSTFIX}`).send(newPriceConfig);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toEqual('New pricing configurations added successfully');

			expect.assertions(3);
			done();
		});

		it('Should return price model not found', async (done) => {
			const response = await request(server.listen()).get(`${PREFIX}/${invalidPriceId}/${POSTFIX}`);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Pricing Model not found for given Id');

			expect.assertions(3);
			done();

		});
	});

	/**
   * DELETE /pricing-models/:pm-id/prices/:price-id
   */
	describe('Remove Price Configurations', () => {
		const priceId = '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e';
		const invalidPriceId = uuidv4();
		const priceConfigId = 1;
		const invalidPriceConfig = 50;

		it('Should remove price configuration', async (done) => {

			const response = await request(server.listen()).delete(`${PREFIX}/${priceId}/${POSTFIX}/${priceConfigId}`);

			expect(response.status).toEqual(200);
			expect(response.body.success).toBeTruthy();
			expect(response.body.data).toEqual('Pricing Configuration deleted successfully');

			expect.assertions(3);
			done();
		});

		it('Should return price configuration not found', async (done) => {
			const response = await request(server.listen()).delete(`${PREFIX}/${priceId}/${POSTFIX}/${invalidPriceConfig}`);

			expect(response.status).toEqual(404);
			expect(response.body.success).toBeFalsy();
			expect(response.body.message).toEqual('Pricing configurations not found for given Id');

			expect.assertions(3);
			done();

		});

		it('Should return price model not found', async (done) => {
			const response = await request(server.listen()).delete(`${PREFIX}/${invalidPriceId}/${POSTFIX}/${priceConfigId}`);

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
