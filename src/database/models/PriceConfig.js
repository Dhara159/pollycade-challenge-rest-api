'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
	class PriceConfig extends Model {
		static associate (models) {
		}
	}
	PriceConfig.init({
		name: DataTypes.STRING,
		price: DataTypes.INTEGER,
		value: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'PriceConfig'
	});
	return PriceConfig;
};
