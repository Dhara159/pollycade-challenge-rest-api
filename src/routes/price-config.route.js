import Router from 'koa-router';

import PriceConfigController from '../controllers/price-config/price-config.controller';

const priceConfigRoutes = new Router({
	prefix: '/pricing-models'
});

/**
* Routes related to CRUD operations in PriceConfig model
*/
priceConfigRoutes.get('/:pmId/prices', PriceConfigController.getPriceConfigOfPricingModel)
	.post('/:pmId/prices', PriceConfigController.createNewPriceConfiguration)
	.delete('/:pmId/prices/:priceId', PriceConfigController.removePriceConfiguration);

module.exports = priceConfigRoutes;
