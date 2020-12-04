import Router from 'koa-router';

import { getPriceConfigOfPricingModel, createNewPriceConfiguration, removePriceConfiguration } from '../controllers/price-config/price-config.controller';

const priceConfigRoutes = new Router({
	prefix: '/pricing-models'
});

/**
* Routes related to CRUD operations in PriceConfig model
*/
priceConfigRoutes.get('/:pmId/prices', getPriceConfigOfPricingModel)
	.post('/:pmId/prices', createNewPriceConfiguration)
	.delete('/:pmId/prices/:priceId', removePriceConfiguration);

module.exports = priceConfigRoutes;
