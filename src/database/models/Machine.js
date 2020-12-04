'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
	class Machine extends Model {
		static associate (models) {
			Machine.hasOne(models.Machine, {
				foreignKey: {
					name: 'priceId',
					allowNull: true
				},
				as: 'priceConfigs',
				onDelete: 'CASCADE',
				constraints: false
			});
		}
	}
	Machine.init({
		name: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Machine'
	});
	return Machine;
};
