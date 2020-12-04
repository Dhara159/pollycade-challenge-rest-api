import { Price, Machine, PriceConfig } from './../../database/models';
import handleError from './../../helpers/errorHandler';

import { default_pricing } from './../../../prices.json';

/**
 * Find and return machine found for given Id
 * @param {*} id: Id of the machine
 * @param {*} ctx
 * @returns Object found from the query
 */
const findMachineByMachineId = async (id, ctx) => {
	const machine = await Machine.findByPk(id);
	ctx.assert(machine, 404, 'Machine not found for given Id');
	return machine;
};

/**
 * Find and return Price model found for given Id
 * @param {*} id
 * @param {*} ctx
 * @returns Object found from the query
 */
const findPriceModalById = async (id, ctx) => {
	const priceModel = await Price.findByPk(id);
	ctx.assert(priceModel, 404, 'Pricing Model not found for given Id');
	return priceModel;
};

/**
 * Sets the pricing model for an individual machine to the one from pmId
 * @param {*} ctx.params.pmId Id of the price model
 * @param {*} ctx.params.machineId Id of the machine
 * @returns Success message
 */
export const setPricingModelOfMachine = async ctx => {
	return await handleError({
		tryFunc: async () => {
			const { pmId, machineId } = ctx.params;

			await findMachineByMachineId(machineId, ctx);
			await findPriceModalById(pmId, ctx);

			const updatedMachine = await Machine.update({
				priceId: pmId
			}, {
				where: {
					id: machineId
				}
			});
			ctx.assert(updatedMachine, 500, 'Oops! Something went wrong. Could not set price model for given machine');

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: 'Price model Id set successfully for given machine'
			};
		}, ctx
	});
};

/**
 * Unset the pricing model from the machine
 * @param {*} ctx.params.pmId Id of the price model
 * @param {*} ctx.params.machineId Id of the machine
 * @returns Success message
 */
export const removePricingModelOfMachine = async ctx => {
	return await handleError({
		tryFunc: async () => {
			const { pmId, machineId } = ctx.params;

			await findMachineByMachineId(machineId, ctx);
			const updatedMachine = await Machine.update({
				priceId: null
			}, {
				where: {
					id: machineId,
					priceId: pmId
				}}
			);

			ctx.assert(updatedMachine, 500, 'Oops! Something went wrong. Could not unset price model for given machine');

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: 'Price model Id removed successfully for given machine'
			};
		}, ctx
	});
};

/**
 * Get the pricing model and price configurations set for a given machine
 * @param {*} ctx.params.machineId Id of the machine
 * @returns Price model found for machine Id
 */
export const getPricingDetailsOfMachine = async ctx => {
	return await handleError({
		tryFunc: async () => {
			const { machineId } = ctx.params;

			const machine = await findMachineByMachineId(machineId, ctx);

			const priceModel = await Price.findByPk(machine.priceId, {
				include: [ { model: PriceConfig, as: 'priceConfigs' } ]
			});
			const defaultPricing = {
				defaultPricing: default_pricing
			};
			const priceModelOfMachine = priceModel || defaultPricing;

			ctx.status = 200;
			ctx.body = {
				success: true,
				data: priceModelOfMachine
			};
		}, ctx
	});
};
