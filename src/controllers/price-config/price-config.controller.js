import { Price, PriceConfig } from './../../database/models';
import handleError from './../../helpers/errorHandler';

/**
 * Get price model for given Id
 * @param {*} id Id of price model
 * @param {*} ctx
 * @returns True if success
 */
const findPriceModalById = async (id, ctx) => {
	const priceModel = await Price.findByPk(id);
	ctx.assert(priceModel, 404, 'Pricing Model not found for given Id');
	return true;
};

/**
 * Get prices configured for a specific pricing model
 * @param {*} ctx.params.pmId Id of price model
 * @returns Price configurations from system
 */
export const getPriceConfigOfPricingModel = async ctx => {
	return await handleError({
		tryFunc: async () => {
			const { pmId } = ctx.params;

			await findPriceModalById(pmId, ctx);

			const priceConfigurations = await PriceConfig.findAll({
				where: {
					priceId: pmId
				}
			});

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: priceConfigurations
			};
		}, ctx
	});
};

/**
 * Create new price configuration for given price model Id
 * @param {*} ctx.params.pmId Id of price model
 * @param {*} ctx.request.body Details of new price configurations
 * @returns Success message
 */
export const createNewPriceConfiguration = async ctx => {
	return await handleError({
		tryFunc: async () => {
			const { body } = ctx.request;
			const { pmId } = ctx.params;

			await findPriceModalById(pmId, ctx);

			const priceConfigurationsAdded = await PriceConfig.create({
				...body,
				priceId: pmId
			});
			ctx.assert(priceConfigurationsAdded, 500, 'Oops! Something went wrong. Could not create new price configurations');

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: 'New pricing configurations added successfully'
			};
		}, ctx
	});
};

/**
 * Removes a price configuration from a pricing model
 * @param {*} ctx.params.pmId Id of price model
 * @param {*} ctx.params.priceId Id of price configuration data
 * @returns Success message
 */
export const removePriceConfiguration = async ctx => {
	return await handleError({
		tryFunc: async () => {
			const { pmId, priceId } = ctx.params;

			await findPriceModalById(pmId, ctx);

			const priceConfigurations = await PriceConfig.findByPk(priceId);
			ctx.assert(priceConfigurations, 404, 'Pricing configurations not found for given Id');

			await priceConfigurations.destroy();

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: 'Pricing Configuration deleted successfully'
			};
		}, ctx
	});
};
