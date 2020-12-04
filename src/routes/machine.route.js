import Router from 'koa-router';

import { setPricingModelOfMachine, removePricingModelOfMachine, getPricingDetailsOfMachine } from '../controllers/machine/machine.controller';

const machineRoutes = new Router({
	prefix: '/machines'
});

/**
* Routes related to CRUD operations in Machine model
*/
machineRoutes.put('/:machineId/prices/:pmId', setPricingModelOfMachine)
	.delete('/:machineId/prices/:pmId', removePricingModelOfMachine)
	.get('/:machineId/prices', getPricingDetailsOfMachine);

module.exports = machineRoutes;
