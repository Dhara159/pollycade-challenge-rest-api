'use strict';

import { Model } from 'sequelize';
module.exports = class PriceConfig extends Model {
	static init (sequelize, DataTypes) {
		return super.init(
			{
				name: DataTypes.STRING,
				price: DataTypes.INTEGER,
				value: DataTypes.INTEGER
			}, {
				sequelize,
				modelName: 'PriceConfig'
			}
		);
	}

	static associate (models) {
	}

	/**
	 * Find price configurations by primary key
	 * @param {*} id Id of the price configuration entity
	 * @param {*} includeArr Array addressing referenced model
	 */
	static async findPriceConfigByPk (id, includeArr) {
		return await PriceConfig.findByPk(id, { include: includeArr });
	}

	/**
	 * Get all price configuration entities
	 * @param {*} includeArr Array addressing referenced model
	 */
	static async getAllPriceConfigs (whereObj) {
		return await PriceConfig.findAll({ where: whereObj });
	}

	/**
	 * Create new price configurations entity
	 * @param {*} createObj Data to be entered in new price configuration entity
	 */
	static async createNewPriceConfig (createObj) {
		return await PriceConfig.create(createObj);
	}

	/**
	 * Delete price configuration entity
	 * @param {*} priceConfigObjId Id of the price configuration entity to be deleted
	 */
	static async deletePriceConfig (priceConfigObjId) {
		await PriceConfig.destroy({ where: { id: priceConfigObjId } });
	}
};

