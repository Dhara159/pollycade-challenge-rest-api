import { Price, PriceConfig } from './../../database/models';
import handleError from './../../helpers/errorHandler';

import { default_pricing } from './../../../prices.json';

export default class PriceController {

	/**
	* Get all of the pricing models available for the system
	* @param {*} ctx
	* @returns all of the pricing models available for the system with price configurations
	*/
	static async getPriceModels (ctx) {
		await handleError({
			tryFunc: async () => {
				const includeArr = [{ model: PriceConfig, as: 'priceConfigs' }];
				const priceList = await Price.getAllPriceModels(includeArr);

				const defaultPrice = { defaultPriceConfigs: default_pricing };

				ctx.status = 200;
				ctx.body = {
					success: true,
					data: [...priceList, defaultPrice ]
				};
			}, ctx
		});
	}

	/**
	* Create a new pricing model in the system
	* @param {*} ctx.request.body New price model details
	* @returns Id of the new created price model
	*/
	static async createPricingModel (ctx) {
		await handleError({
			tryFunc: async () => {
				const { name, priceId, pricing: { price, name: pricingName, value} } = ctx.request.body;

				const createObj = {
					id: priceId,
					name,
					priceConfigs: {
						price,
						name: pricingName,
						value
					}
				};
				const includeArr = [ { model: PriceConfig, as: 'priceConfigs' } ];
				const isPriceModelCreated = await Price.createNewPriceModel(createObj, includeArr);

				ctx.assert(isPriceModelCreated, 500, 'Oops! Something went wrong. Could not add new pricing model');

				ctx.status = 200;
				ctx.body = {
					success: true,
					data: {priceModelId: isPriceModelCreated.id}
				};
			}, ctx
		});
	}

	/**
	* Get an individual pricing model
	* @param {*} ctx.params.pmId Id of price model
	* @returns Price model found for given id
	*/
	static async getPricingModel (ctx) {
		await handleError({
			tryFunc: async () => {
				const {pmId} = ctx.params;

				const includeArr = [ { model: PriceConfig, as: 'priceConfigs' } ];
				const priceModel = await Price.findPriceByPk(pmId, includeArr);

				ctx.assert(priceModel, 404, 'Pricing Model not found for given Id');

				ctx.status = 200;
				ctx.body = {
					success: true,
					data: priceModel
				};
			}, ctx
		});
	}

	/**
	* Updates an existing pricing model meta-data
	* @param {*} ctx.params.pmId Id of price model
	* @param {*} ctx.request.body Data to be updated in price model
	* @returns Success message
	*/
	static async updatePricingModel (ctx) {
		await handleError({
			tryFunc: async () => {

				const { body } = ctx.request;
				const { pmId } = ctx.params;

				const priceModel = await Price.findPriceByPk(pmId);

				ctx.assert(priceModel, 404, 'Pricing Model not found for given Id');

				const updatedPriceModel = await Price.updatePrice({
					...body
				}, { id: pmId} );

				ctx.assert(updatedPriceModel, 400, 'Could not update pricing model. Please try again');

				ctx.status = 200;
				ctx.body = {
					success: true,
					data: 'Pricing model updated successfully'
				};
			}, ctx
		});
	}
}
