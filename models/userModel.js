const { DataTypes, Model } = require('sequelize');


const createUserModel = (sequelize) => {

	class UserModel extends Model {}

	UserModel.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		freezeTableName: true,
		modelName: 'User'
	})


	return UserModel
};


module.exports = createUserModel