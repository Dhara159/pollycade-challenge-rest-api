import Router from 'koa-router';

import MachineController from '../controllers/machine/machine.controller';

const machineRoutes = new Router({
	prefix: '/machines'
});

/**
* Routes related to CRUD operations in Machine model
*/
machineRoutes.put('/:machineId/prices/:pmId', MachineController.setPricingModelOfMachine)
	.delete('/:machineId/prices/:pmId', MachineController.removePricingModelOfMachine)
	.get('/:machineId/prices', MachineController.getPricingDetailsOfMachine);

module.exports = machineRoutes;
