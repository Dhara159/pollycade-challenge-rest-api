import Router from 'koa-router';

import PriceController from '../controllers/price/price.controller';

const priceRouter = new Router({
	prefix: '/pricing-models'
});

/**
* Routes related to CRUD operations in Price model
*/
priceRouter.get('/', PriceController.getPriceModels)
	.post('/', PriceController.createPricingModel)
	.get('/:pmId', PriceController.getPricingModel)
	.put('/:pmId', PriceController.updatePricingModel);

module.exports = priceRouter;
