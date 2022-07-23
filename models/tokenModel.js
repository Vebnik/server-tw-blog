const { Sequelize, Model, DataTypes } = require("sequelize");
const path = require("path");


const createTokenModel = (sequelize) => {

	class TokenModel extends Model {}

	TokenModel.init({
		accToken: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, {
		sequelize,
		freezeTableName: true,
		modelName: 'Token'
	})

	return TokenModel
};

module.exports = createTokenModel