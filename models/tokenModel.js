const {Model, DataTypes } = require("sequelize");


const createTokenModel = (sequelize) => {

	class TokenModel extends Model {}

	TokenModel.init({
		accToken: { // TODO Переписать зависмость на accessToken
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