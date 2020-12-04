import { Price, PriceConfig } from './../../database/models';
import handleError from './../../helpers/errorHandler';

import { default_pricing } from './../../../prices.json';

/**
 * Get all of the pricing models available for the system
 * @param {*} ctx
 * @returns all of the pricing models available for the system with price configurations
 */
export const getPriceModels = async ctx => {
	await handleError({
		tryFunc: async () => {
			const priceList = await Price.findAll({ include: [ { model: PriceConfig, as: 'priceConfigs' } ] });

			const defaultPrice = {
				defaultPriceConfigs: default_pricing
			};

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: [...priceList, defaultPrice ]
			};
		}, ctx
	});
};

/**
 * Create a new pricing model in the system
 * @param {*} ctx.request.body New price model details
 * @returns Id of the new created price model
 */
export const createPricingModel = async ctx => {
	await handleError({
		tryFunc: async () => {
			const { name, priceId, pricing: { price, name: pricingName, value} } = ctx.request.body;

			const isPriceModelCreated = await Price.create(
				{
					id: priceId,
					name,
					priceConfigs: {
						price,
						name: pricingName,
						value
					}
				}, {
					include: [ { model: PriceConfig, as: 'priceConfigs' } ]
				});

			ctx.assert(isPriceModelCreated, 500, 'Oops! Something went wrong. Could not add new pricing model');

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: {priceModelId: isPriceModelCreated.id}
			};
		}, ctx
	});
};

/**
 * Get an individual pricing model
 * @param {*} ctx.params.pmId Id of price model
 * @returns Price model found for given id
 */
export const getPricingModel = async ctx => {
	await handleError({
		tryFunc: async () => {
			const {pmId} = ctx.params;

			const priceModel = await Price.findByPk(pmId, {
				include: [ { model: PriceConfig, as: 'priceConfigs' } ]
			});

			ctx.assert(priceModel, 404, 'Pricing Model not found for given Id');

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: priceModel
			};
		}, ctx
	});
};

/**
 * Updates an existing pricing model meta-data
 * @param {*} ctx.params.pmId Id of price model
 * @param {*} ctx.request.body Data to be updated in price model
 * @returns Success message
 */
export const updatePricingModel = async ctx => {
	await handleError({
		tryFunc: async () => {

			const { body } = ctx.request;
			const { pmId } = ctx.params;

			const priceModel = await Price.findByPk(pmId);

			ctx.assert(priceModel, 404, 'Pricing Model not found for given Id');

			const updatedPriceModel = await Price.update({
				...body
			}, {where: { id: pmId}} );

			ctx.assert(updatedPriceModel, 400, 'Could not update pricing model. Please try again');

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: 'Pricing model updated successfully'
			};
		}, ctx
	});
};
