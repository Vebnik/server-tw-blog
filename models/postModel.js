const {Model, DataTypes} = require("sequelize");

const createPostModel = (sequelize) => {

	class PostModel extends Model {}

	PostModel.init({
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		sequelize,
		freezeTableName: true,
		modelName: 'Post'
	})

	return PostModel
};

module.exports = createPostModel