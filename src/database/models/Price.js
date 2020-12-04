'use strict';

import { Model} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
	class Price extends Model {
		static associate (models) {
			Price.hasMany(models.PriceConfig, {
				foreignKey: 'priceId',
				as: 'priceConfigs',
				onDelete: 'CASCADE'
			});
		}
	}
	Price.init({
		name: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Price'
	});
	return Price;
};
