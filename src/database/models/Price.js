'use strict';

import { Model} from 'sequelize';
module.exports = class Price extends Model {
	static init (sequelize, DataTypes) {
		return super.init(
			{
				name: DataTypes.STRING
			}, {
				sequelize,
				modelName: 'Price'
			}
		);
	}

	static associate (models) {
		Price.hasMany(models.PriceConfig, {
			foreignKey: 'priceId',
			as: 'priceConfigs',
			onDelete: 'CASCADE'
		});
	}

	/**
	 * Find Price entity by primary key including referring entity in child table
	 * @param {*} id Id of the price entity
	 * @param {*} includeArr Array addressing referenced model
	 */
	static findPriceByPk (id, includeArr) {
		return Price.findByPk(id, { include: includeArr });
	}

	/**
	 * Get all price model entities
	 * @param {*} includeArr Array addressing referenced model
	 */
	static getAllPriceModels (includeArr) {
		return Price.findAll({ include: includeArr });
	}

	/**
	 * Create new price model entity
	 * @param {*} createObj Data to be entered in new price model entity
	 * @param {*} includeArr Data to be entered in referenced model entity
	 */
	static createNewPriceModel (createObj, includeArr) {
		return Price.create(createObj, { include: includeArr });
	}

	/**
	 * Update price model entities
	 * @param {*} updateObj Data to be updated in each entity
	 * @param {*} whereObj Object based on which to find model entity
	 */
	static updatePrice (updateObj, whereObj) {
		return Price.update(updateObj, { where: whereObj });
	}
};

