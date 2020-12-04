import Router from 'koa-router';

import { getPriceModels, createPricingModel, getPricingModel, updatePricingModel } from '../controllers/price/price.controller';

const priceRouter = new Router({
	prefix: '/pricing-models'
});

/**
* Routes related to CRUD operations in Price model
*/
priceRouter.get('/', getPriceModels)
	.post('/', createPricingModel)
	.get('/:pmId', getPricingModel)
	.put('/:pmId', updatePricingModel);

module.exports = priceRouter;
