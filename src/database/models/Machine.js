'use strict';

import { Model } from 'sequelize';

module.exports = class Machine extends Model {
	static init (sequelize, DataTypes) {
		return super.init(
			{
				name: DataTypes.STRING
			},
			{
				sequelize,
				modelName: 'Machine'
			}
		);
	}

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

	/**
	 * Find machine by primary key
	 * @param {*} id Id of the machine
	 */
	static findMachineByPk (id) {
		return Machine.findByPk(id);
	}

	/**
	 * Update machine entity
	 * @param {*} updateObj Object with entity keys with updated value
	 * @param {*} whereObj Object based on which to find model entity
	 */
	static updateMachine (updateObj, whereObj) {
		return Machine.update(updateObj, { where: whereObj });
	}
};
