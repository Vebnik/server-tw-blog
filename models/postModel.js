const {Model, DataTypes} = require("sequelize");

const createPostModel = (sequelize) => {

	class PostModel extends Model {}

	PostModel.init({
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		media: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
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